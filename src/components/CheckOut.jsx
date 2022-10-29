import React, { useState } from 'react'
import { useCartContext } from "../context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Title from './Title';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DateTime } from "luxon";

const CheckOut = () => {
    const [ ordenCreada, setOrdenCreada ] = useState(false);
    const [ name, setName ] = useState("");
    const [ apellido, setApellido ] = useState("");
    const [ telefono, setTelefono ] = useState(0);
    const [ email, setEmail ] = useState("");
    const [ emailCopy, setEmailCopy ] = useState("");

    const { cart, totalPrice, clearCart } = useCartContext();

    // Orden que incluye los datos del cliente (estaticos al no tener una base de datos con clientes, funcionalidar a implementar más adelante), listado de productos, total.
	let order = {
        buyer: {
			name,
            apellido,
            telefono,
			email,
		},
		items: cart.map((product) => ({
			id: product.id,
			nombre: product.nombre,
			precio: product.precio,
			quantity: product.quantity,
		})),
        estado: "generada",
        fecha: DateTime.now().toLocaleString(),
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
			clearCart();
			setTimeout(() => {
				alertaCompraRealizada();
			}, 200);			
		});		
	};

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name !== "" && apellido !== "" && telefono !== 0 && email !== "" && email === emailCopy) {
            setOrdenCreada(true);
        }
    }

    const handleOnChangeName = (e) => {
        setName(e.target.value);
    }

    const handleOnChangeApellido = (e) => {
        setApellido(e.target.value);
    }
    
    const handleOnChangeTelefono = (e) => {
        setTelefono(e.target.value);
    }

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnChangeEmailCopy = (e) => {
        setEmailCopy(e.target.value);
    }

    // Cards de los productos que compró el cliente.
    const cardsProductos = cart.map(product => {
		return(
            <div key={product.id} className='box-grid text-center bg'>
                <h3 className="fs-5 py-2 col">{product.nombre}</h3>
                <div className='fs-6'>Precio unitario: <span>${product.precio}</span></div>
                <div className='fs-6'>Cantidad: <span>{product.quantity}</span></div>
            </div>
        );
	});

    // Si el carrito copiado está vacío se ejecuta.
    if (cart.length === 0) {
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
            {ordenCreada ? (
                <div className='grid-container border border-white p-4'>
                    {cardsProductos}
                    <p className="text-p m-auto bg px-5 py-3 fs-5">Total: <span className="fs-6">${totalPrice()}</span></p>
                    <Link to="/" className='my-auto'><button onClick={handleClick} className="boton-a">Confirmar</button></Link>
                </div>) 
                : 
                (<form className='form-container m-auto'>
                    <div className='inputBox rounded-pill'>
                        <label>
                            Nombre:
                            <input type="text" name="name" placeholder='Nombre' onChange={handleOnChangeName}/>
                        </label>
                    </div>

                    <div className='inputBox rounded-pill'>
                        <label>
                            Apellido:
                            <input type="text" name="apellido" placeholder='Apellido' onChange={handleOnChangeApellido}/>
                        </label>
                    </div>

                    <div className='inputBox rounded-pill'>
                        <label>
                            Teléfono:
                            <input type="number" name="telefono" placeholder='Teléfono' onChange={handleOnChangeTelefono}/>
                        </label>
                    </div>

                    <div className='inputBox rounded-pill'>
                        <label>
                            Email:
                            <input type="text" name="email" placeholder='coff-fe@example.com' onChange={handleOnChangeEmail}/>
                        </label>
                    </div>

                    <div className='inputBox rounded-pill'>
                        <label>
                            Confirmacion de email:
                            <input type="text" name="emailCopy" placeholder='coff-fe@example.com' onChange={handleOnChangeEmailCopy}/>
                        </label>
                    </div>
                    <input type="submit" value="Confirmar datos" className='boton-a mb-4' onClick={handleSubmit}/>
                </form>)} 
        </div>
    );
}

export default CheckOut;