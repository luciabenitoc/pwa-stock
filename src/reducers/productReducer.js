import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_PRODUCT, UPDATE_PRODUCT, NEW_SELL, NOTFOUND_PRODUCT } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	newSell: null
}

export default function(state = initialState, action){
	switch(action.type) {
		case FETCH_PRODUCT:
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
		case UPDATE_PRODUCT:
		return {
			...state,
			item: action.payload
		}
		case NEW_SELL:
		return {
			...state,
			newSell: action.payload
		}
		case NOTFOUND_PRODUCT:
		return {
			...state,
			notFoundProduct: action.code
		}
		default:
			return state;
	}
}