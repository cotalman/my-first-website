import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ProjectCardFeatured from '../components/ui/project-card-featured';
import ProjectCard from '../components/ui/project-card';
import { supabase } from '../utils/supabase-client';

/**
 * ProjectsPage 컴포넌트
 * 포트폴리오 프로젝트 전체 목록 페이지
 * - 상단: Featured 프로젝트 (is_featured = true)
 * - 하단: 나머지 프로젝트 3열 그리드
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!error) setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const featuredProject = projects.find((p) => p.is_featured);
  const gridProjects = projects.filter((p) => !p.is_featured);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth='lg'>

        {/* 페이지 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
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
            variant='h1'
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            작업한 프로젝트들
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            기획부터 배포까지 직접 구현한 프로젝트들입니다. 각 프로젝트를 통해 쌓은 경험과 기술을 확인해보세요.
          </Typography>
        </Box>

        {/* 로딩 상태 */}
        { loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'var(--color-primary)' }} />
          </Box>
        ) }

        { !loading && projects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
              등록된 프로젝트가 없습니다.
            </Typography>
          </Box>
        ) }

        { !loading && projects.length > 0 && (
          <>
            {/* Featured 프로젝트 */}
            { featuredProject && (
              <Box sx={{ mb: { xs: 6, md: 8 } }}>
                <ProjectCardFeatured project={ featuredProject } />
              </Box>
            ) }

            {/* 나머지 프로젝트 그리드 */}
            { gridProjects.length > 0 && (
              <>
                { featuredProject && (
                  <Typography
                    sx={{
                      fontSize: { xs: '0.8rem', md: '0.85rem' },
                      fontWeight: 600,
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      mb: 3,
                    }}
                  >
                    More Projects
                  </Typography>
                ) }
                <Grid container spacing={ 3 }>
                  { gridProjects.map((project) => (
                    <Grid key={ project.id } size={{ xs: 12, sm: 6, md: 4 }}>
                      <ProjectCard project={ project } />
                    </Grid>
                  )) }
                </Grid>
              </>
            ) }
          </>
        ) }

      </Container>
    </Box>
  );
}

export default ProjectsPage;
