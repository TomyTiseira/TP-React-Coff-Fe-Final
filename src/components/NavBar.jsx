import React from 'react';
import logo2 from '../image/logo2.svg'
import CartWidget from './CartWidget';
import { NavLink } from "react-router-dom";

const navbar = () => {
  return (
    <nav className='flex-container'>
      <NavLink to ='/'><img src={logo2} alt="Coffe Fe" width="60" height="60"/></NavLink>
      <div>
        <NavLink to='/' className='nav-a'>Inicio</NavLink>
        <NavLink to='/category/1' className='nav-a'>Bebidas</NavLink>
        <NavLink to='/category/2' className='nav-a'>Comidas</NavLink>
      </div>
      <span>
        <CartWidget/>
      </span>
    </nav>
  );
}

export default navbar;