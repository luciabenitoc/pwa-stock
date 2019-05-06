import { FETCH_PRODUCT, FETCH_PRODUCTS, NEW_PRODUCT, UPDATE_PRODUCT, NEW_SELL, NOTFOUND_PRODUCT, LOADING, DELETE_ITEM } from '../actions/types';

const initialState = {
	items: [],
	item: {},
	newSell: null,
	loading: false,
}

function notRepeat(array, atr) {
	let newArray = [];
	let codes = [];
	array.forEach(item=> {
		if (codes.indexOf(item[atr])< 0){
			codes.push(item[atr]);
			newArray.push(item);
		};
	});
	return newArray;
}

export default function(state = initialState, action){
	switch(action.type) {
		case FETCH_PRODUCT:
		return {
			...state,
			items: notRepeat([...state.items, action.payload], 'code'),
			loading: false,
			notFoundProduct: action.code
		};
		case FETCH_PRODUCTS:
		console.log(action.payload);
		return {
			...state,
			items: action.payload,
			loading: false,
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
			loading: false,
			notFoundProduct: action.code
		}
		case LOADING:
		return {
			...state,
			loading: true
		}
		case DELETE_ITEM:
		return {
			...state,
			items: state.items.filter(item => item.code !== action.code )
		}
		default:
			return state;
	}
}