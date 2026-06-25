# Bitácora Digital de ADIS

Proyecto individual con base de datos SQLite, Backend en Node.js + Express y Frontend con HTML, CSS y JavaScript nativo.

## Estructura

```txt
bitacora-adis/
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── seed.js
│   └── database.sqlite
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Base de datos

Tabla: `reporte_ADIS`

Campos:

- `ID`
- `Mes`
- `Actividad`
- `Horas`
- `EvidenciaURL`

## Instalación y ejecución

1. Entrar a la carpeta del Backend:

```bash
cd Backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos e insertar registros:

```bash
npm run seed
```

4. Iniciar el servidor:

```bash
npm start
```

5. Abrir el Frontend:

Abrir el archivo:

```txt
Frontend/index.html
```

También se puede usar la extensión Live Server de Visual Studio Code.

## Endpoint principal

```txt
GET http://localhost:3000/api/adis
```

Devuelve un JSON con la lista de actividades registradas.

## Nota

Antes de entregar, modifica en `Frontend/index.html` los datos del alumno:

- Nombre
- Matrícula
- Grupo
