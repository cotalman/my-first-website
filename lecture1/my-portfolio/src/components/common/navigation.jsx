import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

/** 섹션 id로 부드럽게 스크롤 이동 */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/** 홈 페이지 섹션 목록 */
const NAV_ITEMS = [
  { label: 'Home', sectionId: 'hero' },
  { label: 'About', sectionId: 'about' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'Projects', sectionId: 'projects' },
  { label: 'Contact', sectionId: 'contact' },
];

/**
 * Navigation 컴포넌트
 * 스크롤 반응형 네비게이션 바
 *
 * Props: 없음
 *
 * Features:
 * - 스크롤 다운 시 숨김 / 업 시 표시 (CSS transform)
 * - 상단 읽기 진행률 바
 * - 섹션 스무스 스크롤 + Intersection Observer 활성 감지
 * - 모바일 햄버거 버튼 + 우측 Drawer 메뉴
 *
 * Example usage:
 * <Navigation />
 */
function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:767px)');

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);

  /** 스크롤 방향 감지 + 읽기 진행률 계산 */
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
      setIsScrolled(scrollY > 20);

      if (scrollY > 100) {
        if (scrollY > lastScrollY.current + 5) {
          setIsVisible(false);
        } else if (scrollY < lastScrollY.current - 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** Intersection Observer: 현재 화면에 보이는 섹션 감지 */
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observers = NAV_ITEMS.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { threshold: 0.35, rootMargin: '-64px 0px 0px 0px' }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [location.pathname]);

  /** 네비게이션 클릭: 홈이면 스크롤, 아니면 navigate 후 스크롤 */
  const handleNavClick = (sectionId) => {
    setDrawerOpen(false);
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 150);
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, backdrop-filter 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(8, 8, 8, 0.88)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          boxShadow: 'none',
        }}
      >
        {/* 읽기 진행률 바 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2px',
            width: `${progress}%`,
            backgroundColor: 'var(--color-primary)',
            transition: 'width 0.1s linear',
            zIndex: 1,
          }}
        />

        <Container maxWidth='lg'>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 64 }}>

            {/* 로고 */}
            <Typography
              component={Link}
              to='/'
              onClick={ () => handleNavClick('hero') }
              sx={{
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              Cotal<Box component='span' sx={{ color: 'var(--color-primary)' }}>.</Box>
            </Typography>

            {/* 데스크톱 메뉴 */}
            { !isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                { NAV_ITEMS.map((item) => {
                  const isActive = isHomePage && activeSection === item.sectionId;
                  return (
                    <Button
                      key={ item.label }
                      onClick={ () => handleNavClick(item.sectionId) }
                      sx={{
                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.875rem',
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        minWidth: 'unset',
                        position: 'relative',
                        transition: 'color 0.2s',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 6,
                          left: '50%',
                          transform: isActive
                            ? 'translateX(-50%) scaleX(1)'
                            : 'translateX(-50%) scaleX(0)',
                          width: '16px',
                          height: '2px',
                          backgroundColor: 'var(--color-primary)',
                          transition: 'transform 0.25s ease',
                          borderRadius: '1px',
                        },
                        '&:hover': {
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          '&::after': { transform: 'translateX(-50%) scaleX(1)' },
                        },
                      }}
                    >
                      { item.label }
                    </Button>
                  );
                }) }
              </Box>
            ) }

            {/* 모바일 햄버거 버튼 */}
            { isMobile && (
              <IconButton
                onClick={ () => setDrawerOpen(true) }
                sx={{ color: '#FFFFFF' }}
                aria-label='메뉴 열기'
              >
                <MenuIcon />
              </IconButton>
            ) }

          </Toolbar>
        </Container>
      </AppBar>

      {/* ── 모바일 사이드 Drawer ── */}
      <Drawer
        anchor='right'
        open={ drawerOpen }
        onClose={ () => setDrawerOpen(false) }
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: '#0E0E0E',
            borderLeft: '1px solid rgba(255,255,255,0.07)',
            pt: 2,
          },
        }}
      >
        {/* Drawer 상단 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2.5,
            mb: 3,
          }}
        >
          <Typography sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>
            Cotal<Box component='span' sx={{ color: 'var(--color-primary)' }}>.</Box>
          </Typography>
          <IconButton
            onClick={ () => setDrawerOpen(false) }
            sx={{ color: 'rgba(255,255,255,0.55)' }}
            aria-label='메뉴 닫기'
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer 메뉴 목록 */}
        <List disablePadding>
          { NAV_ITEMS.map((item, index) => {
            const isActive = isHomePage && activeSection === item.sectionId;
            return (
              <ListItemButton
                key={ item.label }
                onClick={ () => handleNavClick(item.sectionId) }
                sx={{
                  px: 2.5,
                  py: 1.5,
                  opacity: 0,
                  animation: `fadeInRight 0.3s ease ${index * 0.05 + 0.1}s forwards`,
                  '@keyframes fadeInRight': {
                    from: { opacity: 0, transform: 'translateX(16px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                  },
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                }}
              >
                {/* 활성 인디케이터 */}
                <Box
                  sx={{
                    width: 2,
                    height: 18,
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    borderRadius: 1,
                    mr: 2,
                    transition: 'background-color 0.2s',
                    flexShrink: 0,
                  }}
                />
                <ListItemText
                  primary={ item.label }
                  primaryTypographyProps={{
                    sx: {
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.95rem',
                    },
                  }}
                />
              </ListItemButton>
            );
          }) }
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
