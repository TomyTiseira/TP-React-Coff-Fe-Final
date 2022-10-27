import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import ItemCart from "./ItemCart";
import Title from './Title';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Cart = () => {
	const { cart, totalPrice, clearCart, completeCartCopy } = useCartContext();

	// Orden que incluye los datos del cliente (estaticos al no tener una base de datos con clientes, funcionalidar a implementar más adelante), listado de productos, total.
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

	// Mostrar alerta al realizar correctamente la compra.
	const alertaCompraRealizada = () => {
		Swal.fire({
			title: 'Compra realizada correctamente',
			icon: 'success',
			confirmButtonText: 'Aceptar',
			confirmButtonColor: '#3085d6',
			timer: 1500
		});
	}

	// Función que guarda en DB la orden, limpia el carrito y lo clona para mostrar el clonado en el detalle de la compra (borrado por temas de seguridad del sistema).
	const handleClick = () => {
		const db = getFirestore();
		const ordersCollection = collection(db, "orders");
		addDoc(ordersCollection, order).then(() => {
			completeCartCopy(cart);
			clearCart();
			setTimeout(() => {
				alertaCompraRealizada();
			}, 300);			
		});		
	};

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
				<Link to="/checkout"><button onClick={handleClick} className="boton-a m-auto">Emitir compra</button></Link>
			</div>
		</div>
	);
};

export default Cart;
