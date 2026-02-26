import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import DarkPage from './pages/dark-page.jsx';
import { ThemeContextProvider, useThemeContext } from './contexts/theme-context.jsx';
import { darkTheme, lightTheme } from './theme.js';
import './index.css';

/** ThemeContextProvider 내부에서 isDark를 읽어 MUI 테마를 동적으로 교체 */
function Root() {
  const { isDark } = useThemeContext();
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dark" element={<DarkPage />} />
      </Routes>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <Root />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
