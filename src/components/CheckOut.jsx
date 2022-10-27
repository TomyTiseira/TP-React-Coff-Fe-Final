import React from 'react'
import { useCartContext } from "../context/CartContext";
import Title from './Title';
import { Link } from "react-router-dom";

const CheckOut = () => {
    const { copyCart, totalPriceCopy, clearCartCopy } = useCartContext();

    // Cards de los productos que compró el cliente.
    const cardsProductos = copyCart.map(film => {
		return(
            <div key={film.id} className='box-grid text-center bg'>
                <h3 className="fs-5 py-2 col">{film.nombre}</h3>
                <div className='fs-6'>Precio unitario: <span>${film.precio}</span></div>
                <div className='fs-6'>Cantidad: <span>{film.quantity}</span></div>
            </div>
        );
	});

    // Vaciar el carrito copiado.
    const handleClick = () => {
        clearCartCopy();
    }

    // Si el carrito copiado está vacío se ejecuta.
    if (copyCart.length === 0) {
		return (
			<div className="text-center">
				<p className="text-p mb-4 mt-5 bg px-5 py-3 fs-5">No hay elementos en el carrito</p>
				<Link to="/" className="text-white fs-4">Hacer compras</Link>
			</div>
		);
	}

    return (
        <div id='checkout'>
            <Title greeting="Detalle de la compra"/>
            <div className='grid-container'>
                {cardsProductos}
                <p className="text-p m-auto bg px-5 py-3 fs-5">Total: <span className="fs-6">${totalPriceCopy()}</span></p>
                <Link to="/"><button onClick={handleClick} className="boton-a m-auto">Confirmar</button></Link>
            </div>
        </div>
    );
}

export default CheckOut;