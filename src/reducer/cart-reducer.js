export const cartReducer = (state, { type, payload }) => {
	switch (type) {
		case 'ADD_TO_CART':
			return { ...state, cart: [...state.cart, payload] };

		case 'REMOVE_FROM_CART':
			return { ...state, cart: payload };

		case 'INCREMENT_ITEM':
			return { ...state, cart: payload };

		case 'DECREMENT_ITEM':
			return { ...state, cart: payload };

		case 'SAVE_LATER':
			return { ...state, cart: payload.updatedCart, saveForLater: payload.updatedSaveLater };

		case 'SAVE_LATER_REMOVE':
			return { ...state, saveForLater: payload };

		case 'SAVE_LATER_TO_CART':
			return { ...state, cart: payload.updatedCart, saveForLater: payload.updatedSaveLater };

		default:
			throw new Error('NO CASE DEFINED IN CART REDUCER');
	}
};
