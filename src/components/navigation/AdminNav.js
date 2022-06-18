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
            department
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/degree'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Degrees
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/material-type'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Materials
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/create-topic'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Add New Topic
          </NavLink>
        </li>

        <li>
          <NavLink
            to='/admin/topics'
            className={navBar =>
              navBar.isActive ? 'active-style' : 'nav-link'
            }
          >
            Topic Lists
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
