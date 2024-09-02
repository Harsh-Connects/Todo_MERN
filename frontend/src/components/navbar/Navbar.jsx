import React from 'react'
import "./Navbar.css"
import { FaTasks } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
 
const Navbar = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    const logout = () => {
        sessionStorage.clear("id");
        dispatch(authActions.logout());
        history("/");
      };
  return (
    <nav className="navbar navbar-expand-lg ">
        <div className="container">
            <Link className="navbar-brand" to="/"><FaTasks className="mb-1" />&nbsp;<b>todo app</b></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item mx-2">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item mx-2">
                        <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
                    </li>
                    {!isLoggedIn && (<>
                        <div className='d-flex '>
                            <li className="nav-item mx-2 ">
                                <Link className="nav-link active btn-nav " aria-current="page" to="/signup">Sign Up</Link>
                            </li>
                        </div>
                        <div className='d-flex '>
                            <li className="nav-item mx-2">
                                <Link className="nav-link active btn-nav " aria-current="page" to="/signin">Sign In</Link>
                            </li>
                        </div>  
                        </>
                    )}
                    {isLoggedIn && (
                        <div  className='d-flex '>
                            <li className="nav-item mx-2" onClick={logout}>
                                <Link className="nav-link active btn-nav" aria-current="page" to="#">Logout</Link>
                            </li>
                        </div>
                    )}
                </ul>  
            </div>
        </div>
    </nav>
  )
}

export default Navbar