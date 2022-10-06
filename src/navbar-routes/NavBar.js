import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import userContext from '../context/userContext';


/** Navigation bar for Jobly App. */

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  return (
    <nav className="NavBar navbar navbar-expand navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className='navbar-brand ms-2' to='/'>Jobly</NavLink>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto me-1">

            {user && <>
              <li className="nav-item">
                <NavLink className='nav-link' to='/companies'>Companies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/jobs'>Jobs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/profile'>Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/' onClick={logout}>Logout {user.username}</NavLink>
              </li>
            </>}

            {!user && <>
              <li className="nav-item">
                <NavLink className='nav-link' to='/login'>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/signup'>Signup</NavLink>
              </li>
            </>}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;