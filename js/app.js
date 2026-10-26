
const formulario = document.getElementById("formClima");
const campoCiudad = document.getElementById("ciudad");
const mensaje = document.getElementById("mensaje");
const botonConsultar = formulario.querySelector("button");

const estadoInicial = document.getElementById("estadoInicial");
const resultado = document.getElementById("resultado");

const nombreCiudad = document.getElementById("nombreCiudad");
const temperatura = document.getElementById("temperatura");
const descripcionClima = document.getElementById("descripcionClima");
const sensacion = document.getElementById("sensacion");
const humedad = document.getElementById("humedad");
const viento = document.getElementById("viento");

// Mostrar mensajes al usuario
function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.className = esError ? "error" : "";
}

// Convertir códigos meteorológicos en descripciones
function obtenerDescripcion(codigo) {
  if (codigo === 0) return "Cielo despejado";
  if (codigo === 1) return "Mayormente despejado";
  if (codigo === 2) return "Parcialmente nublado";
  if (codigo === 3) return "Nublado";
  if ([45, 48].includes(codigo)) return "Niebla";
  if ([51, 53, 55, 56, 57].includes(codigo)) {
    return "Llovizna";
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)) {
    return "Lluvia";
  }
  if ([71, 73, 75, 77, 85, 86].includes(codigo)) {
    return "Nieve";
  }
  if ([95, 96, 99].includes(codigo)) {
    return "Tormenta";
  }

  return "Condiciones variables";
}

// Obtener información JSON de una API
async function obtenerDatos(url) {
  const respuesta = await fetch(url);

  if (respuesta.status === 429) {
    throw new Error(
      "Se alcanzó el límite de consultas. Intenta más tarde."
    );
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener información del servidor.");
  }

  return await respuesta.json();
}

// Buscar las coordenadas de una ciudad
async function buscarCiudad(ciudad) {
  const parametros = new URLSearchParams({
    name: ciudad,
    count: "1",
    language: "es",
    format: "json"
  });

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?${parametros}`;

  const datos = await obtenerDatos(url);

  if (!datos.results || datos.results.length === 0) {
    throw new Error("No encontramos esa ciudad. Revisa el nombre.");
  }

  return datos.results[0];
}

// Consultar condiciones meteorológicas
async function consultarClima(latitud, longitud) {
  const parametros = new URLSearchParams({
    latitude: latitud,
    longitude: longitud,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m"
    ].join(","),
    timezone: "auto"
  });

  const url =
    `https://api.open-meteo.com/v1/forecast?${parametros}`;

  const datos = await obtenerDatos(url);

  if (
    !datos.current ||
    typeof datos.current.temperature_2m !== "number" ||
    typeof datos.current.relative_humidity_2m !== "number" ||
    typeof datos.current.apparent_temperature !== "number" ||
    typeof datos.current.wind_speed_10m !== "number"
  ) {
    throw new Error("La API devolvió información incompleta.");
  }

  return datos.current;
}

// Mostrar resultados en la interfaz
function mostrarClima(ciudad, clima) {
  const ubicacion = [
    ciudad.name,
    ciudad.admin1,
    ciudad.country
  ].filter(Boolean).join(", ");

  nombreCiudad.textContent = ubicacion;

  temperatura.textContent =
    `${Math.round(clima.temperature_2m)} °C`;

  descripcionClima.textContent =
    obtenerDescripcion(clima.weather_code);

  sensacion.textContent =
    `${Math.round(clima.apparent_temperature)} °C`;

  humedad.textContent =
    `${clima.relative_humidity_2m} %`;

  viento.textContent =
    `${clima.wind_speed_10m} km/h`;

  estadoInicial.hidden = true;
  resultado.hidden = false;
}

// Evento principal del formulario
formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

 const ciudad = campoCiudad.value.trim();
 // Ocultar los resultados de consultas anteriores
 estadoInicial.hidden = false;
 resultado.hidden = true;

 if (ciudad.length < 2) {
   mostrarMensaje("Escribe una ciudad válida.", true);
   return;
 }

  botonConsultar.disabled = true;
  botonConsultar.textContent = "Consultando...";
  mostrarMensaje("Buscando información meteorológica...");

  try {
    const ubicacion = await buscarCiudad(ciudad);

    const clima = await consultarClima(
      ubicacion.latitude,
      ubicacion.longitude
    );

    mostrarClima(ubicacion, clima);
    mostrarMensaje("Consulta realizada correctamente.");

  } catch (error) {
    console.error("Error al consultar el clima:", error);

    if (error instanceof TypeError && !navigator.onLine) {
      mostrarMensaje(
        "No tienes conexión a Internet. Verifica tu red.",
        true
      );
    } else if (error instanceof TypeError) {
      mostrarMensaje(
        "No se pudo conectar con la API. Intenta nuevamente.",
        true
      );
    } else {
      mostrarMensaje(error.message, true);
    }

  } finally {
    botonConsultar.disabled = false;
    botonConsultar.textContent = "Consultar clima";
  }
});
