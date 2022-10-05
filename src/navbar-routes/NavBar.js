import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import userContext from '../context/userContext';

/** Navigation bar for Jobly App. */

function NavBar({ logout }) {
  const { user } = useContext(userContext);

  return (
    <nav className="NavBar navbar navbar-light bg-light">
      <NavLink className='navLink' to='/'>Jobly</NavLink>
      {user && <>
        <NavLink className='navLink' to='/companies'>Companies</NavLink>
        <NavLink className='navLink' to='/jobs'>Jobs</NavLink>
        <NavLink className='navLink' to='/profile'>Profile</NavLink>
        <NavLink className='navLink' to='/' onClick={logout}>Logout {user.username}</NavLink>
      </>
      }
      {!user &&
        <>
          <NavLink className='navLink' to='/login'>Login</NavLink>
          <NavLink className='navLink' to='/signup'>Signup</NavLink>
        </>
      }
    </nav>
  );
}

export default NavBar;