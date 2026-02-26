import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/common/footer';
import Navigation from './components/common/navigation';
import ScrollToTop from './components/ui/scroll-to-top';
import { PortfolioProvider } from './context/PortfolioContext';
import { useThemeMode } from './context/ThemeContext';
import AboutPage from './pages/about-page';
import AdminPage from './pages/admin-page';
import HomePage from './pages/home-page';
import ProjectsPage from './pages/projects-page';
import { darkTheme, lightTheme } from './theme';

function AppContent() {
  const { isDark } = useThemeMode();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/admin' element={<AdminPage />} />
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
