import { Navigate } from 'react-router-dom';

const CheckRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default CheckRoute;
