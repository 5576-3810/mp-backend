// routes/estadisticas.js
const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        F.id_fiscal,
        F.nombre,
        COUNT(*) AS total_casos,
        COUNT(CASE WHEN C.estado = 'Pendiente' THEN 1 END) AS pendientes,
        COUNT(CASE WHEN C.estado = 'En proceso' THEN 1 END) AS en_proceso,
        COUNT(CASE WHEN C.estado = 'Cerrado' THEN 1 END) AS cerrados
      FROM Fiscal F
      LEFT JOIN Caso C ON F.id_fiscal = C.id_fiscal
      GROUP BY F.id_fiscal, F.nombre
      ORDER BY F.nombre;
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener estadísticas:', err);
    res.status(500).send('Error al obtener estadísticas');
  }
});

module.exports = router;
