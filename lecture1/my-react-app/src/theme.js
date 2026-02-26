import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: '"Pretendard GOV", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.125rem',
    fontWeight: 500,
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#818cf8' },
    secondary: { main: '#c084fc' },
    background: {
      default: '#0a0e1a',
      paper: '#111827',
    },
  },
  typography: baseTypography,
  spacing: 8,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6366f1' },
    secondary: { main: '#a855f7' },
    background: {
      default: '#f1f5fd',
      paper: '#ffffff',
    },
  },
  typography: baseTypography,
  spacing: 8,
});

export default darkTheme;
