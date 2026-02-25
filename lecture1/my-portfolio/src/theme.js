import { createTheme } from '@mui/material/styles';

/**
 * Welstory 컬러 팔레트 기반 MUI 테마
 * 출처: docs/컬러 팔레트 디자인 시스템.md
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#E83820',
      light: '#FF6145',
      dark: '#C42D17',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A1A',
      light: '#555555',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#555555',
      disabled: '#999999',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: [
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
});

export default theme;
