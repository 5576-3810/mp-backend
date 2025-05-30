CREATE DATABASE MinisterioPublico;
GO
USE MinisterioPublico;
GO

-- Tabla Fiscalía
CREATE TABLE Fiscalia (
    id_fiscalia INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL
);

-- Tabla Fiscal
CREATE TABLE Fiscal (
    id_fiscal INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) NOT NULL UNIQUE,
    id_fiscalia INT NOT NULL,
    FOREIGN KEY (id_fiscalia) REFERENCES Fiscalia(id_fiscalia)
);

-- Tabla Caso
CREATE TABLE Caso (
    id_caso INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    descripcion NVARCHAR(MAX),
    estado NVARCHAR(20) CHECK (estado IN ('pendiente', 'en_progreso', 'cerrado')) NOT NULL DEFAULT 'pendiente',
    id_fiscal INT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_actualizacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_fiscal) REFERENCES Fiscal(id_fiscal)
);

-- Tabla Log de Reasignación Fallida
CREATE TABLE LogReasignacion (
    id_log INT IDENTITY(1,1) PRIMARY KEY,
    id_caso INT,
    id_fiscal_anterior INT,
    id_fiscal_nuevo INT,
    motivo NVARCHAR(255),
    fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_caso) REFERENCES Caso(id_caso),
    FOREIGN KEY (id_fiscal_anterior) REFERENCES Fiscal(id_fiscal),
    FOREIGN KEY (id_fiscal_nuevo) REFERENCES Fiscal(id_fiscal)
    );
    
--PROCEDURES

-- CREATE PROCEDURE sp_insertar_fiscalia
-- @nombre NVARCHAR(100)
-- AS
-- BEGIN
--     INSERT INTO Fiscalia (nombre)
--     VALUES (@nombre);
-- END;
-- GO

-- CREATE PROCEDURE sp_insertar_fiscal
--     @nombre NVARCHAR(100),
--     @correo NVARCHAR(100),
--     @id_fiscalia INT
-- AS
-- BEGIN
--     INSERT INTO Fiscal (nombre, correo, id_fiscalia)
--     VALUES (@nombre, @correo, @id_fiscalia);
-- END;
-- GO

-- CREATE PROCEDURE sp_insertar_caso
--     @titulo NVARCHAR(200),
--     @descripcion NVARCHAR(MAX),
--     @id_fiscal INT
-- AS
-- BEGIN
--     INSERT INTO Caso (titulo, descripcion, id_fiscal)
--     VALUES (@titulo, @descripcion, @id_fiscal);
-- END;
-- GO


-- CREATE PROCEDURE sp_reasignar_caso
--     @id_caso INT,
--     @id_fiscal_nuevo INT
-- AS
-- BEGIN
--     DECLARE @estado NVARCHAR(20);
--     DECLARE @id_fiscal_actual INT;
--     DECLARE @id_fiscalia_actual INT;
--     DECLARE @id_fiscalia_nueva INT;

--     SELECT @estado = estado, @id_fiscal_actual = id_fiscal
--     FROM Caso WHERE id_caso = @id_caso;

--     IF @estado != 'pendiente'
--     BEGIN
--         INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
--         VALUES (@id_caso, @id_fiscal_actual, @id_fiscal_nuevo, 'Estado no es pendiente');
--         RETURN;
--     END

--     SELECT @id_fiscalia_actual = id_fiscalia FROM Fiscal WHERE id_fiscal = @id_fiscal_actual;
--     SELECT @id_fiscalia_nueva = id_fiscalia FROM Fiscal WHERE id_fiscal = @id_fiscal_nuevo;

--     IF @id_fiscalia_actual != @id_fiscalia_nueva
--     BEGIN
--         INSERT INTO LogReasignacion (id_caso, id_fiscal_anterior, id_fiscal_nuevo, motivo)
--         VALUES (@id_caso, @id_fiscal_actual, @id_fiscal_nuevo, 'Fiscales no son de la misma fiscalía');
--         RETURN;
--     END


--     UPDATE Caso
--     SET id_fiscal = @id_fiscal_nuevo,
--         fecha_actualizacion = GETDATE()
--     WHERE id_caso = @id_caso;
-- END;
-- GO

-- CREATE PROCEDURE sp_reporte_estados
-- AS
-- BEGIN
--     SELECT estado, COUNT(*) AS cantidad
--     FROM Caso
--     GROUP BY estado;
-- END;
-- GO

