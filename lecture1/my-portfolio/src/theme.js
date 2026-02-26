import { createTheme } from '@mui/material/styles';

const baseOptions = {
  typography: {
    fontFamily: [
      'Voces',
      '"Pretendard GOV"',
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
};

/** 라이트 테마 (기본) */
export const lightTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'light',
    primary: { main: '#ff0000', light: '#ff4444', dark: '#cc0000', contrastText: '#FFFFFF' },
    secondary: { main: '#1A1A1A', light: '#555555', dark: '#000000', contrastText: '#FFFFFF' },
    background: { default: '#FFFFFF', paper: '#F5F5F5' },
    text: { primary: '#1A1A1A', secondary: '#555555', disabled: '#999999' },
    divider: '#E0E0E0',
  },
});

/** 다크 테마 */
export const darkTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#ff3333', light: '#ff6666', dark: '#cc0000', contrastText: '#FFFFFF' },
    secondary: { main: '#f0f0f0', light: '#ffffff', dark: '#a0a0a0', contrastText: '#111111' },
    background: { default: '#111111', paper: '#1a1a1a' },
    text: { primary: '#f0f0f0', secondary: '#a0a0a0', disabled: '#666666' },
    divider: '#2a2a2a',
  },
});

export default lightTheme;
