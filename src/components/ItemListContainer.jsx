import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import Title from "./Title";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const ItemListContainer = () => {
	const {id} = useParams();
	const [data, setData] = useState([]);
	
	// Recuperar los datos de los productos de la DB.
	useEffect(() => {
		const querydb = getFirestore();
		const queryCollection = collection(querydb, "items");
		getDocs(queryCollection).then((res) => {
			const aux = res.docs.map((product) => ({id: product.id, ...product.data()}));

			// Recuperar según categoría en caso de tener, en caso de no tener, recuperar todos.
			!id ? setData(aux) : setData(aux.filter((product) => product.categoria === parseInt(id)));
		});
	}, [id]);

	return (
		<div id="menu">
			<Title greeting="Menu"/>
			<ItemList data={data}/>
		</div>
	);
};

export default ItemListContainer;
