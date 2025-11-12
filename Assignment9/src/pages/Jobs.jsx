import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { jobPosts } from '../data/jobPosts.js'

export default function Jobs() {
  return (
    <>
      <Typography variant="h5" gutterBottom>Job Listings</Typography>
      <Grid container spacing={2}>
        {jobPosts.map(job => (
          <Grid item key={job.id} xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography sx={{ mt: 1 }}>{job.description}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>{job.lastUpdated}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={job.applyLink} target="_blank">
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
