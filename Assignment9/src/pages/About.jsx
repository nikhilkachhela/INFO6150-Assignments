import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

export default function About() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>About</Typography>
      <Typography>
        This portal is built for Assignment 9. It demonstrates routing, session management,
        Material UI components, and Axios integration with a Node.js backend from Assignment 8.
      </Typography>
    </Paper>
  )
}
