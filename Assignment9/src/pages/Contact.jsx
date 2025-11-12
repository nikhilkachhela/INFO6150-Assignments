import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function Contact() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Contact</Typography>
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <TextField label="Your Name" fullWidth />
        <TextField label="Email" type="email" fullWidth />
        <TextField label="Message" multiline rows={4} fullWidth />
        <Button variant="contained">Send</Button>
      </Stack>
    </Paper>
  )
}
