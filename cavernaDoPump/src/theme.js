import { createTheme } from '@mui/material/styles';

// Suas cores da paleta "Caverna do Pump"
const pumpPalette = {
  laranjaQueimado: '#E56E44',
  marromEscuro: '#3D3531',
  cinzaPedra: '#8C8279',
  begeClaro: '#E4DCD3',
  cinzaChumbo: '#586064',
};

// Crie e exporte o tema
const theme = createTheme({
  palette: {
    // Mapeando suas cores para as chaves do tema do MUI
    primary: {
      main: pumpPalette.laranjaQueimado, // Cor principal para botões, links, etc.
      contrastText: '#fff', // Cor do texto sobre a cor primária
    },
    secondary: {
      main: pumpPalette.marromEscuro, // Cor secundária para outros elementos
      contrastText: '#fff',
    },
    background: {
      default: pumpPalette.begeClaro, // Cor de fundo principal do site
      paper: '#ffffff', // Cor de fundo de "superfícies" como Cards, Menus
    },
    text: {
      primary: pumpPalette.marromEscuro, // Cor de texto principal
      secondary: pumpPalette.cinzaChumbo, // Cor de texto secundário
    },
    // Você também pode adicionar cores personalizadas para usar depois
    custom: {
      cinzaPedra: pumpPalette.cinzaPedra,
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: pumpPalette.marromEscuro,
      fontWeight: 700,
    },
    // Você pode customizar outras variantes de tipografia aqui
  },
  components: {
    // Exemplo de como customizar um componente globalmente
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default theme;