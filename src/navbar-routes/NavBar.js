import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import userContext from '../context/userContext';

/** Navigation bar for Jobly App. */

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  return (
    <nav class="NavBar navbar navbar-expand navbar-dark bg-primary">
      <div class="container-fluid">
        <NavLink className='navbar-brand ms-2' to='/'>Jobly</NavLink>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ms-auto me-1">

            {user && <>
              <li class="nav-item">
                <NavLink className='nav-link' to='/companies'>Companies</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className='nav-link' to='/jobs'>Jobs</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className='nav-link' to='/profile'>Profile</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className='nav-link' to='/' onClick={logout}>Logout {user.username}</NavLink>
              </li>
            </>}

            {!user && <>
              <li class="nav-item">
                <NavLink className='nav-link' to='/login'>Login</NavLink>
              </li>
              <li class="nav-item">
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
