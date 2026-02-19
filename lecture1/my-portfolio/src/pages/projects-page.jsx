import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 작품 목록 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 12, md: 16 },
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
            Projects
          </Typography>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 4,
            }}
          >
            Projects 페이지
          </Typography>
          <Box
            sx={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 2,
              p: { xs: 4, md: 6 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
              }}
            >
              Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
