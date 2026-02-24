import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';

/**
 * Navigation 컴포넌트
 * 상단 고정 네비게이션 바
 * - Home: 루트 경로로 이동
 * - About Me / Projects: 메인 홈 페이지의 해당 섹션으로 스크롤
 *
 * Props: 없음
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/', sectionId: null },
    { label: 'About Me', path: '/about', sectionId: null },
    { label: 'Projects', path: '/projects', sectionId: null },
  ];

  /** 섹션으로 부드럽게 스크롤 */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /** 네비게이션 클릭 핸들러 */
  const handleNavClick = (item) => {
    if (!item.sectionId) {
      navigate(item.path);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      /** 페이지 이동 후 DOM 렌더링 완료 시점에 스크롤 */
      setTimeout(() => scrollToSection(item.sectionId), 100);
    } else {
      scrollToSection(item.sectionId);
    }
  };

  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname === '/about';
  const isProjectsActive = location.pathname === '/projects';

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            component={Link}
            to='/'
            sx={{
              fontWeight: 700,
              fontSize: '1.4rem',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.5px',
            }}
          >
            Portfolio
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            { navItems.map((item) => {
              const isActive =
                item.label === 'Home' ? isHomeActive :
                item.label === 'About Me' ? isAboutActive :
                item.label === 'Projects' ? isProjectsActive :
                false;

              return (
                <Button
                  key={ item.label }
                  onClick={ () => handleNavClick(item) }
                  sx={{
                    color: isActive
                      ? 'var(--color-primary)'
                      : 'var(--color-text-secondary)',
                    fontWeight: isActive ? 700 : 400,
                    borderBottom: isActive
                      ? '2px solid var(--color-primary)'
                      : '2px solid transparent',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': {
                      color: 'var(--color-primary)',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  { item.label }
                </Button>
              );
            }) }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
