
const formulario = document.getElementById("formClima");
const campoCiudad = document.getElementById("ciudad");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const ciudad = campoCiudad.value.trim();

  if (ciudad.length < 2) {
    mensaje.textContent = "Escribe una ciudad válida.";
    mensaje.className = "error";
    return;
  }

  mensaje.className = "";
  mensaje.textContent =
    `Buscador preparado para consultar el clima de ${ciudad}.`;
});
