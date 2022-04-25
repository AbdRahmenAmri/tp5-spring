import React from 'react'
import Logo from '../logo/Logo'
import './Header.css'


function Header() {
  return (
    <header className='header'>
      <ul className="nav">
          <li><Logo/></li>
          <li>Product</li>
          <li>Contact</li>
      </ul>
      <i className="search fa-solid fa-magnifying-glass"></i>
    </header>
  )
}

export default Header
