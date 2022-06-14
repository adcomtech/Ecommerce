import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createOrUpdateUser } from '../../httpRequestFun/authHttpRequest';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  let dispatch = useDispatch();

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
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
        })
        .catch(err => console.log(err));
      toast.success(`Registration Successful.`);
      navigate('/login');
      // clear state
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter Email Address'
          autoFocus
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          autoFocus
        />
      </div>

      <div className='form-group'>
        <button type='submit' className='btn'>
          Register
        </button>
      </div>
    </form>
  );

  return (
    <section className='container'>
      <h4>Register</h4>
      <div className=''>{registerForm()}</div>
    </section>
  );
};

export default Register;
