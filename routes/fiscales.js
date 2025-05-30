const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// GET
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Fiscal');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error al obtener fiscales');
  }
});

// POST
router.post('/', async (req, res) => {
  const { nombre, correo, id_fiscalia } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();
    request.input('nombre', nombre);
    request.input('correo', correo);
    request.input('id_fiscalia', id_fiscalia);

    await request.execute('sp_insertar_fiscal');
    res.status(201).send('Fiscal insertado correctamente');
  } catch (err) {
    console.error('Error al insertar fiscal:', err);
    res.status(500).send('Error al insertar fiscal');
  }
});

module.exports = router;
