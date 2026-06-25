// ⚠️ CAMBIA ESTA URL por la que te dé Render después de hacer el deploy del Backend
const API_URL = 'https://bit-coras-adis.onrender.com/api/adis';

const tablaActividades = document.getElementById('tablaActividades');

async function cargarActividades() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la información del servidor.');
    }

    const actividades = await respuesta.json();

    tablaActividades.innerHTML = '';

    if (actividades.length === 0) {
      tablaActividades.innerHTML = `
        <tr>
          <td colspan="5">No hay actividades registradas.</td>
        </tr>
      `;
      return;
    }

    actividades.forEach((actividad) => {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${actividad.ID}</td>
        <td>${actividad.Mes}</td>
        <td>${actividad.Actividad}</td>
        <td>${actividad.Horas}</td>
        <td>
          <a class="boton-evidencia" href="${actividad.EvidenciaURL}" target="_blank">
            Ver Evidencia
          </a>
        </td>
      `;

      tablaActividades.appendChild(fila);
    });
  } catch (error) {
    tablaActividades.innerHTML = `
      <tr>
        <td colspan="5" class="mensaje-error">
          Error al cargar las actividades. Verifica que el Backend esté encendido.
        </td>
      </tr>
    `;
    console.error(error);
  }
}

cargarActividades();
