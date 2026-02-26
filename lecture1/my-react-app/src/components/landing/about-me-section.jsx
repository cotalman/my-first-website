import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const INTERESTS = [
  'React', 'TypeScript', 'Material UI', 'Vite',
  'Node.js', 'Supabase', 'UI/UX Design', 'Git',
  '반응형 웹', 'Open Source',
];

const STATS = [
  { value: '3+', label: '년 경력', Icon: WorkIcon },
  { value: '16+', label: '컴포넌트', Icon: CodeIcon },
  { value: '100%', label: '열정', Icon: StarIcon },
];

/**
 * AboutMeSection 컴포넌트
 *
 * 포트폴리오의 About Me 섹션.
 * 프로필 카드, 자기소개 텍스트, 관심 기술 태그, CTA 버튼을 포함합니다.
 * IntersectionObserver로 뷰포트 진입 시 페이드인 애니메이션이 적용됩니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutMeSection />
 */
function AboutMeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 뷰포트 진입 시 애니메이션 트리거
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
      id="about"
      sx={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, #0d111f 0%, #111827 100%)',
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      {/* 배경 발광 장식 - 우상단 */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      {/* 배경 발광 장식 - 좌하단 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '-6%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto' }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">

          {/* 왼쪽: 프로필 카드 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.9s ease, transform 0.9s ease',
              }}
            >
              {/* 프로필 이미지 */}
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                {/* 그라데이션 링 */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    right: -5,
                    bottom: -5,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7, #f472b6)',
                    '@keyframes ringPulse': {
                      '0%, 100%': { opacity: 0.35 },
                      '50%': { opacity: 0.7 },
                    },
                    animation: 'ringPulse 3s ease-in-out infinite',
                  }}
                />
                <Avatar
                  sx={{
                    width: 160,
                    height: 160,
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    fontSize: '3.2rem',
                    fontWeight: 700,
                    border: '4px solid #0d111f',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  KD
                </Avatar>
                {/* 온라인 상태 배지 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#22c55e',
                    border: '3px solid #0d111f',
                    zIndex: 2,
                    '@keyframes greenPulse': {
                      '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' },
                      '50%': { boxShadow: '0 0 0 7px rgba(34,197,94,0)' },
                    },
                    animation: 'greenPulse 2.2s ease-in-out infinite',
                  }}
                />
              </Box>

              {/* 이름 & 직함 */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    color: '#f8fafc',
                    fontSize: { xs: '1.6rem', md: '1.8rem' },
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    mb: 0.5,
                  }}
                >
                  김 개발
                </Typography>
                <Typography
                  sx={{
                    color: '#c084fc',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    mb: 1.5,
                  }}
                >
                  Frontend Developer
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 14, color: 'rgba(248,250,252,0.35)' }} />
                  <Typography sx={{ color: 'rgba(248,250,252,0.35)', fontSize: '0.82rem' }}>
                    서울, 대한민국
                  </Typography>
                </Box>
              </Box>

              {/* 통계 카드 */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  width: '100%',
                  maxWidth: 360,
                }}
              >
                {STATS.map(({ value, label, Icon }) => (
                  <Box
                    key={label}
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      p: 2,
                      borderRadius: '12px',
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.18)',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: 'rgba(99,102,241,0.14)',
                        borderColor: 'rgba(99,102,241,0.35)',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 20, color: '#818cf8', mb: 0.5 }} />
                    <Typography
                      sx={{
                        color: '#f8fafc',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        lineHeight: 1,
                        mb: 0.4,
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(248,250,252,0.4)',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* 오른쪽: 소개 텍스트 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
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
                <PersonIcon sx={{ fontSize: 14, color: '#818cf8' }} />
                <Typography
                  sx={{
                    color: '#818cf8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                  }}
                >
                  ABOUT ME
                </Typography>
              </Box>

              {/* 제목 */}
              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '2.6rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#f8fafc',
                  letterSpacing: '-0.02em',
                  mb: 0.5,
                }}
              >
                안녕하세요,
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '2rem', md: '2.6rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  mb: 3.5,
                  background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                UI를 만드는 개발자입니다 👋
              </Typography>

              {/* 소개 본문 */}
              <Typography
                sx={{
                  color: 'rgba(248,250,252,0.65)',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.9,
                  mb: 2,
                }}
              >
                React와 MUI를 활용해 사용자 경험 중심의 인터페이스를 만드는 것을 좋아합니다.
                아름다운 디자인과 탄탄한 기능성이 공존하는 코드를 작성하는 것이 목표입니다.
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(248,250,252,0.42)',
                  fontSize: { xs: '0.88rem', md: '0.95rem' },
                  lineHeight: 1.9,
                  mb: 4,
                }}
              >
                컴포넌트 기반 개발, 반응형 레이아웃, 접근성을 중요하게 생각하며
                지속적인 학습을 통해 더 나은 개발자로 성장하고 있습니다.
              </Typography>

              {/* 구분 장식선 */}
              <Box
                sx={{
                  width: 48,
                  height: 2,
                  background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                  borderRadius: 1,
                  mb: 4,
                }}
              />

              {/* 기술 관심사 태그 */}
              <Typography
                sx={{
                  color: 'rgba(248,250,252,0.45)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                }}
              >
                TECH STACK & INTERESTS
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: 5,
                }}
              >
                {INTERESTS.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    size="small"
                    sx={{
                      background: 'rgba(99,102,241,0.1)',
                      border: '1px solid rgba(99,102,241,0.22)',
                      color: 'rgba(248,250,252,0.7)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(99,102,241,0.2)',
                        borderColor: 'rgba(99,102,241,0.5)',
                        color: '#c084fc',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  />
                ))}
              </Box>

              {/* CTA 버튼 */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    px: { xs: 3, md: 3.5 },
                    py: 1.4,
                    borderRadius: '10px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.92rem',
                    boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 28px rgba(99,102,241,0.45)',
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  href="mailto:your@email.com"
                  sx={{
                    px: { xs: 3, md: 3.5 },
                    py: 1.4,
                    borderRadius: '10px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.92rem',
                    color: 'rgba(248,250,252,0.72)',
                    borderColor: 'rgba(248,250,252,0.2)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: '#818cf8',
                      color: '#c084fc',
                      background: 'rgba(99,102,241,0.08)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  이메일 연락
                </Button>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default AboutMeSection;
