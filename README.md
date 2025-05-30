# 🏛️ Ministerio Público - Gestión de Casos

Sistema completo para la gestión de fiscales, casos y reasignaciones. Construido con Node.js, React y SQL Server.

## 🚀 Tecnologías

- ⚙️ Backend: Node.js + Express + MSSQL
- 🌐 Frontend: React + Axios
- 🐘 Base de datos: SQL Server
- 🐳 Docker Ready (frontend + backend)

## 📦 Estructura del Proyecto

/mp-back --> Backend (Node.js)
/routes --> Rutas de API
/controllers --> Lógica de negocio
/database --> Scripts SQL
.env --> Variables de entorno

/mp-front --> Frontend (React)
/src --> Componentes y lógica
/public --> Recursos públicos

/docker --> Configuración para despliegue



## 📂 Scripts Base de Datos

El script de creación de la base de datos se encuentra en:  
`mp-back/database/schema.sql`

Incluye:

- Tablas: Fiscal, Caso, Log
- Procedimientos almacenados:
  - `sp_insertar_fiscalia`
  - `sp_insertar_fiscal`
  - `sp_insertar_caso`
  - `sp_reasignar_caso`
  - `sp_obtener_logs`
  - `sp_estadisticas_fiscales`

## 🧪 Pruebas con Postman

### 🔹 Obtener fiscales


