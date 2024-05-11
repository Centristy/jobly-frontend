import React, {useContext} from "react";

import { NavLink } from "react-router-dom";

import UserContext from "./auth/UserContext";


function NavBar( {logout, isLoggedIn} ) {

// dynamic Navbar that shows different links depending on if user is logged in or not


        return(

            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <ul className="navbar-nav me-auto">    

            <NavLink className="nav-link mx-2" to="/">
                Jobly
            </NavLink>

            </ul>
            
            {isLoggedIn ? (



            <ul className="navbar-nav ms-auto">   
            <NavLink className="nav-link mx-2" to="/companies">
                Companies
            </NavLink>

            <NavLink className="nav-link mx-2" to="/jobs">
                Jobs
            </NavLink>

            <NavLink className="nav-link mx-2" to="/profile">
                Profile
            </NavLink>

            <NavLink className="nav-link" to="/" onClick={logout}>
              Log out
            </NavLink>

            </ul>): ( <ul className="navbar-nav ms-auto">   
            <NavLink className="nav-link mx-2" to="/login">
                Login
            </NavLink>
    
            <NavLink className="nav-link mx-2" to="/signup">
                Sign Up
            </NavLink>
            
            </ul>)}

            </nav>

        )

    }



export default NavBar;
