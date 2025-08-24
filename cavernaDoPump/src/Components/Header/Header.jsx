import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Ícone do menu hambúrguer

import logo from '../../assets/logoCaverna.png';

function Header() {
  // 1. Estado para controlar se o menu mobile (Drawer) está aberto ou fechado
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 2. Função para abrir/fechar o menu
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // 3. Array com os itens do menu para evitar repetição de código
  const menuItems = [
    { text: 'Acessórios', path: '/categoria/Acessórios' },
    { text: 'Suplementos', path: '/categoria/Suplementos' },
    { text: 'Dr. Peanut', path: '/categoria/Dr. Peanut' },
    { text: 'Laricas', path: '/categoria/Laricas' },
  ];

  // 4. Componente com a lista de links para o menu mobile (Drawer)
  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="secondary" sx={{ color: 'white' }}>
        <Toolbar>
          {/* Logo e Título */}
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/" sx={{ color: 'white', textTransform: 'none', padding: 0 }}>
              <img 
                src={logo}
                alt="Logo Caverna do Pump" 
                style={{ height: '40px', marginRight: '16px', borderRadius: '50%' }}
              />
              <Typography variant="h6" component="div">
                Caverna do Pump
              </Typography>
            </Button>
          </Box>

          {/* 5. Menu para telas grandes (desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
          </Box>

          {/* 6. Ícone do Menu Hambúrguer para telas pequenas (mobile) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 7. Drawer (o menu lateral em si) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
    </>
  );
}

export default Header;