import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import Title from "./Title";
import { collection, getDocs, getFirestore, query, where} from "firebase/firestore";

export const ItemListContainer = () => {
	const {id} = useParams()
	const [data, setData] = useState([]);
		
	useEffect(() => {
		const querydb = getFirestore();
		const queryCollection = collection(querydb, "items");
		getDocs(queryCollection).then((res) =>
			setData(res.docs.map((product) => ({id: product.id, ...product.data()}))),
		);
		if(id) {
			setData(data.filter((product) => product.categoria == id));
		}
	}, [id]);

	return (
		<div id="menu">
			<Title greeting="Menu"/>
			<ItemList data={data}/>
		</div>
	);
};

export default ItemListContainer;
