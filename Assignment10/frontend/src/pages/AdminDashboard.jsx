import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={() => navigate('/employees')}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">👥 Manage Employees</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              View and manage all employees in the system
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/employees');
              }}
            >
              View Employees
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
              },
            }}
            onClick={() => navigate('/add-job')}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5">💼 Add New Job</Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Create new job postings for employees
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 'auto' }}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/add-job');
              }}
            >
              Add Job
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;