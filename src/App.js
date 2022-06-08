import React from 'react';
import { Cart, ProductListing } from 'components';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<main className="main">
			<header className="header black-bg">
				<h2>
					<Link to="/">Navbar</Link>
				</h2>
				<i className="fas fa-bars hamburger-menu"></i>
				<nav className="nav mobile-menu">
					<ul className="nav-list">
						<li>
							<Link to="/">Products</Link>
						</li>
						<li>
							<Link to="/cart">Cart</Link>
						</li>
					</ul>
				</nav>
			</header>

			<Routes>
				<Route path="/" element={<ProductListing />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</main>
	);
};

export default App;
