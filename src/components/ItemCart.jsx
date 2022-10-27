import React from 'react';
import { useCartContext } from '../context/CartContext';

const ItemCart = ({ product }) => {
    const { removeProduct } = useCartContext();

    return (
        <div className='box-grid text-center bg'>
            <img className='mb-2' src={product.link} alt={product.nombre}/>
            <h3>Nombre: {product.nombre}</h3>
            <div>Cantidad: <span>{product.quantity}</span></div>
            <div>Precio unitario: <span>${product.precio}</span></div>
            <div>Subtotal: <span>${product.quantity * product.precio}</span></div>
            <button className='boton-a' onClick={() => removeProduct(product.id)}>Eliminar</button>
        </div>
    );
}

export default ItemCart;