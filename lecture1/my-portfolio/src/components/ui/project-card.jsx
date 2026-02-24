import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/**
 * ProjectCard 컴포넌트
 * 프로젝트 그리드 카드 (1:1 썸네일 + 정보 + 버튼)
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
 * <ProjectCard project={projectData} />
 */
function ProjectCard({ project }) {
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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 썸네일 (1:1 비율) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-secondary)',
          flexShrink: 0,
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
              transition: 'transform 0.35s ease',
              '&:hover': { transform: 'scale(1.05)' },
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
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              미리보기 준비 중
            </Typography>
          </Box>
        ) }
      </Box>

      {/* 카드 본문 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: { xs: 2.5, md: 3 },
          gap: 1.5,
        }}
      >
        {/* 제목 */}
        <Typography
          variant='h3'
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
          }}
        >
          { title }
        </Typography>

        {/* 설명 */}
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          { description }
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          { tech_stack.map((tech) => (
            <Chip
              key={ tech }
              label={ tech }
              size='small'
              sx={{
                fontSize: '0.7rem',
                height: 24,
                backgroundColor: 'rgba(240,78,35,0.08)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(240,78,35,0.2)',
                fontWeight: 600,
              }}
            />
          )) }
        </Box>

        {/* 작업기간 / 기여도 */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          { work_period && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                기간
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                { work_period }
              </Typography>
            </Box>
          ) }
          { contribution && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                기여도
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                { contribution }
              </Typography>
            </Box>
          ) }
        </Box>

        {/* 버튼 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', pt: 0.5 }}>
          { detail_url && (
            <Button
              component='a'
              href={ detail_url }
              target='_blank'
              rel='noopener noreferrer'
              variant='contained'
              size='small'
              sx={{
                flex: 1,
                backgroundColor: 'var(--color-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                py: 0.9,
                minHeight: 44,
                '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
              }}
            >
              View Details
            </Button>
          ) }
          { detail_url && (
            <Tooltip title='Live Demo'>
              <IconButton
                component='a'
                href={ detail_url }
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 1.5,
                  minWidth: 44,
                  minHeight: 44,
                  color: 'var(--color-text-secondary)',
                  '&:hover': { color: 'var(--color-primary)', borderColor: 'var(--color-primary)' },
                }}
              >
                <LaunchIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          ) }
          { github_url && (
            <Tooltip title='GitHub'>
              <IconButton
                component='a'
                href={ github_url }
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 1.5,
                  minWidth: 44,
                  minHeight: 44,
                  color: 'var(--color-text-secondary)',
                  '&:hover': { color: 'var(--color-text-primary)', borderColor: 'var(--color-text-primary)' },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectCard;
