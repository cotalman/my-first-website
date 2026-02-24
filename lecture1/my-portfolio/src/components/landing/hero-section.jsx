import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection 컴포넌트
 * 다크 테마 임팩트형 Hero — 초대형 타이포그래피 + 커스텀 커서 + 자기장 텍스트 효과
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  /** 커스텀 커서: RAF로 DOM 직접 조작 (setState 없음 → 리렌더 없음) */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let tx = -100, ty = -100;
    let cx = -100, cy = -100;
    let id;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      cursor.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      id = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    id = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  /** 자기장(Magnetic) 텍스트 효과: 마우스 위치에 따라 헤드라인 미세 이동 */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setMouseOffset({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };

    const onLeave = () => setMouseOffset({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* 커스텀 커서 — viewport 고정, mix-blend-mode: difference 로 배경색 반전 */}
      <Box
        ref={ cursorRef }
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          opacity: isCursorVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Hero 섹션 */}
      <Box
        ref={ heroRef }
        onMouseEnter={ () => setIsCursorVisible(true) }
        onMouseLeave={ () => setIsCursorVisible(false) }
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0F0F0F',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        {/* 좌측 세로 라벨 */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 16, md: 32 },
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Web Designer · Portfolio · 2026
          </Typography>
        </Box>

        <Container
          maxWidth='lg'
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 16, md: 0 },
            pl: { md: 10 },
          }}
        >
          {/* 상단 소형 레이블 */}
          <Typography
            sx={{
              fontSize: { xs: '0.7rem', md: '0.8rem' },
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              mb: { xs: 4, md: 6 },
              opacity: 0,
              animation: 'fadeUp 0.8s ease 0.2s forwards',
              '@keyframes fadeUp': {
                from: { opacity: 0, transform: 'translateY(12px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Available for work
          </Typography>

          {/* ── 메인 헤드라인 (자기장 효과) ── */}
          <Box
            sx={{
              transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 8}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              mb: { xs: 6, md: 8 },
            }}
          >
            {/* 첫째 줄: 실선 흰색 */}
            <Typography
              component='h1'
              sx={{
                display: 'block',
                fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                fontWeight: 800,
                color: '#F5F5F0',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                opacity: 0,
                animation: 'fadeUp 0.9s ease 0.35s forwards',
              }}
            >
              디자인과
            </Typography>

            {/* 둘째 줄: 아웃라인 텍스트 (테두리만) */}
            <Typography
              component='h1'
              sx={{
                display: 'block',
                fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                fontWeight: 800,
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.22)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                opacity: 0,
                animation: 'fadeUp 0.9s ease 0.5s forwards',
              }}
            >
              개발 사이.
            </Typography>
          </Box>

          {/* ── 하단 영역: 설명 + CTA + 스크롤 ── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              gap: 4,
              opacity: 0,
              animation: 'fadeUp 0.9s ease 0.65s forwards',
            }}
          >
            {/* 좌측: 설명 + CTA */}
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.9,
                  mb: 4,
                }}
              >
                웹디자이너 · UI/UX · Figma
                <br />
                개발자와 소통하는 디자이너
              </Typography>

              <Button
                component={ Link }
                to='/projects'
                endIcon={ <ArrowForwardIcon sx={{ fontSize: '1rem !important', transition: 'transform 0.3s ease' }} /> }
                sx={{
                  color: '#F5F5F0',
                  fontSize: { xs: '0.875rem', md: '0.95rem' },
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 0,
                  px: 3.5,
                  py: 1.6,
                  minHeight: 52,
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'var(--color-primary)',
                    borderColor: 'var(--color-primary)',
                  },
                  '&:hover .MuiButton-endIcon': {
                    transform: 'translateX(4px)',
                  },
                }}
              >
                포트폴리오 보기
              </Button>
            </Box>

            {/* 우측: 스크롤 인디케이터 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                mb: { xs: 0, md: 2 },
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  writingMode: 'vertical-rl',
                }}
              >
                Scroll
              </Typography>
              {/* 스크롤 라인 애니메이션 */}
              <Box
                sx={{
                  width: '1px',
                  height: 72,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: 0,
                    width: '100%',
                    height: '50%',
                    backgroundColor: 'var(--color-primary)',
                    animation: 'scrollLine 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                  },
                  '@keyframes scrollLine': {
                    '0%': { top: '-50%' },
                    '100%': { top: '150%' },
                  },
                }}
              />
            </Box>
          </Box>
        </Container>

        {/* 우하단 장식 텍스트 */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: { xs: 24, md: 32 },
            right: { xs: 16, md: 32 },
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.12)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          © 2026
        </Typography>
      </Box>
    </>
  );
}

export default HeroSection;
