import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

/**
 * AboutSection 컴포넌트
 * 간단한 자기소개와 더 알아보기 버튼 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='md'>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            About Me Section
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 3,
            }}
          >
            여기는 About Me 섹션입니다.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
          </Typography>
          <Button
            component={Link}
            to='/about'
            variant='contained'
            size='large'
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
              px: 4,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            더 알아보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
