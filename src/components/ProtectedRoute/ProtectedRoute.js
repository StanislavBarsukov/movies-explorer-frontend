import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn }) => {
  const token = localStorage.getItem('token');
  if (!loggedIn && !token) {
    return <Navigate to="/" />;
  }
  return children
};

export default ProtectedRoute;
