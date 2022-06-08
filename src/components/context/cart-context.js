import React, { createContext, useContext, useReducer } from 'react';
import { cartReducer } from 'reducer/cart-reducer';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, {
		cart: [],
		saveForLater: [],
	});
	return (
		<CartContext.Provider value={{ cartState, cartDispatch }}>{children}</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
