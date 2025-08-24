import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, CircularProgress, Box, Typography, Paper } from '@mui/material';
import ProductCard from '../Card/ProductCard';
import { useProducts } from '../../hooks/useProducts'; // Importa o hook
import logo from '../../assets/logoCaverna.png';

function ProductGrid() {
  const { categoryName } = useParams();
  const { products, loading, error, pageInfo } = useProducts(categoryName);

  // Lógica para separar o produto em destaque
  const featuredProduct = !loading && !error && products.length > 0 ? products[0] : null;
  const otherProducts = !loading && !error && products.length > 1 ? products.slice(1) : [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 6, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
          <Grid container spacing={4} alignItems="center">
            {/* Grid v2: Removido 'item' */}
            <Grid xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <img src={logo} alt="Logo" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}/>
            </Grid>
            {/* Grid v2: Removido 'item' */}
            <Grid xs={12} md={9}>
              <Typography variant="h3" component="h1" fontWeight="bold" sx={{ background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.warning.light} 90%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {pageInfo.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {pageInfo.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4} alignItems="stretch">
          {featuredProduct && (
            // Grid v2: Removido 'item'
            <Grid xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Em Destaque</Typography>
              <ProductCard product={featuredProduct} featured={true} />
            </Grid>
          )}

          {otherProducts.map((product, index) => (
            // Grid v2: Removido 'item'
            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductGrid;