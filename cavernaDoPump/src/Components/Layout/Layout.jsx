import React from 'react';
import { Outlet } from 'react-router-dom'; // Importante: Outlet renderiza as rotas filhas
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Este componente serve como o "molde" para as páginas de conteúdo
function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      {/* Este é o container principal para as páginas de conteúdo */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          py: 4, // O espaçamento agora só se aplica aqui
        }}
      >
        {/* O <Outlet/> é onde o React Router irá renderizar o componente da rota atual (ex: ProductGrid) */}
        <Outlet />
      </Box>

   <Footer />
    </Box>
  );
}

export default Layout;