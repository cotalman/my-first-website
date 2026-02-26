import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

const MENU_ITEMS = [
  { label: '홈', sectionId: 'top' },
  { label: '소개', sectionId: 'about' },
  { label: '프로젝트', sectionId: 'projects' },
  { label: '연락처', sectionId: 'contact' },
];

/**
 * NavigationSection 컴포넌트
 * MUI AppBar 기반 반응형 네비게이션 바
 * 데스크톱: 가로 메뉴 버튼 / 모바일: 햄버거 메뉴 + Drawer
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationSection />
 */
function NavigationSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 위치에 따라 배경 전환
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (sectionId) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(`#${sectionId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isScrolled
            ? 'rgba(13, 17, 31, 0.92)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          boxShadow: 'none',
          transition: 'background 0.35s ease, backdrop-filter 0.35s ease, border-bottom 0.35s ease',
        }}
      >
        <Toolbar>
          {/* 모바일 햄버거 메뉴 */}
          <IconButton
            color="inherit"
            aria-label="메뉴 열기"
            edge="start"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* 로고 */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            My App
          </Typography>

          {/* 데스크톱 메뉴 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {MENU_ITEMS.map(({ label, sectionId }) => (
              <Button
                key={sectionId}
                color="inherit"
                onClick={() => handleMenuClick(sectionId)}
                sx={{ textTransform: 'none' }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 모바일 Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {MENU_ITEMS.map(({ label, sectionId }) => (
              <ListItem key={sectionId} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(sectionId)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default NavigationSection;
