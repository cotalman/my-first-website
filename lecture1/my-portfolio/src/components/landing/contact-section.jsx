import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

/** 연락처 정보 데이터 */
const CONTACT_INFO = [
  {
    icon: <EmailIcon sx={{ fontSize: '1.1rem' }} />,
    label: '이메일',
    value: 'dp98j100@gmail.com',
    href: 'mailto:dp98j100@gmail.com',
  },
];

/** SNS 링크 데이터 */
const SNS_LINKS = [
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    href: 'https://github.com/cotalman',
  },
];

/**
 * ContactSection 컴포넌트
 * 연락처 정보 + SNS 링크 + 방명록 (폼 + 목록)
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <Box
      id='contact'
      sx={{
        width: '100%',
        backgroundColor: 'var(--color-secondary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg'>

        {/* 섹션 헤더 */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              fontWeight: 600,
              color: 'var(--color-primary-light)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Contact
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 2,
            }}
          >
            함께 이야기해요
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
            }}
          >
            언제든지 편하게 연락주세요. 방명록도 남겨주시면 감사합니다!
          </Typography>
        </Box>

        {/* ── 연락처 영역 ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            mb: 4,
          }}
        >
          {/* 이메일 + 텍스트 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            { CONTACT_INFO.map((item) => (
              <Link
                key={ item.label }
                href={ item.href }
                underline='none'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  transition: 'color 0.2s',
                  '&:hover': { color: 'var(--color-primary)' },
                }}
              >
                <Box sx={{ color: 'var(--color-primary)', display: 'flex' }}>
                  { item.icon }
                </Box>
                { item.value }
              </Link>
            )) }
          </Box>

          {/* SNS 아이콘 한 줄 */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            { SNS_LINKS.map((sns) => (
              <IconButton
                key={ sns.label }
                component='a'
                href={ sns.href }
                target='_blank'
                rel='noopener noreferrer'
                aria-label={ sns.label }
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 1.5,
                  p: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#FFFFFF',
                    borderColor: 'rgba(255,255,255,0.4)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  },
                }}
              >
                { sns.icon }
              </IconButton>
            )) }
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 6 }} />

        {/* ── 방명록 영역 ── */}
        <Box sx={{ mb: { xs: 5, md: 6 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.85rem' },
              fontWeight: 600,
              color: 'var(--color-primary-light)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Guestbook
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontSize: { xs: '1.3rem', md: '1.7rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 4,
            }}
          >
            방명록
          </Typography>

          {/* 방명록 폼 */}
          <Box sx={{ mb: 5 }}>
            <GuestbookForm onSubmitSuccess={ handleRefresh } />
          </Box>

          {/* 방명록 목록 */}
          <GuestbookList refreshKey={ refreshKey } />
        </Box>

      </Container>
    </Box>
  );
}

export default ContactSection;
