import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './components/common/navigation';
import { PortfolioProvider } from './context/PortfolioContext';
import AboutPage from './pages/about-page';
import HomePage from './pages/home-page';
import ProjectsPage from './pages/projects-page';
import theme from './theme';

function App() {
  return (
    <PortfolioProvider>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Router basename='/my-first-website'>
          <Navigation />
          {/* 네비게이션 높이만큼 상단 여백 확보 */}
          <main style={{ paddingTop: '64px' }}>
            <Routes>
              <Route path='/' element={ <HomePage /> } />
              <Route path='/about' element={ <AboutPage /> } />
              <Route path='/projects' element={ <ProjectsPage /> } />
            </Routes>
          </main>
        </Router>
      </ThemeProvider>
    </PortfolioProvider>
  );
}

export default App;
