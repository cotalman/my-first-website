import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2DD4BF',
      light: '#67E8F9',
      dark: '#0D9488',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#84CC16',
      light: '#BEF264',
      dark: '#4D7C0F',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F0FDFC',
      paper: '#ffffff',
    },
    text: {
      primary: '#134E4A',
      secondary: '#4B7472',
    },
    grey: {
      50: '#F8FFFE',
      100: '#F0FDFC',
      200: '#CCFBF1',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h6: { fontSize: '1.125rem', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(45, 212, 191, 0.08)',
          border: '1px solid #CCFBF1',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
