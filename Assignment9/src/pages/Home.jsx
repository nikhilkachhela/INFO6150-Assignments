import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Job Portal</Typography>
      <Typography>
        Explore jobs, learn about companies, and apply directly. Use the navigation above.
        Login with your Assignment 8 credentials to access the Company Showcase page.
      </Typography>
      <Box sx={{ mt: 2, fontSize: 14, opacity: 0.8 }}>
        Version: Assignment 9 (React + Material UI + Axios + Routing)
      </Box>
    </Paper>
  )
}
