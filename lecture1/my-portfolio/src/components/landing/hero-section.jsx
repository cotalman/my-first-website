import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * HeroSection 컴포넌트
 * 메인 비주얼, 이름, 간단 소개 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: '60vh', md: '70vh' },
        backgroundColor: 'var(--color-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Box sx={{ textAlign: 'center', color: '#FFFFFF', maxWidth: 700 }}>
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            fontWeight: 600,
            color: 'var(--color-primary-light)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          Hero Section
        </Typography>
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 3,
          }}
        >
          여기는 Hero 섹션입니다.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroSection;
