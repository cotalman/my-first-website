import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Footer from './components/common/footer';
import Navigation from './components/common/navigation';
import ProtectedAdminRoute from './components/common/protected-admin-route';
import ScrollToTop from './components/ui/scroll-to-top';
import { PortfolioProvider } from './context/PortfolioContext';
import { useThemeMode } from './context/ThemeContext';
import AboutPage from './pages/about-page';
import AdminPage from './pages/admin-page';
import HomePage from './pages/home-page';
import ProjectsPage from './pages/projects-page';
import { darkTheme, lightTheme } from './theme';

/** 라우트 변경 시 페이지 최상단으로 스크롤 (scrollTo state가 있으면 스킵) */
function ScrollToTopOnNavigate() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);
  return null;
}

function AppContent() {
  const { isDark } = useThemeMode();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTopOnNavigate />
        <Navigation />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/admin' element={<ProtectedAdminRoute><AdminPage /></ProtectedAdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
