import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation 컴포넌트
 * 상단 고정 네비게이션 바
 *
 * Props: 없음
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Me', path: '/about' },
    { label: 'Projects', path: '/projects' },
  ];

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
            { navItems.map((item) => (
              <Button
                key={ item.path }
                component={Link}
                to={ item.path }
                sx={{
                  color: location.pathname === item.path
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  borderBottom: location.pathname === item.path
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
            )) }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
