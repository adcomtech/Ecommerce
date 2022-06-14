import { Navigate } from 'react-router-dom';

export const roleBasedRedirect = res => {
  if (res.data.role === 'admin') {
    <Navigate to={'/admin/dashboard'} replace />;
  } else {
    <Navigate to={'/user/settings'} />;
  }
};
