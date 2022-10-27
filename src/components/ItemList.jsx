import React, { useEffect, useState } from "react";
import Item from "./Item";
import { collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const ItemList = ({data = []}) => {
	

	const cardsProductos = data.map(film => {
                return(
                <div key={film.id} className='box-grid text-center bg'>
                    <Item info={film}/>
                </div>);
            });

	return (
		<div className="grid-container">
			{cardsProductos}
		</div>
	);
};

export default ItemList;
