import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: 'http://localhost:3000/login',
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
        console.log('ERROR MSG IN FORGOT PASSWORD', error);
      });
  };

  return (
    <div className='container'>
      {loading ? <h4 className=''>Loading</h4> : <h4>Forgot Password</h4>}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Type your email'
          autoFocus
        />
        <br />
        <button className='btn' disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
