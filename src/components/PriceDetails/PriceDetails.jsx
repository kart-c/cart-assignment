import { useCart } from 'components/context/cart-context';
import React, { useEffect, useState } from 'react';
import styles from './PriceDetails.module.css';

const PriceDetails = () => {
	const [modalState, setModalState] = useState(false);
	const [discount, setDiscount] = useState();
	const {
		cartState: { cart },
	} = useCart();

	const totalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

	const discountPrice = discount ? (totalPrice * discount) / 100 : 0;

	const total = totalPrice - discountPrice;

	useEffect(() => {
		if (discount === 15) {
			if (totalPrice < 600) {
				setDiscount();
			}
		}
		if (discount === 10) {
			if (totalPrice < 400) {
				setDiscount();
			}
		}
	}, [discount, totalPrice]);

	return (
		<>
			{modalState ? (
				<>
					<div
						className={`modal-backdrop ${styles.backdrop}`}
						onClick={() => setModalState(false)}
					></div>
					<div className={`modal`}>
						<div className="modal-container">
							<div className="modal-header">
								<h3>Select Coupon</h3>
							</div>
							<div className={`radio-container ${styles.labelContainer}`}>
								<input
									type="radio"
									name="example input"
									id="radio-input-1"
									checked={discount === 10}
									disabled={totalPrice < 400}
									onChange={() => setDiscount(10)}
								/>
								<label htmlFor="radio-input-1">10% discount - for total above 400</label>
							</div>
							<div className={`radio-container ${styles.labelContainer}`}>
								<input
									type="radio"
									name="example input"
									id="radio-input-2"
									disabled={totalPrice < 600}
									checked={discount === 15}
									onChange={() => setDiscount(15)}
								/>
								<label htmlFor="radio-input-2">15% discount - for total above 600</label>
							</div>
						</div>
					</div>
				</>
			) : null}
			<div className={styles.priceContainer}>
				<div className={styles.details}>
					<h3>PriceDetails</h3>
					<button className={`btn ${styles.couponBtn}`} onClick={() => setModalState(true)}>
						Add coupon
					</button>
				</div>
				<div>
					<div className={styles.details}>
						<p>
							Price ({cart.length} {cart.length > 1 ? 'items' : 'item'})
						</p>
						<p>Rs. {totalPrice.toFixed(2)} /-</p>
					</div>
					{discount ? (
						<div className={styles.details}>
							<p>Discount {discount} %</p>
							<p>- Rs. {discountPrice.toFixed(2)} /-</p>
						</div>
					) : null}
					<div className={styles.details}>
						<p>Delivery Charges</p>
						<p>FREE</p>
					</div>
					<div className={styles.details}>
						<p>Total Amount</p>
						<p>Rs. {total.toFixed(2)} /-</p>
					</div>
				</div>
			</div>
		</>
	);
};

export { PriceDetails };
