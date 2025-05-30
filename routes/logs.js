// routes/logs.js
const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        LR.id_log,
        LR.id_caso,
        C.descripcion AS caso_descripcion,
        F1.nombre AS fiscal_anterior,
        F2.nombre AS fiscal_nuevo,
        LR.motivo,
        FORMAT(LR.fecha, 'yyyy-MM-dd HH:mm:ss') AS fecha
      FROM LogReasignacion LR
      JOIN Caso C ON LR.id_caso = C.id_caso
      JOIN Fiscal F1 ON LR.id_fiscal_anterior = F1.id_fiscal
      JOIN Fiscal F2 ON LR.id_fiscal_nuevo = F2.id_fiscal
      ORDER BY LR.fecha DESC
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener logs:', err);
    res.status(500).send('Error al obtener logs');
  }
});

module.exports = router;
