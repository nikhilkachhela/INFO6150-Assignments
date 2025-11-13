import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import api from '../api/axios.js'

export default function Companies() {
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        // Uses Assignment 8: users with imagePath uploaded via /user/uploadImage
        const res = await api.get('/user/getAll')
        const withImages = (res.data.users || [])
          .filter(u => u.imagePath) // needs your A8 to include imagePath in getAll
          .map(u => ({ src: u.imagePath, name: u.fullName }))
        setImages(withImages)
        if (withImages.length === 0) setError('No company images found. Upload images in A8 using /user/uploadImage.')
      } catch (e) {
        setError('Failed to fetch images. Ensure A8 server runs at VITE_API_BASE_URL.')
      }
    }
    load()
  }, [])

  return (
    <>
      <Typography variant="h5" gutterBottom>Company Showcase</Typography>
      {error && <Alert severity="info" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={2}>
        {images.map((img, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card>
              <CardMedia component="img" height="160" image={img.src} alt={img.name || 'Company'} />
              <CardContent>
                <Typography>{img.name || 'Company'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
