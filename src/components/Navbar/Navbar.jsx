import React from 'react'
import Style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { colorMap } from '@syncfusion/ej2/treemap'
export default function Navbar() {
  return <>

<nav className={`container-fluid ${Style.navbaro} navbar-dark navbar navbar-expand-lg bg-main`}>
  <div className="container">
    <Link className="navbar-brand" to="/home"><img src="nocurve.png" className={`${Style.imgo}`}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className={`${Style.navbarBrand} `} id="navbarSupportedContent">
      <ul className={`navbar-nav ms-auto mb-2 mb-lg-0  `}>
        <li className="nav-item ">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active " to="/registerCustomer">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/ordersCust">Orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/cart">cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="#">Services</Link>
        </li>
      </ul>

    </div>
  </div>
</nav>
   
  </>
}