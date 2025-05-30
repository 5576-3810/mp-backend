const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const fiscalesRoutes = require('./routes/fiscales');
const casosRoutes = require('./routes/casos');
const reasignacionRoutes = require('./routes/reasignacion');

app.use(cors());
app.use(express.json());

app.use('/api/fiscales', fiscalesRoutes);
app.use('/api/casos', casosRoutes);
app.use('/api/reasignacion', reasignacionRoutes);
app.use('/api/logs', require('./routes/logs'));
app.use('/api', require('./routes/reasignacion')); 
app.use('/api/estadisticas', require('./routes/estadisticas'));



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
