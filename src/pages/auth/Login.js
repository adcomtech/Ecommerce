import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { auth, googleAuthProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createOrUpdateUser } from '../../httpRequestFun/authHttpRequest';
// import { roleBasedRedirect } from '../../utilities/UserRoleRedirect';

const Login = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);

  // Checking the User Based on the Role and Redirect
  const roleBasedRedirect = res => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/settings');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // Create and Update User from the Backend

      createOrUpdateUser(idTokenResult.token)
        .then(res => {
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
          // Redirecting the User Based on the Role
          roleBasedRedirect(res);
        })
        .catch(err => console.log(err));

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async result => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        // Create and Update User from the Backend
        createOrUpdateUser(idTokenResult.token)
          .then(res => {
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
            // Redirecting the User Based on the Role
            roleBasedRedirect(res);
          })
          .catch(err => console.log(err));

        navigate('/');
      })
      .catch(err => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Your email'
          autoFocus
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Your password'
        />
      </div>

      <br />
      <button
        onClick={handleSubmit}
        type='submit'
        className='btn'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </button>
    </form>
  );

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

          <button onClick={googleLogin} type='submit' className=''>
            Login with Google
          </button>

          <Link to='/forgot-password' className=''>
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
