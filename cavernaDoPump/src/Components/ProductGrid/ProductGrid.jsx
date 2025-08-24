import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, CircularProgress, Box, Typography } from '@mui/material';
import ProductCard from '../Card/ProductCard';
import CategoryHeader from '../CategoryHeader/CategoryHeader';
import { useProducts } from '../../hooks/useProducts';

// Componente para o produto em destaque, já com a sintaxe correta do Grid v2
const FeaturedProduct = ({ product }) => (
  <Grid xs={12} sx={{ display: { xs: 'none', md: 'block' } }}>
    <ProductCard product={product} featured={true} />
  </Grid>
);

function ProductGrid() {
  const { categoryName } = useParams();
  const { products, loading, error, pageInfo } = useProducts(categoryName);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
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

  const featuredProduct = products.length > 0 ? products[0] : null;
  const otherProducts = products.length > 1 ? products.slice(1) : [];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <CategoryHeader title={pageInfo.title} description={pageInfo.description} />
        <Grid container spacing={4} alignItems="stretch">
          {featuredProduct && <FeaturedProduct product={featuredProduct} />}
          {otherProducts.map((product) => (
            <Grid key={product.id || product.name} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductGrid;