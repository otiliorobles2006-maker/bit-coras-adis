const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'database.sqlite');

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Error al conectar con SQLite:', error.message);
  } else {
    console.log('Conexión correcta con la base de datos SQLite.');
  }
});

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Bitácora Digital de ADIS funcionando',
    endpoint: '/api/adis'
  });
});

app.get('/api/adis', (req, res) => {
  const sql = `
    SELECT ID, Mes, Actividad, Horas, EvidenciaURL
    FROM reporte_ADIS
    ORDER BY ID ASC
  `;

  db.all(sql, [], (error, rows) => {
    if (error) {
      return res.status(500).json({
        error: 'Error al consultar las actividades',
        detalle: error.message
      });
    }

    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
