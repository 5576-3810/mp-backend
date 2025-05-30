const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

// POST /api/reasignacion - reasignar un caso
router.post('/', async (req, res) => {
  const { id_caso, id_fiscal_nuevo } = req.body;

  try {
    const pool = await poolPromise;

    const request = pool.request();
    request.input('id_caso', id_caso);
    request.input('id_fiscal_nuevo', id_fiscal_nuevo);

    await request.execute('sp_reasignar_caso');
    res.status(200).send('Reasignación ejecutada');
  } catch (err) {
    console.error('Error al reasignar caso:', err);
    res.status(500).send('Error');
  }
});
router.get('/logs', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM LogReasignacion');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener logs:', err);
    res.status(500).send('Error al obtener logs');
  }
});


module.exports = router;
