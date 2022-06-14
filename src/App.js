import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import './App.css';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Header from './components/Header';
import { currentUser } from './httpRequestFun/authHttpRequest';
import UserPrivateRoute from './components/privateRoutes/UserPrivateRoute';
import AdminPrivateRoute from './components/privateRoutes/AdminPrivateRoute';
import UserSettingsPage from './pages/users/UserSettingsPage';
import UserPassUpdatedPage from './pages/users/UserPassUpdatedPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import CreateDepartmentPage from './pages/admin/department/CreateDepartmentPage';
import UpdateDepartmentPage from './pages/admin/department/UpdateDepartmentPage';

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log(idTokenResult);
        currentUser(idTokenResult.token)
          .then(res => {
            // console.log(res);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                _id: res.data._id,
                token: idTokenResult.token,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
              },
            });
          })
          .catch(err => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <div className='header'>
        <Header />
      </div>
      <div className=''>
        <ToastContainer className='notification' />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        {/* Users Nested Routes */}
        <Route element={<UserPrivateRoute />}>
          <Route path='/user/settings' element={<UserSettingsPage />} />
          <Route
            path='/user/update-password'
            element={<UserPassUpdatedPage />}
          />
        </Route>

        {/* Admin Nested Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsersPage />} />
          <Route path='/admin/department' element={<CreateDepartmentPage />} />
          <Route
            path='/admin/department/:slug'
            element={<UpdateDepartmentPage />}
          />
          <Route path='/admin/departments' element={<AdminProductsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
