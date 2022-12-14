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

	const cantidadProductos = () => {
		let cantidad = 0;
		for (let i=0; i<cart.length; i++) {
			cantidad += cart[i].quantity;
		}

		return cantidad;
	}

	return (
		<div id="carrito">
			<Title greeting="Carrito"/>
			<div className="grid-container">
				{cart.map((product) => (
					<ItemCart key={product.id} product={product}/>
				))}
				<p className="text-p m-auto bg px-5 py-3 fs-5">Cantidad de productos: <span className="fs-6">{cantidadProductos()}</span></p>
				<p className="text-p m-auto bg px-5 py-3 fs-5">Total: <span className="fs-6">${totalPrice()}</span></p>
				<Link to="/cart/checkout" className="my-auto"><button className="boton-a">Emitir compra</button></Link>
			</div>
		</div>
	);
};

export default Cart;
