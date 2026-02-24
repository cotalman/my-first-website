import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';

/** 초기 About Me 데이터 */
const INITIAL_DATA = {
  basicInfo: {
    name: '이효진',
    education: '',
    major: 'IT계열',
    experience: '프론트엔드 개발 학습 중',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '웹디자이너로 다양한 프로젝트를 진행하며 많은 웹사이트를 제작해왔습니다. 처음에는 디자인 결과물을 만드는 것에 집중했지만, 점점 "이 화면이 어떻게 구현될까?"라는 궁금증이 생기기 시작했습니다. HTML과 CSS를 직접 다루며 마크업 구조를 이해하게 되었고, 자연스럽게 JavaScript와 React까지 관심이 확장되었습니다. 지금은 단순히 예쁜 화면을 만드는 것을 넘어, 구조적으로 안정적이고 유지보수가 쉬운 UI를 설계하는 프론트엔드 개발자로 성장하는 과정에 있습니다. 디자인과 개발을 모두 이해하는 사람이 되는 것이 저의 목표입니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '오랜 실무 경험을 통해, 결과물보다 더 중요한 것은 "유지보수와 협업"이라는 것을 배웠습니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '새로운 기술을 배우는 것을 즐깁니다. 최근에는 AI 기반 개발 도구와 생산성 향상 툴에 많은 관심을 가지고 있습니다. 일과 삶의 균형을 중요하게 생각하며, 항상 한 단계 더 발전한 내일의 저를 만들기 위해 노력하고 있습니다.',
      showInHome: false,
    },
  ],
};

/**
 * PhotoUploadArea 컴포넌트
 * 클릭 시 로컬 이미지 파일 선택 및 세션 미리보기
 *
 * Props:
 * @param {string} photo - 현재 사진 URL [Required]
 * @param {function} onPhotoChange - 파일 선택 이벤트 핸들러 [Required]
 *
 * Example usage:
 * <PhotoUploadArea photo={photo} onPhotoChange={handlePhotoChange} />
 */
function PhotoUploadArea({ photo, onPhotoChange }) {
  const inputRef = useRef(null);

  return (
    <Box
      onClick={ () => inputRef.current?.click() }
      sx={{
        position: 'relative',
        width: { xs: 96, md: 136 },
        height: { xs: 96, md: 136 },
        cursor: 'pointer',
        flexShrink: 0,
        '&:hover .photo-overlay': { opacity: 1 },
      }}
    >
      <Avatar
        src={ photo || undefined }
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '2px solid var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
      >
        { !photo && <PersonIcon sx={{ fontSize: { xs: '2.8rem', md: '3.4rem' } }} /> }
      </Avatar>

      {/* 호버 오버레이 */}
      <Box
        className='photo-overlay'
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.48)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <PhotoCameraIcon sx={{ color: '#FFFFFF', fontSize: '1.4rem' }} />
        <Typography sx={{ color: '#FFFFFF', fontSize: '0.6rem', letterSpacing: '0.06em' }}>
          업로드
        </Typography>
      </Box>

      <input
        ref={ inputRef }
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={ onPhotoChange }
      />
    </Box>
  );
}

/**
 * SectionTabPanel 컴포넌트
 * 탭 패널 콘텐츠 — 내용 텍스트
 *
 * Props:
 * @param {object} section - 섹션 데이터 객체 [Required]
 * @param {string} section.content - 섹션 본문 [Required]
 * @param {number} value - 현재 활성 탭 인덱스 [Required]
 * @param {number} index - 이 패널의 인덱스 [Required]
 *
 * Example usage:
 * <SectionTabPanel section={section} value={activeTab} index={0} />
 */
function SectionTabPanel({ section, value, index }) {
  if (value !== index) return null;

  return (
    <Box role='tabpanel' sx={{ pt: { xs: 3, md: 4 } }}>

      {/* 본문 */}
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.05rem' },
          color: 'var(--color-text-secondary)',
          lineHeight: 2,
        }}
      >
        { section.content }
      </Typography>
    </Box>
  );
}

/**
 * AboutPage 컴포넌트
 * 상세 자기소개 탭 페이지
 * - 기본 정보 카드: 프로필 사진 업로드 + 이름 / 전공 / 경력
 * - 콘텐츠 탭: 나의 개발 스토리 / 개발 철학 / 개인적인 이야기
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const [aboutData, setAboutData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState(0);

  /** 프로필 사진 선택 → URL.createObjectURL 로컬 미리보기 */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAboutData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, photo: url },
    }));
  };

  const { basicInfo, sections } = aboutData;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg'>

        {/* 섹션 레이블 */}
        <Typography
          sx={{
            fontSize: { xs: '0.75rem', md: '0.8rem' },
            fontWeight: 600,
            color: 'var(--color-primary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            mb: { xs: 6, md: 8 },
          }}
        >
          About Me
        </Typography>

        {/* ── 기본 정보 카드 ── */}
        <Box
          sx={{
            border: '1px solid var(--color-border)',
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            mb: { xs: 4, md: 6 },
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'center' },
              gap: { xs: 3, md: 5 },
            }}
          >
            {/* 프로필 사진 */}
            <PhotoUploadArea
              photo={ basicInfo.photo }
              onPhotoChange={ handlePhotoChange }
            />

            {/* 이름 + 정보 */}
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography
                component='h1'
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                { basicInfo.name }
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                }}
              >
                <Chip
                  label={ basicInfo.major }
                  size='small'
                  sx={{
                    backgroundColor: 'rgba(240,78,35,0.08)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(240,78,35,0.2)',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
                <Chip
                  label={ basicInfo.experience }
                  size='small'
                  sx={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── 콘텐츠 섹션 탭 ── */}
        <Box
          sx={{
            border: '1px solid var(--color-border)',
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* 탭 헤더 */}
          <Box sx={{ borderBottom: '1px solid var(--color-border)', px: { xs: 1, md: 3 } }}>
            <Tabs
              value={ activeTab }
              onChange={ (_, newVal) => setActiveTab(newVal) }
              variant='scrollable'
              scrollButtons='auto'
              sx={{
                '& .MuiTab-root': {
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  textTransform: 'none',
                  minHeight: 52,
                  px: { xs: 2, md: 3 },
                },
                '& .Mui-selected': {
                  color: 'var(--color-primary) !important',
                  fontWeight: 700,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--color-primary)',
                  height: 2,
                },
              }}
            >
              { sections.map((section) => (
                <Tab key={ section.id } label={ section.title } />
              )) }
            </Tabs>
          </Box>

          {/* 탭 콘텐츠 */}
          <Box sx={{ px: { xs: 3, md: 5 }, pb: { xs: 4, md: 5 } }}>
            { sections.map((section, i) => (
              <SectionTabPanel
                key={ section.id }
                section={ section }
                value={ activeTab }
                index={ i }
              />
            )) }
          </Box>
        </Box>

      </Container>
    </Box>
  );
}

export default AboutPage;
