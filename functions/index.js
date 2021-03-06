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

// GET - All the Products
function getProductsHandler(req, res) {
	const stockCollection = db.collection('stock');
	const products = [];
	stockCollection.get().then(snapshot => {
		snapshot.forEach(doc => {
			let docData = doc.data();
			docData.code = doc.id;
			products.push(docData);
		})
		return products;
	}).then(() => {
		res.status(200).send(products);
		return null;
	}).catch(error => {
		console.log("Errors: ", error)
	});
}


// GET - Find product by code - Returns a single product
	//function getByCode(code) {
	//	const stockCollection = db.collection('stock');
	//	const products = [];
	//	const promise = stockCollection.where('code', '==', code).get().then(snapshot => {
	//		snapshot.forEach(doc => {
	//			let docData = doc.data();
	//			docData.code = doc.id;
	//			products.push(docData);
	//      });
	//    });
	//    return promise;
	//}

function getProductHandler(req, res) {
	var codeReq = req.params.code;
	const stockCollection = db.collection('stock');
	const products = [];
	/**stockCollection.where('code', '==', codeReq).get().then(snapshot => {
		snapshot.forEach(doc => {
			let docData = doc.data();
			docData.code = doc.id;
			products.push(docData);
     	})
     	return products; **/
    stockCollection.get().then(snapshot => {
		snapshot.forEach(doc => {
			let docData = doc.data();
			docData.code = doc.id;
			if (docData.code === codeReq) {
				products.push(docData);	
			}
     	})
     	return products;
    }).then(() => {
		//si recorri todos los Products y no encontre el code debo responder status 404 product not found 
		if (products.length === 0) {
			//es que esta vacio el nuevo array por ende no lo encontre
		 	//deberia devolver el 404 
		 	res.status(404).send();
		 	return null;
		} else {
			//lo encontro, lo devuelve y esta todo ok
			res.status(200).send(products[0]);
			return null;
		}
	}).catch(error => {
    	console.log("Errors: ", error)
    });
}


// POST - Add a new product to the stock
function createProduct(body) {
	var newProduct= {
		code: body.code,
		name: body.name,
		description: body.description,
		price: body.price,
		price_end: body.price_end,
		cant: body.cant,
		imagen: body.imagen
	}
	return newProduct;
}

function postProduct(req, res) {
	var newProduct = createProduct(req.body);
	res.send(newProduct);

	var docRef = db.collection('stock').doc(newProduct.code);
	var setStock = docRef.set({
	  name: newProduct.name,
	  description: newProduct.description,
	  price: parseFloat(newProduct.price),
	  price_end: parseFloat(newProduct.price_end),
	  cant: parseInt(newProduct.cant),
	  imagen: newProduct.imagen
	});
}


// PUT - Update an existing product
function updateProduct(req, res) {
	var code = req.params.code;
	var docRef = db.collection('stock').doc(code);

	var setStock = docRef.update(req.body).then(() => {
		var data = req.body;
		data.id = code;
		res.send(data);
		return null;
	});
}

// DELETE - Deletes a product
//app.delete('/:code', (req, res) => res.send(Widgets.delete(req.params.code)));
//function delete(req, res) {
//	res.send(Product.delete(req.params.code));
//}

// Definición del Router
//app.delete('/code', delete);


//POST SELL
function getTotal(array) {
	//para cada elemento del array, sumar todos los totales
	var total = 0;
	array.forEach(item => total = total + item.total);
	return(total);
}

function postSell(req, res) {
	console.log('postSell', req.body);
	var newSell = {
		client: req.body.client,
		items: req.body.items,
		total: getTotal(req.body.items)
	}
	var docRef = db.collection('ventas').doc();
	var transaction = db.runTransaction(t => {
		var promises = [];
		var setSell = docRef.set({
			client: newSell.client,
			total: parseInt(newSell.total)
		});
		var arrayItems = req.body.items;
		arrayItems.forEach(item => {
			var itemsRefCollection = docRef.collection('items').doc(item.code);
			itemsRefCollection.set(item);
			var productRef = db.collection('stock').doc(item.code);
			const onePromise = t.get(productRef).then(doc => {
				var productUp = productRef.update({cant: doc.data().cant - item.cant_sell})
			})
			promises.push(onePromise);

		});
		return Promise.all(promises);
	}).then(result => {
		console.log('Transaction success!');
	}).catch(err => {
		console.log('Transaction failure:', err);
	});
			
	res.send(newSell);
}

//todas las definiciones del Router juntas
//GET
app.get('/product', getProductsHandler);
app.get('/product/:code', getProductHandler);
//POST
app.post('/product', postProduct);
//PUT
app.put('/product/:code', updateProduct);
//POST
app.post('/sell', postSell);
//DELETE
//Que quisiera borrar?? 
//app.delete('/code', delete);

// Monto la aplicacion en /api
// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);