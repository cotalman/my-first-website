import { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SCROLL_ITEMS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `아이템 ${i + 1}`,
  content: `이것은 스크롤 영역 안의 ${i + 1}번째 콘텐츠입니다. 스크롤하여 더 많은 아이템을 확인하세요.`,
}));

/**
 * ScrollSection 컴포넌트
 * 고정 높이 스크롤 컨테이너와 Top 이동 버튼 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <ScrollSection />
 */
function ScrollSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 100);
    }
  }, []);

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: 'center',
        }}
      >
        Scroll
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Paper
          ref={scrollRef}
          variant="outlined"
          onScroll={handleScroll}
          sx={{
            height: 300,
            overflowY: 'auto',
            p: 2,
          }}
        >
          {SCROLL_ITEMS.map(({ id, title, content }) => (
            <Box
              key={id}
              sx={{
                py: 1.5,
                px: 2,
                mb: 1,
                borderRadius: 1,
                bgcolor: 'action.hover',
              }}
            >
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {content}
              </Typography>
            </Box>
          ))}
        </Paper>
        <Fade in={isScrolled}>
          <Fab
            size="small"
            color="primary"
            aria-label="맨 위로 이동"
            onClick={handleScrollToTop}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Fade>
      </Box>
    </Box>
  );
}

export default ScrollSection;
