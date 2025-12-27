import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/LOGO.png";
import blank from "../../assets/blank.png";
import notify from "../../assets/notify.svg";
import searchIcon from "../../assets/search-solid.svg";
import "./Navbar.css";

function Navbar() {
  return (
    <>
    <div className='navbar'>
        <div className='left-side'>
            <img className='logo nav-items' src={logo}></img>
        </div>
        <div className='search-bar'>
            <input className='search-input' type="text" placeholder='Search skills' />
            <button className='search-icon'><FontAwesomeIcon icon={faSearch}  /></button>
        </div>
        <div className='right-side'>
            <img className='nav-items' src={notify}/>
            <img className="profile-pic nav-items"  src={blank} alt="" />
        </div>
        
    </div>
    </>
  )
}

export default Navbar
