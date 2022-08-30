import React from 'react'
import "./style.css"

function Navbar(props){
    const {setView, isLoggedIn, setisLoggedIn} = props
    return(
        <div className="navbar-main">
            <div className="navbar-left-menu-main">
                <div className="navbar-logo">
                    <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo Kafene" />
                    <p className="navbar-text-label"> Kafene </p>
                </div>
                <nav>
                    <span className="navbar-menu" onClick={() => setView('orders')}>Orders</span>
                    <span className="navbar-menu" onClick={() => setView('products')}>Products</span>
                    <span className="navbar-menu" onClick={() => setView('users')}>Users</span>
                </nav>
            </div>
            <span style={{display: !isLoggedIn ? "none" : "block"}} className="navbar-menu" id="logout-button" onClick={()=>{setisLoggedIn(false);localStorage.setItem('loginStatus', false)}}>Logout</span>
        </div>
    )
}

export default Navbar;