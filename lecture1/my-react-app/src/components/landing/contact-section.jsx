import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const CONTACT_ITEMS = [
  {
    id: 'email',
    Icon: EmailIcon,
    label: '이메일',
    value: 'your@email.com',
    href: 'mailto:your@email.com',
  },
  {
    id: 'github',
    Icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/username',
    href: 'https://github.com',
  },
  {
    id: 'linkedin',
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/username',
    href: 'https://linkedin.com',
  },
  {
    id: 'location',
    Icon: LocationOnIcon,
    label: '위치',
    value: '서울, 대한민국',
    href: null,
  },
];

/** 텍스트 필드 공통 sx — 다크 배경에 맞게 스타일 오버라이드 */
const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    color: 'rgba(248,250,252,0.85)',
    fontSize: '0.92rem',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.12)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(129,140,248,0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#818cf8',
      borderWidth: '1.5px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(248,250,252,0.4)',
    fontSize: '0.9rem',
    '&.Mui-focused': {
      color: '#818cf8',
    },
  },
};

/**
 * ContactItem 컴포넌트
 * 연락처 정보 한 행 (아이콘 + 레이블 + 값)
 *
 * Props:
 * @param {object} item - 연락처 데이터 [Required]
 * @param {function} item.Icon - MUI 아이콘 컴포넌트 [Required]
 * @param {string} item.label - 항목 이름 [Required]
 * @param {string} item.value - 표시할 값 [Required]
 * @param {string|null} item.href - 링크 URL (없으면 null) [Optional]
 *
 * Example usage:
 * <ContactItem item={CONTACT_ITEMS[0]} />
 */
function ContactItem({ item }) {
  const { Icon, label, value, href } = item;

  const content = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.03)',
        transition: 'all 0.25s ease',
        cursor: href ? 'pointer' : 'default',
        textDecoration: 'none',
        '&:hover': href
          ? {
              background: 'rgba(99,102,241,0.1)',
              borderColor: 'rgba(129,140,248,0.3)',
              transform: 'translateX(6px)',
            }
          : {},
      }}
      component={href ? 'a' : 'div'}
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
    >
      {/* 아이콘 박스 */}
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '10px',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: 18, color: '#818cf8' }} />
      </Box>
      {/* 텍스트 */}
      <Box>
        <Typography
          sx={{
            color: 'rgba(248,250,252,0.38)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            mb: 0.2,
          }}
        >
          {label.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(248,250,252,0.75)',
            fontSize: '0.88rem',
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return content;
}

/**
 * ContactSection 컴포넌트
 *
 * 포트폴리오의 Contact 섹션.
 * 왼쪽 연락처 정보 패널과 오른쪽 연락 폼으로 구성됩니다.
 * 폼 제출 시 성공 상태 메시지를 표시합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleReset = () => setIsSubmitted(false);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, #0d111f 0%, #080c18 100%)',
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      {/* 배경 발광 장식 - 좌측 */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      {/* 배경 발광 장식 - 우측 하단 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-8%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
            <ContactMailIcon sx={{ fontSize: 14, color: '#818cf8' }} />
            <Typography
              sx={{
                color: '#818cf8',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.07em',
              }}
            >
              CONTACT
            </Typography>
          </Box>

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
            함께{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              일해요
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(248,250,252,0.42)',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.7,
            }}
          >
            프로젝트 제안, 협업 문의, 또는 그냥 인사도 환영합니다.
          </Typography>
        </Box>

        {/* 본문 2단 레이아웃 */}
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">

          {/* 왼쪽: 연락처 정보 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
              }}
            >
              <Typography
                component="h3"
                sx={{
                  color: '#f8fafc',
                  fontSize: { xs: '1.4rem', md: '1.6rem' },
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  mb: 1.5,
                }}
              >
                연락하기 편한 방법을
                <br />
                선택해주세요
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(248,250,252,0.45)',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                빠른 답변을 위해 이메일을 선호합니다.
                보통 24시간 이내에 회신 드립니다.
              </Typography>

              {/* 연락처 항목 목록 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                {CONTACT_ITEMS.map((item) => (
                  <ContactItem key={item.id} item={item} />
                ))}
              </Box>

              {/* 현재 상태 배지 */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: '100px',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#22c55e',
                    '@keyframes statusPulse': {
                      '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.5)' },
                      '50%': { boxShadow: '0 0 0 5px rgba(34,197,94,0)' },
                    },
                    animation: 'statusPulse 2s ease-in-out infinite',
                  }}
                />
                <Typography
                  sx={{
                    color: '#4ade80',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  현재 협업 가능합니다
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 오른쪽: 연락 폼 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s',
                p: { xs: 3, md: 4 },
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {isSubmitted ? (
                /* 제출 완료 상태 */
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6,
                    gap: 2,
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 36, color: '#4ade80' }} />
                  </Box>
                  <Typography
                    sx={{
                      color: '#f8fafc',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                    }}
                  >
                    메시지를 보냈습니다!
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(248,250,252,0.5)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                    }}
                  >
                    빠른 시일 내에 답변 드리겠습니다.
                    <br />
                    감사합니다 😊
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{
                      mt: 2,
                      px: 3,
                      py: 1,
                      borderRadius: '10px',
                      fontWeight: 600,
                      textTransform: 'none',
                      color: 'rgba(248,250,252,0.7)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      '&:hover': {
                        borderColor: '#818cf8',
                        color: '#c084fc',
                        background: 'rgba(99,102,241,0.08)',
                      },
                    }}
                  >
                    다시 보내기
                  </Button>
                </Box>
              ) : (
                /* 입력 폼 */
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        required
                        name="name"
                        label="이름"
                        value={formData.name}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        required
                        name="email"
                        label="이메일"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={textFieldSx}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    required
                    name="message"
                    label="메시지"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    sx={textFieldSx}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{
                      alignSelf: 'flex-end',
                      px: { xs: 4, md: 5 },
                      py: 1.5,
                      borderRadius: '10px',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 28px rgba(99,102,241,0.45)',
                      },
                    }}
                  >
                    보내기
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
