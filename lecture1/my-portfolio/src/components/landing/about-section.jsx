import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ ref }
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      { children }
    </Box>
  );
}

/** 핵심 가치관 데이터 */
const VALUES = [
  {
    num: '01',
    title: '소통',
    desc: '기획자의 아이디어를 디자인으로, 디자인을 개발자의 언어로 옮기는 통역사가 되는 것.',
  },
  {
    num: '02',
    title: '성실',
    desc: '화려한 아이디어보다 꾸준한 실행. 매일 조금씩 더 나아지는 것이 좋은 디자인의 토대.',
  },
  {
    num: '03',
    title: '사용자',
    desc: '디자인은 결국 쓰는 사람을 위한 것. 보기 좋은 것보다 쓰기 좋은 것이 먼저.',
  },
];

/** 관심사 태그 데이터 */
const TAGS = [
  '#커피덕후',
  '#산책중아이디어폭발',
  '#UI탐구생활',
  '#노션마니아',
];

/**
 * AboutSection 컴포넌트
 * 홈 페이지 About Me 섹션
 * 구성: 인용구 훅 → 스토리(사진+텍스트) → 가치관 3카드 → 관심사 태그
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  const navigate = useNavigate();
  const { homeData } = usePortfolio();
  const { storySummary, basicInfo } = homeData;

  return (
    <Box
      id='about'
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth='lg'>

        {/* 섹션 레이블 */}
        <ScrollReveal>
          <Typography
            sx={{
              fontSize: { xs: '0.75rem', md: '0.8rem' },
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              mb: { xs: 8, md: 10 },
            }}
          >
            About Me
          </Typography>
        </ScrollReveal>

        {/* ── ① 훅: 대형 인용구 ── */}
        <ScrollReveal delay={ 0.1 }>
          <Box
            sx={{
              borderLeft: '3px solid var(--color-primary)',
              pl: { xs: 3, md: 6 },
              mb: { xs: 10, md: 14 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1.7rem', md: '2.6rem', lg: '3rem' },
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                mb: 3,
              }}
            >
              "디자인으로 문제를 풀고,
              <Box component='span' sx={{ color: 'var(--color-primary)' }}> 소통하는</Box> 디자이너"
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'var(--color-text-secondary)',
                lineHeight: 1.9,
                maxWidth: 560,
              }}
            >
              기획자의 아이디어를 디자인으로,
              <br />
              디자인을 개발자의 언어로 옮깁니다.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* ── ② 스토리: 사진 + 텍스트 ── */}
        <ScrollReveal delay={ 0.05 }>
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ mb: { xs: 10, md: 14 } }}>

            {/* 사진 영역 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  backgroundColor: '#0F0F0F',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundImage: basicInfo.photo
                    ? 'none'
                    : 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              >
                { basicInfo.photo ? (
                  <Box
                    component='img'
                    src={ basicInfo.photo }
                    alt={ basicInfo.name }
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '3.5rem', md: '4.5rem' },
                        fontWeight: 800,
                        color: 'rgba(255,255,255,0.12)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                      }}
                    >
                      Me.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.18)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Photo here
                    </Typography>
                  </Box>
                ) }
              </Box>
            </Grid>

            {/* 스토리 텍스트 */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  My Story
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.05rem' },
                    color: 'var(--color-text-secondary)',
                    lineHeight: 2,
                  }}
                >
                  { storySummary }
                </Typography>

                <Button
                  onClick={ () => navigate('/about') }
                  variant='outlined'
                  size='small'
                  sx={{
                    alignSelf: 'flex-start',
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: 'rgba(240,78,35,0.06)',
                      borderColor: 'var(--color-primary)',
                    },
                  }}
                >
                  더 알아보기 →
                </Button>

                <Divider sx={{ borderColor: 'var(--color-border)', my: 0.5 }} />

                {/* 간단 수치 */}
                <Box sx={{ display: 'flex', gap: { xs: 4, md: 6 } }}>
                  { [
                    { value: '3+', label: '년 디자인 경력' },
                    { value: '20+', label: '프로젝트 완료' },
                    { value: '100%', label: '소통 의지' },
                  ].map((stat) => (
                    <Box key={ stat.label }>
                      <Typography
                        sx={{
                          fontSize: { xs: '1.5rem', md: '1.8rem' },
                          fontWeight: 800,
                          color: 'var(--color-text-primary)',
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        { stat.value }
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: 'var(--color-text-muted)',
                          mt: 0.5,
                        }}
                      >
                        { stat.label }
                      </Typography>
                    </Box>
                  )) }
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ScrollReveal>

        {/* ── ③ 가치관 카드 3개 ── */}
        <ScrollReveal delay={ 0.05 }>
          <Box sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                mb: 4,
              }}
            >
              Core Values
            </Typography>
            <Grid container spacing={ 2 }>
              { VALUES.map(({ num, title, desc }) => (
                <Grid key={ num } size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      border: '1px solid var(--color-border)',
                      borderRadius: 2,
                      height: '100%',
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                      '&:hover': {
                        borderColor: 'var(--color-primary)',
                        boxShadow: '0 6px 24px rgba(240,78,35,0.08)',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        letterSpacing: '0.15em',
                        mb: 2,
                      }}
                    >
                      { num }
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        mb: 1.5,
                      }}
                    >
                      { title }
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.88rem',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.8,
                      }}
                    >
                      { desc }
                    </Typography>
                  </Box>
                </Grid>
              )) }
            </Grid>
          </Box>
        </ScrollReveal>

        {/* ── ④ 관심사 태그 ── */}
        <ScrollReveal delay={ 0.05 }>
          <Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                mb: 2.5,
              }}
            >
              Interests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              { TAGS.map((tag) => (
                <Box
                  key={ tag }
                  sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: '999px',
                    border: '1px solid var(--color-border)',
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      color: 'var(--color-primary)',
                      backgroundColor: 'rgba(240,78,35,0.05)',
                    },
                  }}
                >
                  { tag }
                </Box>
              )) }
            </Box>
          </Box>
        </ScrollReveal>

      </Container>
    </Box>
  );
}

export default memo(AboutSection);
