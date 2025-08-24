import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import { Container, Grid, CircularProgress, Box, Typography, Stack } from '@mui/material';
import ProductCard from '../Card/ProductCard'; // Verifique se este caminho está correto

// Lembre-se de importar o seu logo
import logo from '../../assets/logoCaverna.png';

function ProductGrid() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1d8rmopO33GX8nV_Gwrc7FYUwBqORcSoszkY35TVl7as/export?format=csv';

    useEffect(() => {
        setLoading(true);
        Papa.parse(GOOGLE_SHEET_URL, {
            download: true,
            header: true,
            complete: (results) => {
                const allProducts = results.data.filter(p => p.name && p.name.trim() !== '');

                if (categoryName) {
                    const filteredProducts = allProducts.filter(
                        product => product.category.toLowerCase() === categoryName.toLowerCase()
                    );
                    setProducts(filteredProducts);
                } else {
                    const shuffled = [...allProducts];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    const randomProducts = shuffled.slice(0, 10);
                    setProducts(randomProducts);
                }
                setLoading(false);
            },
        });
    }, [categoryName]);

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">

                {/* Bloco 1: O Cabeçalho da Página (Logo e Título) */}
                <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
                    <img
                        src={logo} // Usando a variável do logo importado
                        alt="Logo Caverna do Pump"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                    <Typography variant="h4" component="h2" fontWeight="bold" sx={{
                        background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.warning.light} 90%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {categoryName || 'Destaques'}
                    </Typography>
                </Stack> {/* Fim do Cabeçalho da Página */}

                {/* Bloco 2: A Grade de Produtos (ou o ícone de carregando) */}
                {/* Esta parte fica FORA do Stack do cabeçalho */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : (
                    <Grid container spacing={4} alignItems="stretch">
                        {products.map((product, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default ProductGrid;