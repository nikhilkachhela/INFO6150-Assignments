import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    try {
      // A8 login (works with/without JWT). If server returns token, we store it.
      const res = await api.post('/user/login', { email, password })
      if (res.data) {
        localStorage.setItem('sessionEmail', email)
        if (res.data.token) localStorage.setItem('sessionToken', res.data.token)
        const to = location.state?.from?.pathname || '/companies'
        navigate(to, { replace: true })
      } else {
        setError('Invalid response from server')
      }
    } catch {
      setError('Login failed. Check credentials & ensure A8 server is running.')
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 420, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required type="email" />
          <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} required type="password" />
          <Button variant="contained" type="submit">Sign In</Button>
        </Stack>
      </form>
    </Paper>
  )
}
