import React from 'react';
import { useCart } from 'components/context/cart-context';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';
import { PriceDetails } from 'components/PriceDetails/PriceDetails';

const Cart = () => {
	const {
		cartState: { cart, saveForLater },
		cartDispatch,
	} = useCart();

	const navigate = useNavigate();

	const handleCartRemove = (id) => {
		const updatedCart = cart.filter((item) => item.id !== id);
		cartDispatch({ type: 'REMOVE_FROM_CART', payload: updatedCart });
	};

	const handleIncrement = (id) => {
		const updatedCart = cart.map((item) =>
			item.id === id ? { ...item, qty: item.qty + 1 } : item
		);
		cartDispatch({ type: 'INCREMENT_ITEM', payload: updatedCart });
	};

	const handleDecrement = (id) => {
		const updatedCart = cart.map((item) =>
			item.id === id ? { ...item, qty: item.qty - 1 } : item
		);
		cartDispatch({ type: 'DECREMENT_ITEM', payload: updatedCart });
	};

	const handleSaveLater = (id) => {
		const item = cart.find((item) => item.id === id);
		const updatedCart = cart.filter((item) => item.id !== id);
		const updatedSaveLater = [...saveForLater, item];
		cartDispatch({ type: 'SAVE_LATER', payload: { updatedCart, updatedSaveLater } });
	};

	const saveLaterRemove = (id) => {
		const updatedSaveLater = saveForLater.filter((item) => item.id !== id);
		cartDispatch({ type: 'SAVE_LATER_REMOVE', payload: updatedSaveLater });
	};

	const moveToCart = (id) => {
		const item = saveForLater.find((item) => item.id === id);
		const updatedCart = [...cart, item];
		const updatedSaveLater = saveForLater.filter((item) => item.id !== id);
		cartDispatch({ type: 'SAVE_LATER_TO_CART', payload: { updatedCart, updatedSaveLater } });
	};

	const priceAfterDiscount = (price, discount) => price - (price * discount) / 100;

	return cart.length === 0 && saveForLater.length === 0 ? (
		<div className={styles.empty}>
			<h2>No products in cart</h2>
			<button className="btn btn-primary" onClick={() => navigate('/')}>
				Continue Shopping
			</button>
		</div>
	) : (
		<div className={styles.main}>
			<div className={styles.cart}>
				{cart.length > 0 ? (
					<>
						<h3>Cart ({cart.length})</h3>
						{cart.map((cartItem) => (
							<div className={`card horizontal-card ${styles.card}`} key={cartItem.id}>
								<img src={cartItem.img} alt={cartItem.name} className="card-img" />
								<div className="content">
									<h3>{cartItem.name}</h3>
									<div className="buy-info">
										<p className={styles.original}>
											<strong>Rs. {cartItem.price}</strong>
											<small> Discount {cartItem.discount} % </small>
										</p>
										<p>
											<strong>Rs. {priceAfterDiscount(cartItem.price, cartItem.discount)}</strong>{' '}
										</p>
										<div className="product-count">
											<button
												disabled={cartItem.qty <= 1}
												onClick={() => handleDecrement(cartItem.id)}
											>
												<i className="fa-solid fa-minus"></i>
											</button>
											<span>{cartItem.qty}</span>
											<button onClick={() => handleIncrement(cartItem.id)}>
												<i className="fa-solid fa-plus"></i>
											</button>
										</div>
									</div>
									<div className={styles.btnContainer}>
										<button
											className="btn btn-primary"
											onClick={() => handleSaveLater(cartItem.id)}
										>
											Save for Later
										</button>
										<button
											className={`btn btn-primary ${styles.secondaryBtn}`}
											onClick={() => handleCartRemove(cartItem.id)}
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</>
				) : null}
				{saveForLater.length > 0 ? (
					<>
						<h3>Saved for Later ({saveForLater.length})</h3>
						{saveForLater.map((item) => (
							<div key={item.id}>
								<div className={`card horizontal-card ${styles.card}`}>
									<img src={item.img} alt={item.name} className="card-img" />
									<div className="content">
										<h3>{item.name}</h3>
										<div className="buy-info">
											<p>
												<strong>Rs. {item.price}</strong>{' '}
											</p>
										</div>
										<div className={styles.btnContainer}>
											<button className="btn btn-primary" onClick={() => moveToCart(item.id)}>
												Move to Cart
											</button>
											<button
												className={`btn btn-primary ${styles.secondaryBtn}`}
												onClick={() => saveLaterRemove(item.id)}
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</>
				) : null}
			</div>
			<PriceDetails />
		</div>
	);
};

export { Cart };
