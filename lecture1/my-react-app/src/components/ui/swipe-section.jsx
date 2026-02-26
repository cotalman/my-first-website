import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SLIDES = [
  { id: 1, title: 'React', color: '#61DAFB', bg: '#20232A' },
  { id: 2, title: 'Material UI', color: '#fff', bg: '#1976D2' },
  { id: 3, title: 'Vite', color: '#fff', bg: '#646CFF' },
  { id: 4, title: 'JavaScript', color: '#323330', bg: '#F7DF1E' },
  { id: 5, title: 'Node.js', color: '#fff', bg: '#339933' },
];

/**
 * SwipeSection 컴포넌트
 * react-swipeable 기반 터치/마우스 스와이프 이미지 슬라이더 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <SwipeSection />
 */
function SwipeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

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
        Swipe
      </Typography>

      {/* 슬라이더 */}
      <Box sx={{ position: 'relative' }}>
        <Paper
          {...handlers}
          elevation={2}
          sx={{
            overflow: 'hidden',
            borderRadius: 2,
            userSelect: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.4s ease',
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {SLIDES.map(({ id, title, color, bg }) => (
              <Box
                key={id}
                sx={{
                  minWidth: '100%',
                  height: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: bg,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: color,
                    pointerEvents: 'none',
                  }}
                >
                  {title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* 이전 버튼 */}
        <IconButton
          onClick={goToPrev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* 다음 버튼 */}
        <IconButton
          onClick={goToNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* 인디케이터 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {SLIDES.map(({ id }, index) => (
          <Box
            key={id}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: index === currentIndex ? 'primary.main' : 'action.disabled',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        {currentIndex + 1} / {SLIDES.length} — 좌우로 스와이프하거나 버튼을 클릭하세요
      </Typography>
    </Box>
  );
}

export default SwipeSection;
