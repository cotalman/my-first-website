import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';

/**
 * ScrollToTop 컴포넌트
 * 스크롤 300px 이상 시 우하단에 Top 버튼 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollToTop />
 */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 24, md: 32 },
        right: { xs: 20, md: 32 },
        zIndex: 1200,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Fab
        onClick={ handleClick }
        size='small'
        aria-label='맨 위로 이동'
        sx={{
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          boxShadow: '0 4px 16px rgba(232,56,32,0.4)',
          '&:hover': {
            backgroundColor: 'var(--color-primary-dark)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(232,56,32,0.5)',
          },
          transition: 'background-color 0.2s, transform 0.2s, box-shadow 0.2s',
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  );
}

export default ScrollToTop;
