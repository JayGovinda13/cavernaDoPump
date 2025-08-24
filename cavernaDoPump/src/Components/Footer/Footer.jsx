import React from 'react';
import { Box, Container, Typography, Stack, IconButton, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X'; // O novo ícone do Twitter

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'secondary.main', // Usa a cor secundária (marrom escuro) do seu tema
        color: 'white',
        py: 4, // Padding vertical
        mt: 'auto' // Margem no topo automática para empurrar o rodapé para baixo
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center">
          
          <Typography variant="h6" component="div" fontWeight="bold">
            Caverna do Pump
          </Typography>

          <Typography variant="body2" sx={{ maxWidth: 'sm' }}>
            Forjando corpos e mentes com a intensidade que você precisa. Suplementos, acessórios e a verdadeira essência do treino.
          </Typography>

          {/* Ícones de Redes Sociais */}
          <Stack direction="row" spacing={1}>
            <IconButton 
              component={Link} 
              href="https://instagram.com" // Coloque o link do seu Instagram aqui
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton 
              component={Link} 
              href="https://facebook.com" // Coloque o link do seu Facebook aqui
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton 
              component={Link} 
              href="https://x.com" // Coloque o link do seu X/Twitter aqui
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit"
              aria-label="X/Twitter"
            >
              <XIcon />
            </IconButton>
          </Stack>

          {/* Copyright com Ano Dinâmico */}
          <Typography variant="caption">
            &copy; {new Date().getFullYear()} Caverna do Pump. Todos os direitos reservados.
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;