import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef, useState } from 'react';

/** 섹션 id로 부드럽게 스크롤 이동 */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/** 타이핑 효과에 순환 표시할 역할 텍스트 목록 */
const TYPING_TEXTS = ['웹디자이너', 'UI/UX 디자이너', 'Figma 디자이너', 'Front-End 개발자'];

/**
 * HeroSection 컴포넌트
 * 다크 테마 임팩트형 Hero
 * - 도트 그리드 + 오렌지 글로우 배경
 * - 플로팅 기하학 도형 애니메이션
 * - 타이핑 효과 (역할 텍스트 순환)
 * - 커스텀 커서 (mix-blend-mode: difference)
 * - 자기장(Magnetic) 헤드라인 효과
 * - 스크롤 유도 애니메이션
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
  const isMobile = useMediaQuery('(max-width:767px)');
  const isTablet = useMediaQuery('(max-width:1199px)');
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /** 커스텀 커서: RAF로 DOM 직접 조작 (리렌더 없음) */
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

  /** 자기장(Magnetic) 텍스트 효과: 마우스 위치에 따라 헤드라인 미세 이동 (데스크톱만) */
  useEffect(() => {
    const el = heroRef.current;
    if (!el || isMobile) return;

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

  /** 타이핑 효과: 타이핑 → 대기 → 삭제 → 다음 텍스트 반복 */
  useEffect(() => {
    const currentText = TYPING_TEXTS[typingIndex];
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setTypingText(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 110);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setTypingText(currentText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 60);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % TYPING_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typingIndex]);

  return (
    <>
      {/* 커스텀 커서 — viewport 고정, mix-blend-mode: difference */}
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

      {/* ══════════════════════════════════════
          Hero 섹션 래퍼
      ══════════════════════════════════════ */}
      <Box
        id='hero'
        ref={ heroRef }
        onMouseEnter={ () => setIsCursorVisible(true) }
        onMouseLeave={ () => setIsCursorVisible(false) }
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#080808',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >

        {/* ── 배경 레이어 1: 오렌지 라디알 글로우 (좌상단) ── */}
        <Box sx={{
          position: 'absolute',
          width: { xs: '70vw', md: '50vw' },
          height: { xs: '70vw', md: '50vw' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,78,35,0.13) 0%, transparent 65%)',
          top: '-15%',
          left: '-10%',
          pointerEvents: 'none',
        }} />

        {/* ── 배경 레이어 2: 오렌지 라디알 글로우 (우하단) ── */}
        <Box sx={{
          position: 'absolute',
          width: { xs: '50vw', md: '35vw' },
          height: { xs: '50vw', md: '35vw' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,78,35,0.07) 0%, transparent 65%)',
          bottom: '0%',
          right: '5%',
          pointerEvents: 'none',
        }} />


        {/* ── 배경 레이어 4: 하단 수평 그라데이션 라인 ── */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(240,78,35,0.4) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── 플로팅 도형 1: 큰 원 (우상단, 모바일 숨김) ── */}
        <Box sx={{
          position: 'absolute',
          display: { xs: 'none', sm: 'block' },
          width: { sm: 200, md: 360 },
          height: { sm: 200, md: 360 },
          borderRadius: '50%',
          border: '1px solid rgba(240,78,35,0.11)',
          top: { sm: '5%', md: '8%' },
          right: { sm: '-5%', md: '6%' },
          animation: 'floatRotate 24s linear infinite',
          pointerEvents: 'none',
          '@keyframes floatRotate': {
            '0%': { transform: 'rotate(0deg) translateY(0px)' },
            '50%': { transform: 'rotate(180deg) translateY(-18px)' },
            '100%': { transform: 'rotate(360deg) translateY(0px)' },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '55%',
            height: '55%',
            borderRadius: '50%',
            border: '1px solid rgba(240,78,35,0.07)',
            top: '22%',
            left: '22%',
          },
        }} />

        {/* ── 플로팅 도형 2: 회전 사각형 (태블릿 이상) ── */}
        <Box sx={{
          position: 'absolute',
          display: { xs: 'none', sm: 'block' },
          width: { sm: 70, md: 110 },
          height: { sm: 70, md: 110 },
          border: '1px solid rgba(255,255,255,0.07)',
          top: { sm: '18%', md: '22%' },
          right: { sm: '8%', md: '20%' },
          animation: 'spinSlow 18s linear infinite',
          pointerEvents: 'none',
          '@keyframes spinSlow': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
        }} />


        {/* ── 플로팅 도형 4: 위아래 부유 삼각형 (태블릿 이상) ── */}
        <Box sx={{
          position: 'absolute',
          display: { xs: 'none', sm: 'block' },
          width: 0,
          height: 0,
          borderLeft: '22px solid transparent',
          borderRight: '22px solid transparent',
          borderBottom: '38px solid rgba(240,78,35,0.06)',
          right: { sm: '6%', md: '14%' },
          top: '58%',
          animation: 'floatUpDown 9s ease-in-out infinite',
          pointerEvents: 'none',
          '@keyframes floatUpDown': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-28px)' },
          },
        }} />

        {/* ── 플로팅 도형 5: 십자 마크 (좌측 하단) ── */}
        <Box sx={{
          position: 'absolute',
          width: 18,
          height: 18,
          left: { xs: '6%', md: '9%' },
          bottom: '22%',
          animation: 'floatUpDown 7s ease-in-out 1.5s infinite',
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.14)',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            height: '100%',
            width: '2px',
            backgroundColor: 'rgba(255,255,255,0.14)',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
          },
        }} />

        {/* ── 플로팅 도형 6: 작은 원 (좌측 상단) ── */}
        <Box sx={{
          position: 'absolute',
          width: { xs: 80, md: 130 },
          height: { xs: 80, md: 130 },
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
          top: { xs: '60%', md: '65%' },
          left: { xs: '3%', md: '5%' },
          animation: 'floatUpDown 11s ease-in-out 0.5s infinite',
          pointerEvents: 'none',
        }} />

        {/* ── 좌측 세로 라벨 ── */}
        <Box sx={{
          position: 'absolute',
          left: { xs: 16, md: 32 },
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          display: { xs: 'none', md: 'block' },
        }}>
          <Typography sx={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            Web Designer · Portfolio · 2026
          </Typography>
        </Box>

        {/* ══════════════════════════════════════
            메인 컨텐츠
        ══════════════════════════════════════ */}
        <Container
          maxWidth='lg'
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 10, sm: 12, md: 0 },
            px: { xs: 3, sm: 4, md: 3 },
            pl: { md: 10 },
          }}
        >

          {/* ── "Available for work" 레이블 ── */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            mb: { xs: 3, sm: 4, md: 6 },
            opacity: 0,
            animation: 'fadeUp 0.8s ease 0.2s forwards',
            '@keyframes fadeUp': {
              from: { opacity: 0, transform: 'translateY(14px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}>
            <Typography sx={{
              fontSize: { xs: '0.7rem', md: '0.8rem' },
              fontWeight: 600,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Available for work
            </Typography>
          </Box>

          {/* ── 메인 헤드라인 (자기장 효과) ── */}
          <Box sx={{
            transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 8}px)`,
            transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            mb: { xs: 4, sm: 5, md: 7 },
          }}>
            {/* 첫째 줄: 그라데이션 흰색 */}
            <Typography
              component='h1'
              sx={{
                display: 'block',
                fontSize: { xs: '2.6rem', sm: '4rem', md: 'clamp(4rem, 9vw, 9rem)' },
                fontWeight: 800,
                lineHeight: { xs: 1.0, md: 0.92 },
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #F5F5F0 0%, rgba(245,245,240,0.65) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0,
                animation: 'fadeUp 0.9s ease 0.35s forwards',
              }}
            >
              디자인과
            </Typography>

            {/* 둘째 줄: 아웃라인 + 오렌지 언더라인 애니메이션 */}
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Typography
                component='h1'
                sx={{
                  display: 'block',
                  fontSize: { xs: '2.6rem', sm: '4rem', md: 'clamp(4rem, 9vw, 9rem)' },
                  fontWeight: 800,
                  color: 'transparent',
                  WebkitTextStroke: { xs: '1px rgba(255,255,255,0.2)', md: '1.5px rgba(255,255,255,0.2)' },
                  lineHeight: { xs: 1.0, md: 0.92 },
                  letterSpacing: '-0.03em',
                  opacity: 0,
                  animation: 'fadeUp 0.9s ease 0.5s forwards',
                }}
              >
                개발 사이.
              </Typography>
            </Box>
          </Box>

          {/* ── 타이핑 효과 + 설명 + CTA ── */}
          <Box sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            opacity: 0,
            animation: 'fadeUp 0.9s ease 0.65s forwards',
          }}>

            {/* 좌측: 타이핑 + 설명 + 버튼 */}
            <Box sx={{ width: '100%' }}>
              {/* 타이핑 텍스트 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 2.5 } }}>
                <Typography sx={{
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.15rem' },
                  color: 'rgba(255,255,255,0.65)',
                  fontWeight: 400,
                  lineHeight: 1,
                }}>
                  I&apos;m a&nbsp;
                  <Box
                    component='span'
                    sx={{
                      color: '#E83820',
                      fontWeight: 700,
                    }}
                  >
                    { typingText }
                  </Box>
                  {/* 커서 깜빡임 */}
                  <Box
                    component='span'
                    sx={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1em',
                      backgroundColor: '#E83820',
                      ml: '3px',
                      verticalAlign: 'middle',
                      animation: 'cursorBlink 1s step-end infinite',
                      '@keyframes cursorBlink': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0 },
                      },
                    }}
                  />
                </Typography>
              </Box>

              {/* 부연 설명 */}
              <Typography sx={{
                fontSize: { xs: '0.82rem', sm: '0.875rem', md: '0.9rem' },
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.04em',
                lineHeight: 1.9,
                mb: { xs: 3, md: 4 },
                maxWidth: { xs: '100%', md: 340 },
              }}>
                개발자와 소통하는 디자이너
                <br />
                Photoshop · Illustrator · Figma · HTML · CSS
              </Typography>

              {/* CTA 버튼 2개 */}
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                mb: 3,
              }}>
                {/* Primary CTA: 프로젝트 보기 */}
                <Button
                  onClick={ () => scrollToSection('projects') }
                  endIcon={
                    <ArrowForwardIcon
                      sx={{ fontSize: '1rem !important', transition: 'transform 0.3s ease' }}
                    />
                  }
                  sx={{
                    color: '#F5F5F0',
                    fontSize: { xs: '0.875rem', md: '0.95rem' },
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    backgroundColor: '#E83820',
                    borderRadius: 0,
                    px: 3.5,
                    py: 1.6,
                    minHeight: 52,
                    width: { xs: '100%', sm: 'auto' },
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#C42D17',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 28px rgba(232,56,32,0.45)',
                    },
                    '&:hover .MuiButton-endIcon': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  프로젝트 보기
                </Button>

                {/* Secondary CTA: 연락하기 */}
                <Button
                  onClick={ () => scrollToSection('contact') }
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: { xs: '0.875rem', md: '0.95rem' },
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 0,
                    px: 3.5,
                    py: 1.6,
                    minHeight: 52,
                    width: { xs: '100%', sm: 'auto' },
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.4)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  연락하기
                </Button>
              </Box>

              {/* 소셜 아이콘 */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title='GitHub' placement='top'>
                  <IconButton
                    component='a'
                    href='https://github.com/cotalman'
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 1.5,
                      width: 44,
                      height: 44,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.4)',
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <GitHubIcon sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title='LinkedIn' placement='top'>
                  <IconButton
                    component='a'
                    href='https://linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 1.5,
                      width: 44,
                      height: 44,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        color: '#0A66C2',
                        borderColor: '#0A66C2',
                        backgroundColor: 'rgba(10,102,194,0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* 우측: 스크롤 인디케이터 (모바일 숨김) */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              flexShrink: 0,
            }}>
              <Typography sx={{
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.18)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                writingMode: 'vertical-rl',
              }}>
                Scroll
              </Typography>

              {/* 스크롤 라인 */}
              <Box sx={{
                width: '1px',
                height: 72,
                backgroundColor: 'rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: 0,
                  width: '100%',
                  height: '50%',
                  backgroundColor: '#E83820',
                  animation: 'scrollLine 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                },
                '@keyframes scrollLine': {
                  '0%': { top: '-50%' },
                  '100%': { top: '150%' },
                },
              }} />

              {/* 바운스 다운 화살표 (클릭 시 다음 섹션 이동) */}
              <Box
                onClick={ () => scrollToSection('about') }
                sx={{
                  animation: 'bounceDown 2s ease-in-out infinite',
                  cursor: 'pointer',
                  '@keyframes bounceDown': {
                    '0%, 100%': { transform: 'translateY(0)', opacity: 0.25 },
                    '50%': { transform: 'translateY(7px)', opacity: 0.7 },
                  },
                  '&:hover': { opacity: '1 !important' },
                }}
              >
                <ArrowDownwardIcon sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }} />
              </Box>
            </Box>
          </Box>
        </Container>

        {/* 우하단 장식 텍스트 */}
        <Typography sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 32 },
          right: { xs: 16, md: 32 },
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.1)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          © 2026
        </Typography>
      </Box>
    </>
  );
}

export default HeroSection;
