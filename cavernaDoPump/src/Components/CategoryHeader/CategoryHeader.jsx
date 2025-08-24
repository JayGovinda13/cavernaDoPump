import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import logo from '../../assets/logoCaverna.png';

function CategoryHeader({ title, description }) {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 6, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
      <Grid container spacing={4} alignItems="center">
        <Grid xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <img src={logo} alt="Logo" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        </Grid>
        <Grid xs={12} md={9}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.warning.light} 90%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CategoryHeader;