import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';

/** 스크롤 진입 시 페이드업 애니메이션 래퍼 */
function ScrollReveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ ref }
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      { children }
    </Box>
  );
}

/** 스킬 데이터 */
const skillsData = [
  { id: 1, icon: 'orange-diamond', name: 'HTML', category: 'Frontend' },
  { id: 2, icon: 'palette', name: 'CSS', category: 'Frontend' },
  { id: 3, icon: 'zap', name: 'Photoshop', category: 'Design' },
  { id: 4, icon: 'atom', name: 'Illustrator', category: 'Design' },
  { id: 5, icon: 'target', name: 'Figma', category: 'Design' },
];

/** 아이콘별 시각적 속성 매핑 */
const SKILL_VISUAL = {
  'orange-diamond': {
    abbr: '</>',
    bgColor: '#E34C26',
    accentColor: '#FFFFFF',
    level: 3,
    abilities: ['시맨틱 마크업', '웹 접근성', 'SEO 구조'],
  },
  'palette': {
    abbr: '{ }',
    bgColor: '#264DE4',
    accentColor: '#FFFFFF',
    level: 3,
    abilities: ['반응형 레이아웃', '애니메이션', '스타일링'],
  },
  'zap': {
    abbr: 'Ps',
    bgColor: '#001E36',
    accentColor: '#31A8FF',
    level: 5,
    abilities: ['이미지 편집', '합성 / 보정', '배너 제작'],
  },
  'atom': {
    abbr: 'Ai',
    bgColor: '#300000',
    accentColor: '#FF7C00',
    level: 4,
    abilities: ['벡터 그래픽', '로고 디자인', '아이콘 제작'],
  },
  'target': {
    abbr: 'Fg',
    bgColor: '#1E1E2E',
    accentColor: '#A259FF',
    level: 5,
    abilities: ['화면 설계', '프로토타이핑', '컴포넌트 시스템'],
  },
};

/**
 * SkillCard 컴포넌트
 * 인터랙티브 스킬 카드 — 기본(아이콘+이름+점) / 호버(능력 목록 슬라이드인)
 *
 * Props:
 * @param {object} skill - 스킬 데이터 [Required]
 */
function SkillCard({ skill }) {
  const { icon, name, category } = skill;
  const { abbr, bgColor, accentColor } = SKILL_VISUAL[icon] ?? {};

  return (
    <Box
      sx={{
        p: { xs: 3, md: 3.5 },
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        height: '100%',
        cursor: 'default',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 상단: 아이콘 배지 + 카테고리 태그 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        {/* Adobe 스타일 아이콘 배지 */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 1.5,
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
            fontSize: abbr?.length > 2 ? '0.7rem' : '0.9rem',
            fontWeight: 800,
            letterSpacing: abbr?.length > 2 ? '0' : '-0.02em',
            fontFamily: 'monospace',
            flexShrink: 0,
          }}
        >
          { abbr }
        </Box>

        {/* 카테고리 태그 */}
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '999px',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontSize: '0.62rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          { category }
        </Box>
      </Box>

      {/* 툴 이름 */}
      <Typography
        sx={{
          fontSize: { xs: '1.1rem', md: '1.15rem' },
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        { name }
      </Typography>
    </Box>
  );
}

/**
 * SkillSection 컴포넌트
 * 인터랙티브 스킬 카드 섹션 — Design Tools / Frontend 카테고리 분리
 *
 * Props: 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  const designSkills = skillsData.filter((s) => s.category === 'Design');
  const frontendSkills = skillsData.filter((s) => s.category === 'Frontend');

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth='lg'>

        {/* 섹션 헤더 */}
        <ScrollReveal>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: { xs: 8, md: 10 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.8rem' },
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  mb: 2,
                }}
              >
                Skills
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                사용하는 도구들
              </Typography>
            </Box>
          </Box>
        </ScrollReveal>

        {/* Design Tools 그룹 */}
        <ScrollReveal delay={ 0.08 }>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                mb: 2.5,
              }}
            >
              Design Tools
            </Typography>
            <Grid container spacing={ 2 }>
              { designSkills.map((skill) => (
                <Grid key={ skill.name } size={{ xs: 12, sm: 6, md: 4 }}>
                  <SkillCard skill={ skill } />
                </Grid>
              )) }
            </Grid>
          </Box>
        </ScrollReveal>

        {/* Frontend 그룹 */}
        <ScrollReveal delay={ 0.12 }>
          <Box>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                mb: 2.5,
              }}
            >
              Frontend
            </Typography>
            <Grid container spacing={ 2 }>
              { frontendSkills.map((skill) => (
                <Grid key={ skill.name } size={{ xs: 12, sm: 6, md: 4 }}>
                  <SkillCard skill={ skill } />
                </Grid>
              )) }
            </Grid>
          </Box>
        </ScrollReveal>

      </Container>
    </Box>
  );
}

export default SkillSection;
