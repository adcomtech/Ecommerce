import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(currentCount => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate('/');
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className='redirect-box'>
      <p className=''>
        Please Wait the App will Redirect you in {count} seconds
      </p>
    </div>
  );
};

export default LoadingToRedirect;
