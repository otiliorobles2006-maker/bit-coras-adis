const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reporte_ADIS (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Mes TEXT NOT NULL,
      Actividad TEXT NOT NULL,
      Horas INTEGER NOT NULL,
      EvidenciaURL TEXT NOT NULL
    )
  `);

  db.run('DELETE FROM reporte_ADIS');

  const actividades = [
    {
      Mes: 'Febrero',
      Actividad: 'Inicio de la Constitución del nuevo seguro',
      Horas: 50,
      EvidenciaURL: 'https://drive.google.com/drive/folders/1qWZLtQZkkmIhyu0YbH-wBqRqeArqr0X-'
    },
       {
      Mes: 'Mayo',
      Actividad: 'Jornada de Ingenieria',
      Horas: 50,
      EvidenciaURL: 'https://drive.google.com/drive/folders/1mbuB8TsxWe82B_SbBbGUuNvAAICkcebC'
    },
     {
      Mes: 'Mayo',
      Actividad: 'Kendo',
      Horas: 38,
      EvidenciaURL: 'https://drive.google.com/drive/folders/1NxXYIZWGp-2hZmVXAdrQXKlWTM9O2rH0'
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO reporte_ADIS (Mes, Actividad, Horas, EvidenciaURL)
    VALUES (?, ?, ?, ?)
  `);

  actividades.forEach((item) => {
    stmt.run(item.Mes, item.Actividad, item.Horas, item.EvidenciaURL);
  });

  stmt.finalize();
});

db.close(() => {
  console.log('Base de datos creada y registros insertados correctamente.');
});
