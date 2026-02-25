import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ui/project-card';
import { supabase } from '../../utils/supabase-client';

/**
 * ProjectsSection 컴포넌트
 * 홈 페이지 대표작 섹션 - Supabase에서 상위 3개 프로젝트 조회
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .limit(3);

      if (!error) setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Box
      id='projects'
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg'>
        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
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
            variant='h2'
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 2,
            }}
          >
            대표 프로젝트
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
            }}
          >
            기획하고 개발한 프로젝트입니다.
          </Typography>
        </Box>

        {/* 프로젝트 카드 그리드 */}
        { loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) : (
          <Grid container spacing={ 3 } sx={{ mb: 5, alignItems: 'stretch' }}>
            { projects.map((project) => (
              <Grid key={ project.id } size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectCard project={ project } />
              </Grid>
            )) }
          </Grid>
        ) }

        {/* 더 보기 버튼 */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={ Link }
            to='/projects'
            variant='outlined'
            size='large'
            sx={{
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              minHeight: 48,
              '&:hover': {
                borderColor: 'var(--color-primary-dark)',
                backgroundColor: 'rgba(255,0,0,0.04)',
              },
            }}
          >
            전체 프로젝트 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
