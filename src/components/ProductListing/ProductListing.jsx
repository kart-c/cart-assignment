import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductListing.module.css';
import { useCart } from 'components/context/cart-context';
import { useNavigate } from 'react-router-dom';

const ProductListing = () => {
	const [products, setProducts] = useState([]);

	const navigate = useNavigate();

	const {
		cartState: { cart },
		cartDispatch,
	} = useCart();

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('products.json');
				if (response.status === 200) {
					setProducts(response.data.products);
				}
			} catch (error) {
				console.error('ERROR', error);
			}
		};
		fetchProducts();
	}, []);

	const addToCartHandler = (id) => {
		const product = products.find((item) => item.id === id);
		cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, qty: 1 } });
	};

	const cartItemExists = (id) => cart.some((item) => item.id === id);

	return (
		<>
			<ul className={styles.products}>
				{products.length > 0 ? (
					products.map((product) => (
						<li key={product.id}>
							<article className={styles.productCard}>
								<img src={product.img} alt={product.name} />
								<div className={styles.productInfo}>
									<h4>
										{product.name} | <span>{product.brand}</span>
									</h4>
									<p>
										<span className={styles.sizesTitle}>Sizes</span>
										{product.sizes.map((size) => (
											<span key={size} className={styles.sizes}>
												{size}
											</span>
										))}
									</p>
									<div>Price: {product.price}</div>
									<button
										className={`btn btn-primary ${styles.cartBtn}`}
										onClick={
											cartItemExists(product.id)
												? () => navigate('/cart')
												: () => addToCartHandler(product.id)
										}
									>
										{cartItemExists(product.id) ? 'Go to Cart' : 'Add to Cart'}
									</button>
								</div>
							</article>
						</li>
					))
				) : (
					<div>No products Found</div>
				)}
			</ul>
		</>
	);
};

export { ProductListing };
