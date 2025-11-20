import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const EmployeeRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.type !== 'employee') {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default EmployeeRoute;