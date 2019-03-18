const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

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
		price: 100,
		price_end: 123.12,
		cant_product: 2
	}
]

// GET - All the Products
function getProductsHandler(req, res){
	const stockCollection = db.collection('stock');
	const products = [];
	stockCollection.get().then(snapshot => {
		snapshot.forEach(doc => {
			let docData = doc.data();
			docData.code = doc.id;
			products.push(docData);
		})
	}).then(() => {
		res.status(200).send(products);
    });
}


// GET - Find product by code - Returns a single product
function getByCode(code){
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
		price: body.price,
		price_end: body.price_end,
		cant_product: body.cant_product
	}
	return newProduct;
}

function postProduct(req, res) {
	var newProduct = createProduct(req.body);
	res.send(newProduct);

	var docRef = db.collection('stock').doc(newProduct.code);
	var setStock = docRef.set({
	  product_name: newProduct.product,
	  description: newProduct.description,
	  price: parseFloat(newProduct.price),
	  price_end: parseFloat(newProduct.price_end),
	  cant: parseInt(newProduct.cant_product)
	});
}


// PUT - Update an existing product
function update(product, body) {
	var productForUpdate = getByCode(code);
	var docRef = db.collection('stock').doc(productForUpdate.code);

	var setStock = docRef.set(product);
}


function updateProduct(req, res) {
	var code = req.params.code

	res.send(Products.update(code, req.body));
}





// DELETE - Deletes a product
//app.delete('/:code', (req, res) => res.send(Widgets.delete(req.params.code)));
//function delete(req, res) {
//	res.send(Product.delete(req.params.code));
//}

// Definición del Router
//app.delete('/code', delete);


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
//PUT
app.put('/product', updateProduct);
//DELETE
//Que quisiera borrar?? porque productos es medio
//app.delete('/code', delete);

// Monto la aplicacion en /api
// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);




// recurso alias a un modelo (producto, venta, auto, etc)
//   GET /<recurso>/  listar todo
//   GET /<recurso>/<id>/  tomar uno o 404
//   POST /<recurso>/      crear un recurso
//   PUT /<recurso>/<id>/  actualizar un recurso
//   DELETE /<recurso>/<id>/ Eliminar un recurso