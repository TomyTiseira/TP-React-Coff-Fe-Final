import React from "react";
import { Link } from "react-router-dom";

const Item = ({ info }) => {
	return (
		<Link to={`/item/${info.id}`} className="text-white text-decoration-none">
			<img src={info.link} alt={info.nombre}/>
			<h3 className="fs-5 py-2 col">{info.nombre}</h3>
		</Link>
	);
};

export default Item;
