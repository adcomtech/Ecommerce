import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from '../../utilities/LoadingToRedirect';
import UserNav from '../navigation/UserNav';

const UserPrivateRoute = () => {
  const { user } = useSelector(state => ({ ...state }));

  const isAuthenticated = user && user.token;
  return isAuthenticated ? (
    <div className='container-layout'>
      <UserNav />

      <div className='section-box'>
        <Outlet />
      </div>
    </div>
  ) : (
    <LoadingToRedirect />
  );

  //   return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserPrivateRoute;
