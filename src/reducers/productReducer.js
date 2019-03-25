import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_PRODUCT, UPDATE_PRODUCT, NEW_SELL, NOTFOUND_PRODUCT, LOADING } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	newSell: null,
	loading: false
}

export default function(state = initialState, action){
	switch(action.type) {
		case FETCH_PRODUCT:
		return {
			...state,
			item: action.payload,
			loading: false
		};
		case FETCH_PRODUCTS:
		console.log(action.payload);
		return {
			...state,
			items: action.payload,
			loading: false
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
		case LOADING:
		return {
			...state,
			loading: true
		}
		default:
			return state;
	}
}