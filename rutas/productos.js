/**Integrantes:
 * Andres Felipe Franco Tellez - 20221978031
 * Brayan Santiago Valero Arias - 20221978007
 */

const express = require('express'); // Inicia la dependencia de express
const router = express.Router(); // 

// Datos ficticios
const data = [
	{ id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date() },
	{ id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date() },
	{ id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date() },
	{ id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date() },
	{ id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date() },
];

/**Cuando se llegue a la ruta sin ningun parametro o direccion la funcion manda una respuesta
 * con el codigo 200 () y los datos ficticios que se brindaron anteriormente
 */
router.get('/', function (req, res) {
	res.status(200).json(data);
});

/**Busca un elemento especifico con el identificador id y si se encuentra retorna
 * el codigo 200 (ok) de lo contrario retorna 404 (no se encontro)
 */
router.get('/:id', function (req, res) {
	// busca elementos en el array data y retorna aquellos cuyo id coincida con el de la solicitud (router.get('/:id) 
	let found = data.find(function (item) {
		return item.id === parseInt(req.params.id); //convierte el id de string a int
	});

	// si se encuentra retorna (200:ok) y los datos del objeto encontrado
	if (found) {
		//TODO: Retornar los valores de la variable found
		res.status(200).json(found);
	} else { // si no solo retorna 404 not found
		res.sendStatus(404);
	}
});

// funcion para agregar item a una ruta especificada usando metodo POST y responde con el elemento creado
router.post('/', function (req, res) {
	/**se extraen los id y los numeros de orden de los ya existentas para saber si al agregar se deben
	 * iniciar en 1 o si se debe aumentar el contador
	 * .map itera sobre cada elemento del array y devuelve un nuevo array con los datos especificados.
	 * en el caso de los id's se iteran los elementos del array data y se crea un nuevo array con los id's
	 * de cada elemento, luego este array se almacena en 'itemIds'
	 */
	let itemIds = data.map(item => item.id);
	//let orderNums = data.map(item => item.order);

	let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
	//let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

	// se crea el nuevo item para luego ser agregado a data
	let newItem = {
		id: newId,
		nombre: req.body.nombre,
		valor: req.body.valor,
		enStock: false,
		createdOn: new Date()
	};

	data.push(newItem); //agrega el nuevo item a la lista

	res.status(201).json(newItem); // retorna 201 (creado)
});

/**funcion para manejar solicitudes PUT (solicitud HTTP para actualizar recursos en el servidor).
 * busca en el arreglo de data el elemento con el id
 */
router.put('/:id', function (req, res) {
	// busca elementos en el array data y retorna aquellos cuyo id coincida con el de la solicitud (router.get('/:id) 
	let found = data.find(function (item) {
		return item.id === parseInt(req.params.id);
	});

	if (found) {
		//datos para actualizar
		let actualizado = {
			id: found.id,
			nombre: req.body.nombre,
            valor: req.body.valor,
            enStock: req.body.enStock
		};

		let targetIndex = data.indexOf(found);
		
		//reemplaza el elemento encontrado por el elemento actualizado en el arreglo data
		data.splice(targetIndex, 1, actualizado);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete('/:id', function (req, res) {
	// busca elementos en el array data y retorna aquellos cuyo id coincida con el de la solicitud (router.get('/:id) 
	let found = data.find(function (item) {
		return item.id === parseInt(req.params.id);
	});

	if (found) {
		let targetIndex = data.indexOf(found);

		data.splice(targetIndex, 1);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
