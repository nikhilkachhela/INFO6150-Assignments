import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.type === 'admin' ? 'Admin Portal' : 'Employee Portal'}
        </Typography>
        
        {user?.type === 'admin' && (
          <Box sx={{ mr: 2 }}>
            <Button color="inherit" onClick={() => navigate('/admin')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate('/employees')}>
              Employees
            </Button>
            <Button color="inherit" onClick={() => navigate('/add-job')}>
              Add Job
            </Button>
          </Box>
        )}

        {user?.type === 'employee' && (
          <Box sx={{ mr: 2 }}>
            <Button color="inherit" onClick={() => navigate('/jobs')}>
              Jobs
            </Button>
          </Box>
        )}

        <Typography variant="body1" sx={{ mr: 2 }}>
          {user?.name}
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;