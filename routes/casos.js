const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// Obtener fiscales
router.get('/obtenerfiscalesporfiscalia', async (req, res) => {
  console.log();
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Fiscal');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener fiscales:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Obtener casos
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Caso');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener casos:', err);
    res.status(500).send('Error en el servidor');
  }
});

// Insertar caso
router.post('/', async (req, res) => {
  const { descripcion, estado, id_fiscal } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('descripcion', descripcion)
      .input('estado', estado)
      .input('id_fiscal', id_fiscal)
      .execute('sp_insertar_caso');

    res.send('Caso insertado correctamente');
  } catch (err) {
    console.error('Error al insertar caso:', err);
    res.status(500).send('Error al insertar caso');
  }
});

// Reasignar caso
router.post('/reasignar', async (req, res) => {
  const { id_caso, id_nuevo_fiscal } = req.body;
  console.log('Intentando reasignar:', req.body);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_caso', id_caso)
      .input('id_nuevo_fiscal', id_nuevo_fiscal)
      .execute('sp_reasignar_caso');

    const codigo = result.returnValue;

    if (codigo === 1) {
      return res.status(400).send('Estado no válido para reasignación');
    }

    if (codigo === 2) {
      return res.status(400).send('Fiscales de distinta fiscalía');
    }

    res.send('Reasignación exitosa');
  } catch (err) {
    console.error('Error en reasignación:', err);
    res.status(500).send('Error al reasignar caso');
  }
});


router.get('/estadisticas', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('sp_reporte_estados');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).send('Error al obtener estadísticas');
  }
});


module.exports = router;
