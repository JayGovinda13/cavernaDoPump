// src/pages/LandingPage.jsx

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

// 1. Importe a imagem do seu logo
import logo from '../assets/logoCaverna.png'; 

function LandingPage() {
  return (
    <Box
      sx={{
        // Layout para preencher a tela inteira
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        color: 'white',

        // Imagem de fundo e overlay escuro para contraste
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)', // Deixa o fundo mais escuro
          zIndex: -1,
        },
      }}
    >
      {/* Stack é um container flexbox para organizar elementos verticalmente com espaçamento */}
      <Stack spacing={4} alignItems="center">
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Logo Caverna do Pump"
          sx={{
            width: { xs: 200, sm: 250, md: 300 }, // Tamanho responsivo
            height: 'auto',
            borderRadius: '50%', // Deixa a imagem do logo redonda
            boxShadow: '0px 0px 25px rgba(0,0,0,0.7)',
          }}
        />

        {/* Nome da Loja */}
        <Typography 
          variant="h2" 
          component="h1" 
          fontWeight="bold" 
          sx={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
          }}
        >
          Caverna do Pump
        </Typography>

        {/* Botão de Ação (Call to Action) */}
        <Button
          component={Link}
          to="/loja" // 3. Este link levará para a página de produtos
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            padding: '12px 32px',
            fontWeight: 'bold',
          }}
        >
          Entrar na Caverna
        </Button>
      </Stack>
    </Box>
  );
}

export default LandingPage;