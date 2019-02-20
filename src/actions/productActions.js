const PRODUCT_MOCK = {
	code: '1234',
	product: 'algo',
	description: 'description algo',
	price: 123.12
};

export const fetchProduct = (productCode) => dispatch => {
	//dispatch({
	//	type: "LOADING",
	//})
	//simulamos que vamos al server
	let product = null;
	if (productCode === '1234') {
		product = PRODUCT_MOCK;
	} else {
		product = {};
	}
	dispatch({
		type: "FETCH_PRODUCT",
		payload: product
	})
}

export const createProduct = (data) => dispatch=> {
	console.log('hola', data);
}