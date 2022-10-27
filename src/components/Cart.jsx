import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import ItemCart from "./ItemCart";
import Title from './Title';

const Cart = () => {
	const { cart, totalPrice, clearCart } = useCartContext();

	const order = {
		buyer: {
			name: "Tomy",
			email: "Tomy@gmail.com",
			phone: "123123",
			address: "Argentina",
		},
		items: cart.map((product) => ({
			id: product.id,
			nombre: product.nombre,
			precio: product.precio,
			quantity: product.quantity,
		})),
		total: totalPrice(),
	};

	const handleClick = () => {
		const db = getFirestore();
		const ordersCollection = collection(db, "orders");
		addDoc(ordersCollection, order).then(({ id }) => console.log(id));
		clearCart();
	};

	if (cart.length === 0) {
		return (
			<div className="text-center">
				<p className="text-p my-4 bg px-5 py-3 fs-5">No hay elementos en el carrito</p>
				<Link to="/" className="text-white fs-4">Hacer compras</Link>
			</div>
		);
	}
	console.log(totalPrice())
	return (
		<div id="carrito">
			<Title greeting="Carrito"/>
			<div className="grid-container">
				{cart.map((product) => (
					<ItemCart key={product.id} product={product} />
				))}
				<p className="text-p m-auto bg px-5 py-3 fs-5">Total: <span className="fs-6">${totalPrice()}</span></p>
				<Link to="/"><button onClick={handleClick} className="boton-a">Emitir compra</button></Link>
			</div>
		</div>
	);
};

export default Cart;
