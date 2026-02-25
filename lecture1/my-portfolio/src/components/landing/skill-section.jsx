import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

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

/** 아이콘별 시각적 속성 매핑 (Context 아이콘 키 기준) */
const SKILL_VISUAL = {
  html: { abbr: '</>', bgColor: '#E34C26', accentColor: '#FFFFFF' },
  css: { abbr: '{ }', bgColor: '#264DE4', accentColor: '#FFFFFF' },
  photoshop: { abbr: 'Ps', bgColor: '#001E36', accentColor: '#31A8FF' },
  illustrator: { abbr: 'Ai', bgColor: '#300000', accentColor: '#FF7C00' },
  figma: { abbr: 'Fg', bgColor: '#1E1E2E', accentColor: '#A259FF' },
};

/**
 * SkillCard 컴포넌트
 * 아이콘 배지 + 카테고리 태그 + 툴 이름
 *
 * Props:
 * @param {object} skill - 스킬 데이터 [Required]
 */
const SkillCard = memo(function SkillCard({ skill }) {
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
        {/* 아이콘 배지 */}
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
});

/**
 * SkillSection 컴포넌트
 * Context에서 상위 4개 스킬을 가져와 표시
 *
 * Props: 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { topSkills } = homeData;

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

        {/* 스킬 카드 4개 */}
        <ScrollReveal delay={ 0.08 }>
          <Grid container spacing={ 2 } sx={{ mb: { xs: 8, md: 10 } }}>
            { topSkills.map((skill) => (
              <Grid key={ skill.id } size={{ xs: 6, md: 2.4 }}>
                <SkillCard skill={ skill } />
              </Grid>
            )) }
          </Grid>
        </ScrollReveal>

        {/* 전체 스킬 보기 버튼 */}
        <ScrollReveal delay={ 0.16 }>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              onClick={ () => navigate('/about') }
              variant='outlined'
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                px: 4,
                py: 1.2,
                '&:hover': {
                  backgroundColor: 'rgba(240,78,35,0.06)',
                  borderColor: 'var(--color-primary)',
                },
              }}
            >
              전체 스킬 보기 →
            </Button>
          </Box>
        </ScrollReveal>

      </Container>
    </Box>
  );
}

export default SkillSection;
