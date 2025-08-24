import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa o hook para ler a URL
import Papa from 'papaparse';
import { Container, Grid, CircularProgress, Box, Typography, Stack } from '@mui/material';
import ProductCard from '../Card/ProductCard';

function ProductGrid() {
    // useParams vai pegar a categoria da URL (ex: "Suplementos")
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

                // Se houver uma categoria na URL, filtra os produtos
                if (categoryName) {
                    const filteredProducts = allProducts.filter(
                        product => product.category.toLowerCase() === categoryName.toLowerCase()
                    );
                    setProducts(filteredProducts);
                } else {
                    // --- NOVA LÓGICA PARA /loja ---
                    // 1. Embaralha a lista de todos os produtos
                    const shuffled = [...allProducts]; // Cria uma cópia para não alterar a original
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Troca os elementos
                    }

                    // 2. Pega apenas os 10 primeiros produtos da lista embaralhada
                    const randomProducts = shuffled.slice(0, 10);

                    setProducts(randomProducts);
                }

                setLoading(false);
            },
        });
    }, [categoryName]); // Este efeito roda sempre que a categoria na URL muda

    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">

                {/* 2. Adicione o Stack para alinhar o logo e o título */}
                <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
                    <img
                        src={'./logoCaverna.png'}
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
                    }}
                    >
                        {categoryName || 'Destaques'}
                    </Typography>


                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <Grid container spacing={4} alignItems="center">
                            {products.map((product, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}

export default ProductGrid;