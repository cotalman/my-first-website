import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

const PROJECTS = [
  {
    id: 'portfolio',
    number: '01',
    title: '포트폴리오 웹사이트',
    description:
      'React + MUI 기반의 개인 포트폴리오. 타이핑 애니메이션, 페이드인 인터랙션, 반응형 레이아웃으로 구성되어 있습니다.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
    glowColor: 'rgba(99,102,241,0.35)',
    status: '완료',
    statusBg: 'rgba(34,197,94,0.15)',
    statusColor: '#4ade80',
    techs: ['React', 'MUI v7', 'Vite', 'React Router'],
    github: 'https://github.com',
    demo: 'https://github.com',
  },
  {
    id: 'ui-gallery',
    number: '02',
    title: 'UI 컴포넌트 갤러리',
    description:
      '16가지 MUI 컴포넌트를 인터랙티브하게 체험하는 갤러리. 드래그앤드롭, 스와이프, 애니메이션 등 다양한 인터랙션을 구현했습니다.',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)',
    glowColor: 'rgba(124,58,237,0.35)',
    status: '진행중',
    statusBg: 'rgba(245,158,11,0.15)',
    statusColor: '#fbbf24',
    techs: ['React', 'MUI', 'react-swipeable', 'Supabase'],
    github: 'https://github.com',
    demo: 'https://github.com',
  },
  {
    id: 'community',
    number: '03',
    title: '커뮤니티 플랫폼',
    description:
      'Supabase를 백엔드로 활용한 커뮤니티 서비스. 실시간 데이터 연동, 사용자 인증, 게시글 및 댓글 기능을 포함합니다.',
    gradient: 'linear-gradient(135deg, #0891b2 0%, #67e8f9 100%)',
    glowColor: 'rgba(8,145,178,0.35)',
    status: '기획중',
    statusBg: 'rgba(129,140,248,0.15)',
    statusColor: '#818cf8',
    techs: ['React', 'Supabase', 'TypeScript', 'MUI'],
    github: 'https://github.com',
    demo: null,
  },
];

/**
 * ProjectCard 컴포넌트
 * 개별 프로젝트 카드 (그라데이션 헤더 + 상태 배지 + 기술 스택 + 링크 버튼)
 *
 * Props:
 * @param {object} project - 프로젝트 데이터 객체 [Required]
 * @param {string} project.number - 프로젝트 번호 (예: '01') [Required]
 * @param {string} project.title - 프로젝트 이름 [Required]
 * @param {string} project.description - 프로젝트 설명 [Required]
 * @param {string} project.gradient - 헤더 그라데이션 CSS 값 [Required]
 * @param {string} project.glowColor - 호버 glow 색상 [Required]
 * @param {string} project.status - 진행 상태 텍스트 [Required]
 * @param {string} project.statusBg - 상태 배지 배경색 [Required]
 * @param {string} project.statusColor - 상태 배지 텍스트 색상 [Required]
 * @param {string[]} project.techs - 사용 기술 스택 배열 [Required]
 * @param {string} project.github - GitHub 링크 URL [Required]
 * @param {string|null} project.demo - 라이브 데모 링크 (없으면 null) [Optional]
 * @param {number} animationDelay - 페이드인 지연 시간(초) [Optional, 기본값: 0]
 * @param {boolean} isVisible - 섹션 진입 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <ProjectCard project={PROJECTS[0]} animationDelay={0.1} isVisible={true} />
 */
function ProjectCard({ project, animationDelay = 0, isVisible = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const { number, title, description, gradient, glowColor, status, statusBg, statusColor, techs, github, demo } = project;

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: isHovered
          ? `0 24px 64px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.12)`
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.35s ease',
        opacity: isVisible ? 1 : 0,
        marginTop: isVisible ? '0' : '24px',
        transitionDelay: `${animationDelay}s`,
      }}
    >
      {/* 그라데이션 헤더 */}
      <Box
        sx={{
          position: 'relative',
          height: 180,
          background: gradient,
          overflow: 'hidden',
        }}
      >
        {/* 도트 패턴 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* 장식 원형 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        {/* 프로젝트 번호 */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: -10,
            right: 16,
            fontSize: '5.5rem',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.12)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          {number}
        </Typography>
        {/* 폴더 아이콘 */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 44,
            height: 44,
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FolderSpecialIcon sx={{ color: '#fff', fontSize: 24 }} />
        </Box>
        {/* 상태 배지 */}
        <Chip
          label={status}
          size="small"
          sx={{
            position: 'absolute',
            top: 20,
            right: 16,
            background: statusBg,
            color: statusColor,
            fontWeight: 600,
            fontSize: '0.72rem',
            border: `1px solid ${statusColor}40`,
            backdropFilter: 'blur(8px)',
          }}
        />
      </Box>

      {/* 카드 본문 */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: 2,
        }}
      >
        {/* 제목 */}
        <Typography
          component="h3"
          sx={{
            color: '#f8fafc',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>

        {/* 설명 */}
        <Typography
          sx={{
            color: 'rgba(248,250,252,0.5)',
            fontSize: '0.88rem',
            lineHeight: 1.75,
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>

        {/* 기술 스택 태그 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {techs.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                background: 'rgba(129,140,248,0.1)',
                border: '1px solid rgba(129,140,248,0.2)',
                color: 'rgba(248,250,252,0.65)',
                fontSize: '0.72rem',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        {/* 구분선 */}
        <Box
          sx={{
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}
        />

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon />}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: 1,
              py: 0.9,
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.82rem',
              color: 'rgba(248,250,252,0.7)',
              borderColor: 'rgba(255,255,255,0.15)',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#818cf8',
                color: '#c084fc',
                background: 'rgba(99,102,241,0.08)',
              },
            }}
          >
            GitHub
          </Button>
          {demo && (
            <Button
              variant="contained"
              size="small"
              startIcon={<OpenInNewIcon />}
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                flex: 1,
                py: 0.9,
                borderRadius: '8px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.82rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
                },
              }}
            >
              Demo
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}

/**
 * ProjectsSection 컴포넌트
 *
 * 포트폴리오의 Projects 섹션.
 * 프로젝트 카드 목록을 그리드로 표시하며, IntersectionObserver로
 * 뷰포트 진입 시 순차 페이드인 애니메이션이 적용됩니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="projects"
      sx={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, #111827 0%, #0d111f 100%)',
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      {/* 배경 발광 장식 - 중앙 상단 */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto' }}>
        {/* 섹션 헤더 */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* 섹션 뱃지 */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 2,
              py: 0.75,
              mb: 3,
              borderRadius: '100px',
              border: '1px solid rgba(99,102,241,0.4)',
              background: 'rgba(99,102,241,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <FolderSpecialIcon sx={{ fontSize: 14, color: '#818cf8' }} />
            <Typography
              sx={{
                color: '#818cf8',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.07em',
              }}
            >
              PROJECTS
            </Typography>
          </Box>

          {/* 제목 */}
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
              mb: 1.5,
            }}
          >
            진행한{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              프로젝트
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(248,250,252,0.42)',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.7,
            }}
          >
            직접 설계하고 개발한 프로젝트들을 소개합니다.
          </Typography>
        </Box>

        {/* 프로젝트 카드 그리드 */}
        <Grid container spacing={3}>
          {PROJECTS.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, md: 4 }}>
              <ProjectCard
                project={project}
                animationDelay={0.1 + index * 0.15}
                isVisible={isVisible}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
