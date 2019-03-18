import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_SELL, NEW_PRODUCT, UPDATE_PRODUCT } from './types';

//const PRODUCT_MOCK = {
//	code: '1234',
//	product: 'algo',
//	description: 'description algo',
//	price: 123.12
//};
const API_URL = 'http://localhost:5001/proyecto-pwa-f2f10/us-central1/api/';
//const API_URL = 'https://us-central1-proyecto-pwa-f2f10.cloudfunctions.net/api/';

export const fetchProducts = () => dispatch => {
	console.log(API_URL);
	fetch(API_URL)
	.then(res => res.json())
	.then(products =>
		dispatch({
			type: FETCH_PRODUCTS,
			payload: products
		})
	); 
}


export const fetchProduct = (productCode) => dispatch => {
	const url = API_URL + productCode;
	console.log('Pidiendo url: ', url);
	fetch(url)
	.then(res => res.json())
	.then(product => 
		dispatch({
		type: FETCH_PRODUCT,
		payload: product
		})
	);	
}


//export const fetchProduct = (productCode) => dispatch => {
	// //dispatch({
	// //	type: "LOADING",
	// //})
	// //simulamos que vamos al server
//	let product = null;
//	if (productCode === '1234') {
//		product = PRODUCT_MOCK;
//	} else {
//		product = {};
//	}
//	dispatch({
//		type: "FETCH_PRODUCT",
//		payload: product
//	})
//}

export const createProduct = (data) => dispatch=> {
	console.log('actions', data);
	const url = API_URL + 'product/';
	fetch(url , {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(product =>
		dispatch({
			type: NEW_PRODUCT,
			payload:product
			})
		);
}

export const updateProduct = (data) => dispatch=> {
	console.log('actions Update', data);
	const url = API_URL + 'product/';
	fetch(url , {
		method: 'PUT',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(product =>
		dispatch({
			type: UPDATE_PRODUCT,
			payload:product
		})
	);
}

export const createSell = (data) => dispatch=> {
	console.log('actions', data);
	const url = API_URL + 'sell/';
	fetch(url , {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(product =>
		dispatch({
			type: NEW_SELL,
			payload:product
			})
		);
}