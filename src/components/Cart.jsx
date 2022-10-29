import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import ItemCart from "./ItemCart";
import Title from './Title';

const Cart = () => {
	const { cart, totalPrice } = useCartContext();

	// Si el carrito está vacío se ejecuta.
	if (cart.length === 0) {
		return (
			<div className="text-center">
				<p className="text-p mb-4 mt-5 bg px-5 py-3 fs-5">No hay elementos en el carrito</p>
				<Link to="/" className="text-white fs-4">Hacer compras</Link>
			</div>
		);
	}

	return (
		<div id="carrito">
			<Title greeting="Carrito"/>
			<div className="grid-container">
				{cart.map((product) => (
					<ItemCart key={product.id} product={product}/>
				))}
				<p className="text-p m-auto bg px-5 py-3 fs-5">Total: <span className="fs-6">${totalPrice()}</span></p>
				<Link to="/checkout"><button className="boton-a m-auto">Emitir compra</button></Link>
			</div>
		</div>
	);
};

export default Cart;
