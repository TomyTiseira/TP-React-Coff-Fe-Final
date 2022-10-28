import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const ItemDetail = ({ data }) => {
	const [goToCart, setGoToCart] = useState(false);
	const { addProduct } = useCartContext();

	// Añadir producto y setear el goToCart para que no vaya instantaneamente al carrito sino que muestre un mensaje antes.
	const onAdd = (quantity) => {
		setGoToCart(true);
		addProduct(data, quantity);

		// Mostrar alerta al agregar el producto
		Swal.fire({
			title: 'Producto agregado correctamente',
			icon: 'success',
			confirmButtonText: 'Aceptar',
			confirmButtonColor: '#3085d6',
			timer: 1500
		});
	};

	return (
		<div className="box-grid text-center bg">
			<img src={data.link} alt={data.nombre} />
			<h3 className="fs-5 py-2 col">{data.nombre}</h3>
			<div className="fs-6">Descripción: <span>{data.descripcion}</span></div>
			{goToCart ? (
				<Link to="/cart" className="text-white fs-4">Ir al carrito</Link>
			) : (
				<ItemCount initial={1} stock={5} onAdd={onAdd}/>
			)}
		</div>
	);
};

export default ItemDetail;
