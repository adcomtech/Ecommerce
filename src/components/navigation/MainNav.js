import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const MainNav = () => {
  let dispatch = useDispatch();
  let { user } = useSelector(state => ({ ...state }));

  let navigate = useNavigate();

  const logoutHandler = async () => {
    await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/login');
  };
  return (
    <>
      <NavLink
        to='/'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Home
      </NavLink>

      <NavLink
        to='/create-post'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Create Post
      </NavLink>

      <NavLink
        to='/posts'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Posts List
      </NavLink>

      <NavLink
        to='/about'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        About Us
      </NavLink>

      <NavLink
        to='/contact'
        className={navBar => (navBar.isActive ? 'active-style' : 'link')}
      >
        Contact Us
      </NavLink>

      {!user && (
        <NavLink
          to='/register'
          className={navBar => (navBar.isActive ? 'active-style' : 'link')}
        >
          Sign Up
        </NavLink>
      )}

      {!user && (
        <NavLink
          to='/login'
          className={navBar => (navBar.isActive ? 'active-style' : 'link')}
        >
          Login
        </NavLink>
      )}

      {user && (
        <Link to='#' onClick={logoutHandler}>
          Logout
        </Link>
      )}
      {user && (
        <NavLink
          to='/profile'
          className={navBar => (navBar.isActive ? 'active-style' : 'link')}
        >
          Profile
        </NavLink>
      )}
    </>
  );
};

export default MainNav;
