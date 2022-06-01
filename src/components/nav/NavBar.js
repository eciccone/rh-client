import './NavBar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

  const [clicked, setClicked] = useState(false);
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Recihub<i className="fa-solid fa-bowl-food"></i></h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li>
          <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to="/">
            Home 
          </NavLink>
        </li>
        <li>
          <NavLink className={(navData) => navData.isActive ? "nav-link active" : "nav-link"} to="/recipes">
            Recipes
          </NavLink>
        </li>

        { isAuthenticated ? (
          <li><button className="nav-button" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button></li>
        ) : (
          <>
            <li><button className="nav-button" onClick={() => loginWithRedirect()}>Login</button></li>
            <li><button className="nav-button"  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign up</button></li>
          </>
        )}
        {/* <li>
          { isAuthenticated ? (
            <button className="nav-button" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          ) : (
            <span>
              <button className="nav-button" onClick={() => loginWithRedirect()}>Login</button>
              <button className="nav-button"  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Sign up</button>
            </span>
          )}
        </li> */}
      </ul>
    </nav>
  );
}