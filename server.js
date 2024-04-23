/**Integrantes:
 * Andres Felipe Franco Tellez - 20221978031
 * Brayan Santiago Valero Arias - 20221978007
 */

const http = require('http');
const express = require('express'); //framework para desarrollar aplicaciones
const productosRouter = require('./rutas/productos'); //llamar conjunto de acciones de la ruta especificada
const app = express();

// implementa el middleware que lee las solicitudes (HTTP) en JSON y las interpreta en objetos JavaScript
app.use(express.json());

/**va a ejecutar el metodo que se quiera utilizar del archivo "productos.js"  */
app.use('/productos', productosRouter);

/**esta funcion monta un middleware en la aplicacion lee la solicitud HTTP con la URL y el cuerpo de
 * la solicitud. este middleware se debe ejecutar cuando la solicitud que coincida con la ruta
 * especificada '/' (primer argumento).
 * el segundo argumento es una funcion que contiene los objetos request y response correspondientes para
 * el flujo de datos de la solicitud.
 */
app.use('/', function(req, res) {
    res.send('Está funcionando'); // res = respuesta al servidor
});

// Creacion y alojamiento del servidor
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Aplicación funcionando en ' + port); // mensaje de comprobacion del servidor
