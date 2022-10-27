import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Title from "./Title";

const ItemDetailContainer = () => {
	const [data, setData] = useState({});
	const { detalleId } = useParams();

	// Recuperar el producto con el id
	useEffect(() => {
		const querydb = getFirestore();
		const queryDoc = doc(querydb, "items", detalleId);
		getDoc(queryDoc).then((res) => setData({ id: res.id, ...res.data()}));
	}, [detalleId]);

	return (
	<div id="detalle">
		<Title greeting="Detalle"/>
		<ItemDetail data={data}/>
	</div>
	);
};

export default ItemDetailContainer;
