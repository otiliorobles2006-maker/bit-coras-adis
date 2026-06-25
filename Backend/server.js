const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function inicializarDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reporte_ADIS (
      ID SERIAL PRIMARY KEY,
      Mes TEXT NOT NULL,
      Actividad TEXT NOT NULL,
      Horas INTEGER NOT NULL,
      EvidenciaURL TEXT NOT NULL
    )
  `);

  const { rows } = await pool.query('SELECT COUNT(*) FROM reporte_adis');
  if (parseInt(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO reporte_adis (Mes, Actividad, Horas, EvidenciaURL) VALUES
      ('Febrero', 'Inicio de la Constitución del nuevo seguro', 50, 'https://drive.google.com/drive/folders/1qWZLtQZkkmIhyu0YbH-wBqRqeArqr0X-'),
      ('Mayo', 'Jornada de Ingenieria', 50, 'https://drive.google.com/drive/folders/1mbuB8TsxWe82B_SbBbGUuNvAAICkcebC'),
      ('Mayo', 'Kendo', 38, 'https://drive.google.com/drive/folders/1NxXYIZWGp-2hZmVXAdrQXKlWTM9O2rH0')
    `);
  }
}

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Bitácora Digital de ADIS funcionando', endpoint: '/api/adis' });
});

app.get('/api/adis', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM reporte_adis ORDER BY ID ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar las actividades', detalle: error.message });
  }
});

app.listen(PORT, async () => {
  await inicializarDB();
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
