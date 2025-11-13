import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link, useNavigate } from 'react-router-dom'

const LinkBtn = ({to, children}) => (
  <Button color="inherit" component={Link} to={to} sx={{ textTransform: 'none' }}>
    {children}
  </Button>
)

export default function NavBar() {
  const navigate = useNavigate()
  const isAuthed = Boolean(localStorage.getItem('sessionEmail'))

  const logout = () => {
    localStorage.removeItem('sessionEmail')
    localStorage.removeItem('sessionToken')
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Job Portal
          </Typography>
          <Stack direction="row" spacing={1}>
            <LinkBtn to="/">Home</LinkBtn>
            <LinkBtn to="/about">About</LinkBtn>
            <LinkBtn to="/jobs">Job Listings</LinkBtn>
            <LinkBtn to="/companies">Companies</LinkBtn>
            <LinkBtn to="/contact">Contact</LinkBtn>
            {!isAuthed ? (
              <Button color="secondary" variant="contained" onClick={() => navigate('/login')}>
                Login
              </Button>
            ) : (
              <Button color="secondary" variant="contained" onClick={logout}>
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
