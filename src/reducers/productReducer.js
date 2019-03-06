import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_PRODUCT, NEW_SELL } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	newSell: null
}

export default function(state = initialState, action){
	switch(action.type) {
		case FETCH_PRODUCT:
		console.log(action.payload);
		return {
			...state,
			item: action.payload
		};
		case FETCH_PRODUCTS:
		console.log(action.payload);
		return {
			...state,
			items: action.payload
		}
		case NEW_PRODUCT:
		return {
			...state,
			newProduct: action.payload
		}
		case NEW_SELL:
		return {
			...state,
			newSell: action.payload
		}
		default:
			return state;
	}
}