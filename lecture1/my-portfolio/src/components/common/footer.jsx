import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

/**
 * Footer 컴포넌트
 * 간단한 하단 푸터 — 로고 + 카피라이트 + 소셜 링크
 *
 * Props: 없음
 *
 * Example usage:
 * <Footer />
 */
function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        backgroundColor: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          {/* 로고 */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
            }}
          >
            Cotal<Box component='span' sx={{ color: 'var(--color-primary)' }}>.</Box>
          </Typography>

          {/* 카피라이트 */}
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.04em',
            }}
          >
            © 2026 이효진. All rights reserved.
          </Typography>

          {/* 소셜 링크 */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              component='a'
              href='https://github.com/cotalman'
              target='_blank'
              rel='noopener noreferrer'
              size='small'
              sx={{
                color: 'rgba(255,255,255,0.3)',
                '&:hover': { color: '#FFFFFF' },
              }}
              aria-label='GitHub'
            >
              <GitHubIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>

            <IconButton
              component='a'
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              size='small'
              sx={{
                color: 'rgba(255,255,255,0.3)',
                '&:hover': { color: '#0A66C2' },
              }}
              aria-label='LinkedIn'
            >
              <LinkedInIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
