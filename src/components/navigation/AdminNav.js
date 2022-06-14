import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div className='side-nav'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <NavLink
            to='/admin/dashboard'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/users'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/department'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            departmnt
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
