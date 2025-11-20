import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.type !== 'admin') {
    return <Navigate to="/jobs" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AdminRoute;