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
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useThemeContext } from '../../contexts/theme-context';

const MENU_ITEMS = [
  { label: '홈', sectionId: 'top' },
  { label: '소개', sectionId: 'about' },
  { label: '프로젝트', sectionId: 'projects' },
  { label: '연락처', sectionId: 'contact' },
];

/**
 * NavigationSection 컴포넌트
 * MUI AppBar 기반 반응형 네비게이션 바
 * 데스크톱: 가로 메뉴 버튼 + 다크모드 토글 / 모바일: 햄버거 메뉴 + Drawer
 *
 * Props: 없음
 *
 * Example usage:
 * <NavigationSection />
 */
function NavigationSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useThemeContext();

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
            ? 'var(--nav-bg-scrolled)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--nav-border)' : 'none',
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
            sx={{ flexGrow: 1, fontWeight: 600, color: 'var(--text-100)' }}
          >
            My App
          </Typography>

          {/* 데스크톱 메뉴 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {MENU_ITEMS.map(({ label, sectionId }) => (
              <Button
                key={sectionId}
                onClick={() => handleMenuClick(sectionId)}
                sx={{
                  textTransform: 'none',
                  color: 'var(--text-65)',
                  fontWeight: 500,
                  '&:hover': { color: 'var(--text-100)', background: 'var(--surface-hover)' },
                }}
              >
                {label}
              </Button>
            ))}

            {/* 다크모드 토글 버튼 */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
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
          {/* 모바일 Drawer 내 토글 버튼 */}
          <Box sx={{ px: 2, pb: 2 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

/**
 * ThemeToggle 컴포넌트
 * 해/달 아이콘이 슬라이딩되는 pill 형태의 다크모드 토글 스위치
 *
 * Props:
 * @param {boolean} isDark - 현재 다크 모드 여부 [Required]
 * @param {function} onToggle - 토글 클릭 핸들러 [Required]
 *
 * Example usage:
 * <ThemeToggle isDark={true} onToggle={handleToggle} />
 */
function ThemeToggle({ isDark, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      role="button"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      sx={{
        ml: 1.5,
        width: 56,
        height: 28,
        borderRadius: '14px',
        background: isDark
          ? 'rgba(99, 102, 241, 0.18)'
          : 'rgba(251, 191, 36, 0.18)',
        border: `1px solid ${isDark ? 'rgba(129, 140, 248, 0.38)' : 'rgba(251, 191, 36, 0.50)'}`,
        cursor: 'pointer',
        position: 'relative',
        flexShrink: 0,
        transition: 'background 0.35s ease, border-color 0.35s ease',
        '&:hover': {
          background: isDark
            ? 'rgba(99, 102, 241, 0.28)'
            : 'rgba(251, 191, 36, 0.28)',
        },
      }}
    >
      {/* 슬라이딩 원형 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          left: isDark ? 3 : 29,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, #818cf8, #c084fc)'
            : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease',
          boxShadow: isDark
            ? '0 2px 8px rgba(99, 102, 241, 0.55)'
            : '0 2px 8px rgba(251, 191, 36, 0.55)',
        }}
      >
        {isDark ? (
          <DarkModeRoundedIcon sx={{ fontSize: 12, color: '#fff' }} />
        ) : (
          <WbSunnyRoundedIcon sx={{ fontSize: 12, color: '#fff' }} />
        )}
      </Box>
    </Box>
  );
}

export default NavigationSection;
