import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Alert,
  Chip,
  Pagination,
} from '@mui/material';
import { getAllJobs } from '../redux/slices/jobSlice';

const JobsPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { jobs, pagination, isLoading, isError, message } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(getAllJobs({ page, limit: 10 }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {jobs.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No jobs available at the moment
        </Alert>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {jobs.map((job) => (
              <Grid item xs={12} md={6} key={job._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {job.jobTitle}
                    </Typography>
                    <Chip
                      label={job.companyName}
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {job.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" color="primary">
                        ${job.salary.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {pagination && pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}

          {pagination && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              Showing {jobs.length} of {pagination.totalJobs} jobs
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default JobsPage;