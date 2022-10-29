import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Title from "./Title";

const ItemDetailContainer = () => {
	const [data, setData] = useState({});
	const { itemId } = useParams();

	// Recuperar el producto con el id
	useEffect(() => {
		const querydb = getFirestore();
		const queryDoc = doc(querydb, "items", itemId);
		getDoc(queryDoc).then((res) => setData({ id: res.id, ...res.data()}));
	}, [itemId]);

	// Consultar si con el id ingresado se recaudo la información (en este caso el nombre) para determinar si existe o no el producto
	if(data.nombre) {
		return (
			<div id="detalle">
				<Title greeting="Detalle"/>
				<ItemDetail data={data}/>
			</div>
		);
	}
	else {
		return(
			<div className='box-grid text-center bg m-5'>
				<h2 className='fs-5 py-2 col text-white'>No existe el producto.</h2>
				<Link to="/"><button className='boton-a'>Volver al inicio</button></Link>
			</div>
		);
	}
};

export default ItemDetailContainer;
