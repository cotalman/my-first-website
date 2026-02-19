import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * ContactSection 컴포넌트
 * 연락처, SNS, 메시지 폼 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-secondary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='md'>
        <Box sx={{ textAlign: 'center' }}>
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
            Contact Section
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 3,
            }}
          >
            여기는 Contact 섹션입니다.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.8,
            }}
          >
            연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactSection;
