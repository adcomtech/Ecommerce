import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { currentAdmin } from '../../httpRequestFun/authHttpRequest';
import LoadingToRedirect from '../../utilities/LoadingToRedirect';
import AdminNav from '../navigation/AdminNav';

const AdminPrivateRoute = () => {
  const { user } = useSelector(state => ({ ...state }));
  const [ok, setOk] = useState(false);

  const isAuthenticated = user && user.token;

  useEffect(() => {
    if (isAuthenticated) {
      currentAdmin(user.token)
        .then(res => {
          console.log('CURRENT ADMIN RES', res);
          setOk(true);
        })
        .catch(err => {
          console.log('ADMIN ROUTE ERR', err);
          setOk(false);
        });
    }
  }, [user, isAuthenticated]);

  return ok ? (
    <div className='container-layout'>
      <AdminNav />

      <div className='section-box'>
        <Outlet />
      </div>
    </div>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminPrivateRoute;
