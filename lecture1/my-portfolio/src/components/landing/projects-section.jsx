import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

/**
 * ProjectsSection 컴포넌트
 * 대표작 썸네일 목록과 더 보기 버튼 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const placeholderProjects = [1, 2, 3];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Projects Section
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
            여기는 Projects 섹션입니다.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
            }}
          >
            대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          { placeholderProjects.map((num) => (
            <Grid key={ num } size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  height: 200,
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Project { num } 썸네일
                </Typography>
              </Paper>
            </Grid>
          )) }
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to='/projects'
            variant='outlined'
            size='large'
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              '&:hover': {
                borderColor: 'var(--color-primary-dark)',
                backgroundColor: 'rgba(240, 78, 35, 0.04)',
              },
              px: 4,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            더 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
