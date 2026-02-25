import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

/**
 * ProjectCardFeatured 컴포넌트
 * 상단 강조 Featured 프로젝트 카드 (전체 너비, 좌우 레이아웃)
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 객체 [Required]
 * @param {string} project.title - 프로젝트 제목 [Required]
 * @param {string} project.description - 프로젝트 설명 [Required]
 * @param {string[]} project.tech_stack - 기술 스택 배열 [Required]
 * @param {string} project.detail_url - 배포 사이트 URL [Optional]
 * @param {string} project.thumbnail_url - 썸네일 이미지 URL [Optional]
 * @param {string} project.github_url - GitHub 저장소 URL [Optional]
 * @param {string} project.work_period - 작업 기간 [Optional]
 * @param {string} project.contribution - 기여도 [Optional]
 *
 * Example usage:
 * <ProjectCardFeatured project={featuredProject} />
 */
function ProjectCardFeatured({ project }) {
  const {
    title,
    description,
    tech_stack = [],
    detail_url,
    thumbnail_url,
    github_url,
    work_period,
    contribution,
  } = project;

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.25s ease',
        '&:hover': { boxShadow: '0 12px 48px rgba(0,0,0,0.14)' },
      }}
    >
      <Grid container>
        {/* 좌측: 썸네일 (1:1 비율) */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: { xs: '100%', md: '100%' },
              overflow: 'hidden',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            { thumbnail_url ? (
              <Box
                component='img'
                src={ thumbnail_url }
                alt={ `${title} 썸네일` }
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'scale(1.04)' },
                }}
              />
            ) : (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  미리보기 준비 중
                </Typography>
              </Box>
            ) }
          </Box>
        </Grid>

        {/* 우측: 프로젝트 정보 */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              p: { xs: 3, md: 5 },
              gap: 2.5,
            }}
          >
            {/* Featured 뱃지 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon sx={{ fontSize: '0.95rem', color: 'var(--color-primary)' }} />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Featured Project
              </Typography>
            </Box>

            {/* 제목 */}
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '1.4rem', md: '1.9rem' },
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.25,
              }}
            >
              { title }
            </Typography>

            {/* 설명 */}
            <Typography
              sx={{
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                flex: 1,
              }}
            >
              { description }
            </Typography>

            {/* 기술 스택 뱃지 */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              { tech_stack.map((tech) => (
                <Chip
                  key={ tech }
                  label={ tech }
                  size='small'
                  sx={{
                    fontSize: '0.75rem',
                    height: 28,
                    backgroundColor: 'rgba(240,78,35,0.08)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(240,78,35,0.2)',
                    fontWeight: 600,
                  }}
                />
              )) }
            </Box>

            {/* 작업기간 */}
            { work_period && (
              <Box
                sx={{
                  py: 2,
                  borderTop: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, mb: 0.25 }}>
                  작업 기간
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  { work_period }
                </Typography>
              </Box>
            ) }

            {/* 버튼 영역 */}
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              { detail_url && (
                <Button
                  component='a'
                  href={ detail_url }
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='contained'
                  size='large'
                  sx={{
                    backgroundColor: 'var(--color-primary)',
                    fontWeight: 700,
                    px: 3,
                    py: 1.2,
                    minHeight: 48,
                    fontSize: '0.9rem',
                    '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
                  }}
                >
                  View Details
                </Button>
              ) }
              { github_url && (
                <Button
                  component='a'
                  href={ github_url }
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='outlined'
                  size='large'
                  startIcon={ <GitHubIcon /> }
                  sx={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.2,
                    minHeight: 48,
                    fontSize: '0.9rem',
                    '&:hover': {
                      borderColor: 'var(--color-text-primary)',
                      color: 'var(--color-text-primary)',
                      backgroundColor: 'rgba(0,0,0,0.03)',
                    },
                  }}
                >
                  GitHub
                </Button>
              ) }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectCardFeatured;
