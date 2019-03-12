const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//	response.send("Hello from Firebase!");
// });


const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
//app.use(myMiddleware);

// build multiple CRUD interfaces:

// Este array de un objeto simula ser la DB por el momento.
const Products = [
	{
		code: '1234',
		product: 'algo',
		description: 'description algo',
		price: 123.12
	}
]

// GET - All the Products
function getProductsHandler(req, res){
	res.status(200).send(Products);
}

// GET - Find product by code - Returns a single product
function getByCode(code){
	//Todos los productos en el array Products, con filter lo recorro y genera otro array con el objeto q corresponde al code
	productRes = Products.filter((element)=>element.code === code);
	return (productRes);
}

function getProductHandler(req, res) {
	var codeReq = req.params.code;
	var products = getByCode(codeReq);
	//si recorri todos los Products y no encontre el code debo responder status 404 product not found 
	if (products.length === 0) {
		//es que esta vacio el nuevo array por ende no lo encontre
	 	//deberia devolver el 404 
	 	res.status(404).send();
	} else {
		//lo encontro, lo devuelve y esta todo ok
		res.status(200).send(products[0]);
	}
}


// POST - Add a new product to the stock
// Definir la funcion create() deberia crear el producto y desp add a la lista de productos
function createProduct(body) {
	var newProduct= {
		code: body.code,
		product: body.product,
		description: body.description,
		price: body.price
	}
	Products.push(newProduct);
	return newProduct;
}

function postProduct(req, res) {
	console.log('postNewProduct', req.body);
	var newProduct = createProduct(req.body);
	res.send(newProduct);
}


// PUT - Update an existing product
function update(req, res) {
	var idProduct = req.params.id
	res.send(Products.update(idProduct, req.body));
}
// Definición del Router
app.put('/id', update);



// DELETE - Deletes a product
//app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
//function delete(req, res) {
//	res.send(Product.delete(req.params.id));
//}

// Definición del Router
//app.delete('/id', delete);


//POST SELL
function postSell(req, res) {
	console.log('postSell', req.body);
	res.send(req.body);
}

app.post('/sell', postSell);




//todas las definiciones del Router juntas
//GET
app.get('/', getProductsHandler);
app.get('/:code', getProductHandler);
//POST
app.post('/product', postProduct);



// Monto la aplicacion en /api
// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);




// recurso alias a un modelo (producto, venta, auto, etc)
//   GET /<recurso>/  listar todo
//   GET /<recurso>/<id>/  tomar uno o 404
//   POST /<recurso>/      crear un recurso
//   PUT /<recurso>/<id>/  actualizar un recurso
//   DELETE /<recurso>/<id>/ Eliminar un recurso