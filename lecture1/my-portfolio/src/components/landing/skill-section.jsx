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
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        backgroundColor: 'var(--color-bg-primary)',
        height: '100%',
        cursor: 'default',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.35s ease, transform 0.35s ease',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 1, md: 2.5 },
        textAlign: { xs: 'center', md: 'left' },
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 아이콘 배지 */}
      <Box
        sx={{
          width: { xs: 48, md: 72 },
          height: { xs: 48, md: 72 },
          borderRadius: 2,
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          fontSize: { xs: abbr?.length > 2 ? '0.75rem' : '1.1rem', md: abbr?.length > 2 ? '1rem' : '1.4rem' },
          fontWeight: 800,
          letterSpacing: abbr?.length > 2 ? '0' : '-0.02em',
          fontFamily: 'monospace',
          flexShrink: 0,
        }}
      >
        { abbr }
      </Box>

      {/* 텍스트 영역 */}
      <Box sx={{ minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
        {/* 툴 이름 */}
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', md: '1.15rem' },
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
            mb: 0.75,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          { name }
        </Typography>

        {/* 카테고리 태그 */}
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.4,
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
  const [parallax, setParallax] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const relativeScroll = window.scrollY - sectionTop;
      setParallax(relativeScroll * 0.45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      id='skills'
      ref={ sectionRef }
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 14 },
      }}
    >
      {/* 패럴렉스 배경 이미지 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Box
          component='img'
          src='https://images.unsplash.com/photo-1613412993582-cb11da2334f0?w=1920&q=80'
          alt=''
          sx={{
            position: 'absolute',
            top: '-30%',
            left: 0,
            width: '100%',
            height: '160%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            transform: `translateY(${parallax}px)`,
            willChange: 'transform',
          }}
        />
        {/* 다크 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(8,8,8,0.78) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.78) 100%)',
          }}
        />
      </Box>

      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto', position: 'relative', zIndex: 1 }}>

        {/* 섹션 헤더 */}
        <ScrollReveal>
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 8, md: 10 },
            }}
          >
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
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              사용하는 도구들
            </Typography>
          </Box>
        </ScrollReveal>

        {/* 스킬 카드 */}
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
              onClick={ () => navigate('/about', { state: { scrollTo: 'tech-stack' } }) }
              variant='outlined'
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#FFFFFF',
                fontWeight: 600,
                px: 4,
                py: 1.2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderColor: '#FFFFFF',
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
