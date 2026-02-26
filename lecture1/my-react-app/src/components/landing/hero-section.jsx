import { useState, useEffect } from 'react';
import useParallax from '../../hooks/use-parallax';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CodeIcon from '@mui/icons-material/Code';

const TYPING_TEXTS = ['React Developer', 'UI/UX Designer', 'MUI Specialist', 'Code Craftsman'];

const BLOBS = [
  { size: 520, top: '-18%', left: '-8%', color: 'rgba(99, 102, 241, 0.14)', duration: 8, depth: 0.12 },
  { size: 420, bottom: '-12%', right: '-6%', color: 'rgba(168, 85, 247, 0.11)', duration: 10, depth: 0.20 },
  { size: 320, top: '35%', right: '3%', color: 'rgba(236, 72, 153, 0.08)', duration: 7, depth: 0.08 },
  { size: 220, top: '18%', left: '28%', color: 'rgba(59, 130, 246, 0.09)', duration: 9, depth: 0.16 },
];

const CODE_LINES = [
  [{ t: 'import ', c: '#c084fc' }, { t: 'React', c: '#f1f5f9' }, { t: ' from ', c: '#c084fc' }, { t: "'react';", c: '#86efac' }],
  [{ t: 'import ', c: '#c084fc' }, { t: '{ Box }', c: '#7dd3fc' }, { t: ' from ', c: '#c084fc' }, { t: "'@mui/material';", c: '#86efac' }],
  [{ t: '', c: '' }],
  [{ t: 'function ', c: '#c084fc' }, { t: 'App', c: '#fbbf24' }, { t: '() {', c: '#f1f5f9' }],
  [{ t: '  return (', c: '#f1f5f9' }],
  [{ t: '    <', c: '#f1f5f9' }, { t: 'Box', c: '#7dd3fc' }, { t: ' sx=', c: '#f1f5f9' }, { t: '{{ ... }}', c: '#fbbf24' }, { t: '>', c: '#f1f5f9' }],
  [{ t: '      <', c: '#f1f5f9' }, { t: 'HeroSection', c: '#86efac' }, { t: ' />', c: '#f1f5f9' }],
  [{ t: '      <', c: '#f1f5f9' }, { t: 'ButtonSection', c: '#86efac' }, { t: ' />', c: '#f1f5f9' }],
  [{ t: '      <', c: '#f1f5f9' }, { t: 'ModalSection', c: '#86efac' }, { t: ' />', c: '#f1f5f9' }],
  [{ t: '      <', c: '#f1f5f9' }, { t: 'CardSection', c: '#86efac' }, { t: ' />', c: '#f1f5f9' }],
  [{ t: '    </', c: '#f1f5f9' }, { t: 'Box', c: '#7dd3fc' }, { t: '>', c: '#f1f5f9' }],
  [{ t: '  );', c: '#f1f5f9' }],
  [{ t: '}', c: '#f1f5f9' }],
];

/**
 * HeroSection 컴포넌트
 *
 * UI Components Gallery의 메인 히어로 섹션.
 * 그라데이션 배경, 기하학적 도형, 타이핑 효과,
 * 코드 에디터 장식, 스크롤 인디케이터를 포함합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  const scrollY = useParallax();
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 마운트 후 페이드인 트리거
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  // 타이핑 효과
  useEffect(() => {
    const current = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 55 : 105;

    const t = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else {
        setIsDeleting(false);
        setTextIndex(i => (i + 1) % TYPING_TEXTS.length);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [charIndex, isDeleting, textIndex]);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--hero-bg)',
        transition: 'background 0.4s ease',
      }}
    >
      {/* 도트 그리드 패턴 오버레이 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(99, 102, 241, 0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* 발광 블롭 도형들 — outer: 패럴렉스, inner: float 애니메이션 */}
      {BLOBS.map((blob, i) => (
        <Box
          key={i}
          style={{ '--py': `${scrollY * blob.depth}px` }}
          sx={{
            position: 'absolute',
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            width: blob.size,
            height: blob.size,
            transform: 'translate3d(0, var(--py), 0)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              filter: 'blur(80px)',
              [`@keyframes blobFloat${i}`]: {
                '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                '33%': { transform: `translate(${10 + i * 4}px, -14px) scale(1.04)` },
                '66%': { transform: `translate(-8px, ${9 + i * 3}px) scale(0.96)` },
              },
              animation: `blobFloat${i} ${blob.duration}s ease-in-out infinite`,
            }}
          />
        </Box>
      ))}

      {/* 메인 콘텐츠 */}
      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto', position: 'relative', zIndex: 1, py: { xs: 12, md: 4 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">

          {/* 왼쪽: 텍스트 영역 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
              }}
            >
              {/* 뱃지 */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  mb: 3,
                  borderRadius: '100px',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  background: 'rgba(99, 102, 241, 0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <CodeIcon sx={{ fontSize: 15, color: '#818cf8' }} />
                <Typography
                  sx={{
                    color: '#818cf8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                  }}
                >
                  MUI + REACT COMPONENTS
                </Typography>
              </Box>

              {/* 헤드라인 */}
              <Typography
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: 'var(--text-100)',
                  letterSpacing: '-0.02em',
                  mb: 0.5,
                }}
              >
                현대적인 UI를
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  mb: 3,
                  background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                함께 만들어요
              </Typography>

              {/* 타이핑 효과 줄 */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  mb: 3,
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.9s ease 0.3s',
                }}
              >
                <Typography
                  sx={{
                    color: 'var(--text-50)',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                  }}
                >
                  저는
                </Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 0.5 }}>
                  <Typography
                    sx={{
                      color: '#c084fc',
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 700,
                    }}
                  >
                    {displayText}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '2px',
                      height: { xs: '1.1em', md: '1.25em' },
                      background: '#c084fc',
                      ml: 0.3,
                      verticalAlign: 'middle',
                      '@keyframes blink': {
                        '0%, 49%': { opacity: 1 },
                        '50%, 100%': { opacity: 0 },
                      },
                      animation: 'blink 0.9s step-end infinite',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: 'var(--text-50)',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    ml: 0.5,
                  }}
                >
                  입니다
                </Typography>
              </Box>

              {/* 설명 */}
              <Typography
                sx={{
                  color: 'var(--text-42)',
                  fontSize: { xs: '0.9rem', md: '1.02rem' },
                  lineHeight: 1.85,
                  mb: 4,
                  maxWidth: '490px',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.9s ease 0.5s',
                }}
              >
                MUI + React 기반의 16가지 UI 컴포넌트를 탐색해보세요.
                버튼, 입력, 모달, 드래그앤드롭 등 다양한 인터랙션을 직접 체험할 수 있습니다.
              </Typography>

              {/* CTA 버튼들 */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.9s ease 0.7s',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleScrollDown}
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    borderRadius: '10px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    boxShadow: '0 4px 24px rgba(99, 102, 241, 0.35)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 36px rgba(99, 102, 241, 0.5)',
                    },
                  }}
                >
                  컴포넌트 탐색하기 →
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    borderRadius: '10px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: 'var(--text-65)',
                    borderColor: 'var(--border)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: 'var(--border-hover)',
                      background: 'var(--surface-hover)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  코드 보기
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* 오른쪽: 코드 에디터 장식 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(-1.5deg)' : 'translateY(40px) rotate(-1.5deg)',
                transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
                '&:hover': {
                  transform: 'translateY(-6px) rotate(0deg)',
                  transition: 'transform 0.35s ease',
                },
              }}
            >
              <CodeWindowCard lines={CODE_LINES} isVisible={isVisible} />
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Box
          onClick={handleScrollDown}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            color: 'var(--text-25)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'color 0.2s ease',
            '&:hover': { color: 'var(--text-65)' },
            '@keyframes scrollBounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(8px)' },
            },
            animation: 'scrollBounce 2.2s ease-in-out infinite',
          }}
        >
          <Typography sx={{ fontSize: '0.63rem', letterSpacing: '0.16em', fontWeight: 600 }}>
            SCROLL
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * CodeWindowCard 컴포넌트
 *
 * 장식용 코드 에디터 창을 렌더링합니다.
 *
 * @param {Array} lines - 토큰 배열로 구성된 코드 라인 목록 [Required]
 * @param {boolean} isVisible - 페이드인 트리거 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <CodeWindowCard lines={CODE_LINES} isVisible={true} />
 */
function CodeWindowCard({ lines, isVisible = false }) {
  return (
    <Box
      sx={{
        background: 'rgba(10, 14, 26, 0.88)',
        border: '1px solid rgba(99, 102, 241, 0.22)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 28px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* 타이틀 바 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          background: 'rgba(0,0,0,0.28)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          gap: 0.75,
        }}
      >
        {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
          <Box
            key={i}
            sx={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: color,
              opacity: 0.9,
            }}
          />
        ))}
        <Typography
          sx={{
            flex: 1,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.32)',
            fontSize: '0.72rem',
            fontFamily: '"Fira Code", "Consolas", monospace',
            letterSpacing: '0.03em',
          }}
        >
          App.jsx — UI Components Gallery
        </Typography>
      </Box>

      {/* 코드 라인들 */}
      <Box sx={{ p: 2.5 }}>
        {lines.map((line, lineIdx) => (
          <Box key={lineIdx} sx={{ display: 'flex', alignItems: 'baseline', mb: 0.15 }}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.16)',
                fontSize: '0.7rem',
                fontFamily: '"Fira Code", "Consolas", monospace',
                minWidth: '24px',
                mr: 2,
                userSelect: 'none',
                textAlign: 'right',
                lineHeight: 1.75,
              }}
            >
              {lineIdx + 1}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.22s ease ${0.65 + lineIdx * 0.045}s`,
              }}
            >
              {line.map((token, tIdx) => (
                <Typography
                  key={tIdx}
                  component="span"
                  sx={{
                    color: token.c || 'transparent',
                    fontSize: '0.8rem',
                    fontFamily: '"Fira Code", "Consolas", monospace',
                    lineHeight: 1.75,
                    whiteSpace: 'pre',
                  }}
                >
                  {token.t}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* 상태 바 */}
      <Box
        sx={{
          px: 2.5,
          py: 1,
          background: 'rgba(99,102,241,0.12)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.28)',
            fontSize: '0.67rem',
            fontFamily: '"Fira Code", "Consolas", monospace',
          }}
        >
          ✓ No problems
        </Typography>
        <Typography
          sx={{
            color: '#818cf8',
            fontSize: '0.67rem',
            fontFamily: '"Fira Code", "Consolas", monospace',
          }}
        >
          JavaScript JSX
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroSection;
