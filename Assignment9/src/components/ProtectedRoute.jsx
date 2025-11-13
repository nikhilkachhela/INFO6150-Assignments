import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const email = localStorage.getItem('sessionEmail')
  const location = useLocation()
  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
