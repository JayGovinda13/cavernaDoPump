import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Box, Chip } from '@mui/material';

function ProductCard({ product, featured = false }) { // Adicionamos a prop 'featured'
    if (!product || !product.name) {
        return null;
    }

    // Lógica para estilizar o selo da categoria
    const getCategoryStyle = (category) => {
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
        <RouterLink
            to={product.productUrl || '#'}
            style={{
                textDecoration: 'none',
                display: 'block' // <-- ADICIONE ISSO
            }}
        >
            <Card
                sx={{
                    height: '100%', // Isso já estava correto
                    display: 'flex',
                    flexDirection: 'column',
                    // ... resto do sx
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        // Altura diferente se o card for "featured"
                        height={featured ? "300" : "220"}
                        image={product.imageUrl}
                        alt={product.name}
                        sx={{ objectFit: 'cover' }}
                    />
                    {/* 4. Selo da Categoria */}
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

// PropTypes para garantir a qualidade dos dados
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.any,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string,
        productUrl: PropTypes.string,
        category: PropTypes.string,
    }).isRequired,
    featured: PropTypes.bool,
};

export default ProductCard;