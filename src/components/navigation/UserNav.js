import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <div className='side-nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <NavLink
            to='/user/settings'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/user/update-password'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Update Password
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/user/wishlists'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Wishlists
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
