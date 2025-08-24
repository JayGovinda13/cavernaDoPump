import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box, Chip } from '@mui/material';

function ProductCard({ product }) {
  if (!product || !product.name) {
    return null;
  }

  const getCategoryStyle = (category) => {
    // ... (sua lógica de estilo de categoria continua a mesma)
    switch (category?.toLowerCase()) {
      case 'suplementos':
        return { backgroundColor: 'primary.main', color: 'white' };
      case 'acessórios':
        return { backgroundColor: 'secondary.main', color: 'white' };
      case 'dr. peanut':
        return { backgroundColor: '#A67B5B', color: 'white' };
      case 'laricas':
        return { backgroundColor: 'success.main', color: 'white' };
      default:
        return { backgroundColor: 'grey.500', color: 'white' };
    }
  };

  const categoryStyle = getCategoryStyle(product.category);

  return (
    <RouterLink to={product.productUrl || '#'} style={{ textDecoration: 'none', height: '100%' }}>
      <Card 
        sx={{ 
          // A MUDANÇA PRINCIPAL ESTÁ AQUI:
          height: '100%', // <--- Garante que o card ocupe toda a altura disponível
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6,
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={product.imageUrl}
            alt={product.name}
            sx={{ objectFit: 'cover' }}
          />
          {product.category && (
            <Chip
              label={product.category}
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                backgroundColor: categoryStyle.backgroundColor,
                color: categoryStyle.color,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                height: '22px',
                boxShadow: 3,
              }}
            />
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" fontWeight="bold" color="text.primary">
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.primary" fontWeight="bold">
            {product.price}
          </Typography>
        </CardContent>
        
        <CardActions sx={{ px: 2, pb: 2, mt: 'auto' }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            component="div" 
            sx={{ pointerEvents: 'none' }}
          >
            Ver Detalhes
          </Button>
        </CardActions>
      </Card>
    </RouterLink>
  );
}

// Seus PropTypes continuam os mesmos
ProductCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    productUrl: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductCard;