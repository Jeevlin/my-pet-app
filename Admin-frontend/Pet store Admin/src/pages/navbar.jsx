import './navbar.css'
import React from 'react';
import { useState } from 'react';
import Inventory from './inventory';
import Customers from './customers';
import PetOrders from './petOrders';
import { Logout } from '../components/modal/modal';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState(0);
    const [showLogout, setShowLogout] = useState(false);
    const handleLogoutClose = () => setShowLogout(false);
    const handleLogoutshow = () => setShowLogout(true);

  
    const handleNavClick = (index) => {
      setActiveLink(index);
    };
  

    return (

      <div className="container">
        <div className='top'>
            <p style={{fontWeight:"bold",
                       fontSize:"22px",
                       marginRight:"1000px",
                       color:"white"}}>Raz Pet store Admin</p>
            <button style={{backgroundColor:"darkorange",
                            color:"black",
                            fontSize:"15px",
                            fontWeight:"700"}}onClick={handleLogoutshow}>Logout</button>
            <Logout show={showLogout} handleClose={handleLogoutClose}/>
        </div>
        <nav className="nav justify-content-center">
          <a
            className={`nav-link ${activeLink === 0 ? 'active' : ''}`}
            onClick={() => handleNavClick(0)}
            href="#"
          >
          <li>Register Customers</li> 
          </a>
          <a
            className={`nav-link ${activeLink === 1 ? 'active' : ''}`}
            onClick={() => handleNavClick(1)}
            href="#"
          >
            <li>Manage Pet Orders</li>
          </a>
          <a
            className={`nav-link ${activeLink === 2 ? 'active' : ''}`}
            onClick={() => handleNavClick(2)}
            href="#"
          >
          <li>Manage Pet Inventory</li> 
          </a>
          <div className="underline" style={{ transform: `translateX(${activeLink * 128}%)` }}></div>
  
        </nav>
       
        <div className="content">
          {activeLink === 0 && <Customers/>}
          {activeLink === 1 && <PetOrders/>}
          {activeLink === 2 && <Inventory/>}
        </div>
      </div>
    );
  };
  export default Navbar;
  