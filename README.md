
# ClimaYa - Consulta del clima

Aplicación web que permite consultar las condiciones
meteorológicas actuales de distintas ciudades utilizando
la API pública de Open-Meteo.

## Objetivo

Desarrollar una aplicación web que consuma una API externa,
muestre los resultados en pantalla y maneje errores.

## Tecnologías utilizadas

- HTML5: estructura de la aplicación.
- CSS3: diseño visual y adaptación a pantallas.
- JavaScript: lógica, validaciones y peticiones HTTP.
- Open-Meteo: información meteorológica.
- Git y GitHub: control de versiones.

## Funcionalidades

- Búsqueda de ciudades por nombre.
- Consulta de temperatura actual.
- Visualización de sensación térmica.
- Consulta de humedad y velocidad del viento.
- Descripción de las condiciones meteorológicas.
- Validación de campos.
- Manejo de errores de conexión.
- Manejo de ciudades inexistentes.
- Detección de respuestas incompletas de la API.
- Manejo de respuestas HTTP 429.
- Interfaz adaptable a distintos dispositivos.

## APIs utilizadas

Geocoding API:
https://geocoding-api.open-meteo.com/v1/search

Weather Forecast API:
https://api.open-meteo.com/v1/forecast

La aplicación utiliza peticiones HTTP mediante fetch()
y recibe las respuestas en formato JSON.

No necesita clave de API para el uso educativo realizado.

## Instrucciones de ejecución

1. Descargar o clonar este repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión Live Server.
4. Abrir index.html con Live Server.
5. Escribir el nombre de una ciudad.
6. Presionar el botón "Consultar clima".
7. Visualizar los resultados meteorológicos.

Se requiere conexión a Internet para consultar la API.

## Estructura del proyecto

Acti2_u2/
  index.html
  css/
    styles.css
  js/
    app.js
  README.md
  .gitignore

## Pruebas

Se realizaron consultas a ciudades como Mérida y Madrid.

También se probaron nombres de ciudades inexistentes,
validación de entradas y errores de conexión.

Durante las pruebas se detectó que una búsqueda fallida
mantenía visibles los datos de la ciudad anterior.

Se corrigió restableciendo la tarjeta al iniciar
una nueva búsqueda.

## Declaración del uso de inteligencia artificial

### ChatGPT

Se utilizó como herramienta de apoyo para:

- Escribir código HTML, CSS y JavaScript.
- Explicar el funcionamiento de las funciones.
- Integrar la API Open-Meteo.
- Revisar el manejo de errores.
- Proponer correcciones al código.
- Apoyar la documentación del proyecto.

### Trabajo realizado personalmente

- Configuración del proyecto en Visual Studio Code.
- Creación y edición de archivos.
- Ejecución de la aplicación con Live Server.
- Pruebas de consultas meteorológicas.
- Identificación de comportamientos incorrectos.
- Aplicación y comprobación de correcciones.
- Creación de commits con Git.
- Publicación y revisión del repositorio.

El código generado con apoyo de IA fue revisado
mediante pruebas de funcionamiento.

Nota: Cualquier otra herramienta de IA utilizada
deberá declararse también en este archivo.

## Seguridad

No se almacenan contraseñas ni claves de API.
Los archivos de entorno se excluyen mediante .gitignore.

## Autor

Aaron Isaias Caamal Martinez

Proyecto académico de desarrollo web.
