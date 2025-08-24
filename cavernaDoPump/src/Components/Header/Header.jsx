import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // 1. Importe o Link

import logo from '../../assets/logoCaverna.png';

function Header() {
  return (
    <AppBar position="static" color="secondary" sx={{ color: 'white' }}>
      <Toolbar>
        {/* Logo e Título com link para a Home */}
        <Box sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" sx={{ color: 'white', textTransform: 'none', padding: 0 }}>
            <img 
              src={logo}
              alt="Logo Caverna do Pump" 
              style={{ 
                height: '40px',
                marginRight: '16px',
                borderRadius: '50%'
              }}
            />
            <Typography variant="h6" component="div">
              Caverna do Pump
            </Typography>
          </Button>
        </Box>

        {/* 2. Transforme os botões em Links de Categoria */}
        <Button color="inherit" component={Link} to="/categoria/Acessórios">
          Acessórios
        </Button>
        <Button color="inherit" component={Link} to="/categoria/Suplementos">
          Suplementos
        </Button>
        <Button color="inherit" component={Link} to="/categoria/Dr. Peanut">
          Dr. Peanut
        </Button>
        <Button color="inherit" component={Link} to="/categoria/Laricas">
          Laricas
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;