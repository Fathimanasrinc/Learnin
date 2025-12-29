import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/LOGO.png";
import blank from "../../assets/blank.png";
import { Link} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
  return (
    <>
    <div className='navbar'>
        <div className='left-side'>
            <Link  to="/"><img className='logo nav-items' src={logo}></img></Link>
        </div>
        <div className='search-bar'>
            <input className='search-input' type="text" placeholder='Search skills' />
            <button className='search-icon'><FontAwesomeIcon icon={faSearch} size="lg" /></button>
        </div>
        <div className='right-side'>
            <Link to="/profile"><img className="profile-pic nav-items"  src={blank} alt="" /></Link>
        </div>
        
    </div>
    </>
  )
}

export default Navbar
