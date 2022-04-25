import React from 'react'
import './MainProduct.css'

function MainProduct() {

  return (
    <div className='main-product'>
      <div className="back-green">APPLE</div>
      <div className="dev"><span className="line"></span>AbdRahmen</div>
      <div className="box">
        <img src="/assets/iphone-13-pro-max.png" alt="" />
        <h1>IPHONE</h1>
        <p>13 pro max</p>
        <span id="reserve">RESERVE NOW</span>
      </div>
      <span className='menu'><i className="fa-solid fa-bars"></i>MENU</span>
      <div className="socials">
      <i className="fa-brands fa-facebook"></i>
      <i className="fa-brands fa-twitter"></i>
      <i className="fa-brands fa-instagram"></i>
      </div>
    </div>
  )
}

export default MainProduct
