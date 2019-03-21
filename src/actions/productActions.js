import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_SELL, NEW_PRODUCT, UPDATE_PRODUCT, NOTFOUND_PRODUCT, LOADING } from './types';

//const PRODUCT_MOCK = {
//	code: '1234',
//	product: 'algo',
//	description: 'description algo',
//	price: 123.12
//};
const API_URL = 'http://localhost:5001/proyecto-pwa-f2f10/us-central1/api/';
//const API_URL = 'https://us-central1-proyecto-pwa-f2f10.cloudfunctions.net/api/';

export const fetchProducts = () => dispatch => {
	dispatch({
		type: LOADING,
	})
	const url = API_URL + 'product/'
	console.log(url);
	fetch(url)
	.then(res => res.json())
	.then(products =>
		dispatch({
			type: FETCH_PRODUCTS,
			payload: products
		})
	); 
}


export const fetchProduct = (productCode) => dispatch => {
	const url = API_URL + 'product/' + productCode;
	console.log(url);
	fetch(url)
	.then(res => {
		if (res.ok) {
			res.json().then(product => {
				dispatch({
					type: FETCH_PRODUCT,
					payload: product
				})
			})
		} else {
			dispatch({
				type: NOTFOUND_PRODUCT,
				code: productCode
			})
		}
	});	
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
	const url = API_URL + 'product/' + data.code;
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
	var sellData = {
		client: data.client,
		items: [
			{
				description: data.description,
				price_end: data.price_end,
				cant_sell: data.cant_sell,
				code: data.code,
				product: data.product,
				total: data.total,
			}
		]
	}
	const url = API_URL + 'sell/';
	fetch(url , {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(sellData)
	})
	.then(res => res.json())
	.then(product =>
		dispatch({
			type: NEW_SELL,
			payload:product
			})
		);
}