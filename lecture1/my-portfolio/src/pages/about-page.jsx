import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';

/** 카테고리별 색상/스타일 설정 */
const CATEGORY_CONFIG = {
  Frontend: {
    color: '#0070F3',
    bgColor: 'rgba(0,112,243,0.08)',
    borderColor: 'rgba(0,112,243,0.2)',
  },
  Framework: {
    color: '#00BCD4',
    bgColor: 'rgba(0,188,212,0.08)',
    borderColor: 'rgba(0,188,212,0.2)',
  },
  Design: {
    color: '#A259FF',
    bgColor: 'rgba(162,89,255,0.08)',
    borderColor: 'rgba(162,89,255,0.2)',
  },
};

/** 아이콘 배지 설정 — 브랜드 색상 */
const ICON_CONFIG = {
  html: { abbr: '</>', bgColor: '#E34C26', color: '#FFFFFF' },
  css: { abbr: '{ }', bgColor: '#264DE4', color: '#FFFFFF' },
  javascript: { abbr: 'JS', bgColor: '#F7DF1E', color: '#333333' },
  react: { abbr: 'Re', bgColor: '#20232A', color: '#61DAFB' },
  figma: { abbr: 'Fg', bgColor: '#1E1E2E', color: '#A259FF' },
  photoshop: { abbr: 'Ps', bgColor: '#001E36', color: '#31A8FF' },
  illustrator: { abbr: 'Ai', bgColor: '#300000', color: '#FF7C00' },
};

/** 카테고리 표시 순서 */
const CATEGORY_ORDER = ['Frontend', 'Framework', 'Design'];

/** 스킬 추가 다이얼로그 기본 폼 값 */
const BLANK_FORM = { name: '', category: 'Frontend', description: '' };

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
  skills: [
    { id: 1, icon: 'html', name: 'HTML', category: 'Frontend', description: '시맨틱 마크업, 웹 접근성, SEO 구조', showInMain: true },
    { id: 2, icon: 'css', name: 'CSS', category: 'Frontend', description: '반응형 레이아웃, 애니메이션, 스타일링', showInMain: true },
    { id: 3, icon: 'photoshop', name: 'Photoshop', category: 'Design', description: '이미지 편집, 합성 / 보정, 배너 제작', showInMain: true },
    { id: 4, icon: 'illustrator', name: 'Illustrator', category: 'Design', description: '벡터 그래픽, 로고 디자인, 아이콘 제작', showInMain: true },
    { id: 5, icon: 'figma', name: 'Figma', category: 'Design', description: '화면 설계, 프로토타이핑, 컴포넌트 시스템', showInMain: true },
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
 * SkillCard 컴포넌트
 * 개별 스킬 카드 — 아이콘 배지 + 이름 + 숙련도 바 + 메인 표시 토글
 * 호버 시 description 툴팁 표시
 *
 * Props:
 * @param {object} skill - 스킬 데이터 객체 [Required]
 * Example usage:
 * <SkillCard skill={skill} />
 */
function SkillCard({ skill }) {
  const { icon, name, category, description } = skill;

  const iconCfg = ICON_CONFIG[icon] || {
    abbr: name.slice(0, 2).toUpperCase(),
    bgColor: '#666666',
    color: '#FFFFFF',
  };
  const catCfg = CATEGORY_CONFIG[category] || {
    color: 'var(--color-text-secondary)',
    bgColor: 'var(--color-bg-secondary)',
    borderColor: 'var(--color-border)',
  };

  return (
    <Tooltip title={ description || '' } placement='top' arrow>
      <Box
        sx={{
          p: 2.5,
          border: '1px solid var(--color-border)',
          borderRadius: 2,
          backgroundColor: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {/* 아이콘 배지 + 이름 + 카테고리 + 즐겨찾기 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* 아이콘 배지 */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              backgroundColor: iconCfg.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: iconCfg.color,
              fontSize: (icon === 'html' || icon === 'css') ? '0.6rem' : '0.72rem',
              fontWeight: 800,
              fontFamily: 'monospace',
              flexShrink: 0,
              letterSpacing: '-0.01em',
            }}
          >
            { iconCfg.abbr }
          </Box>

          {/* 이름 + 카테고리 칩 */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
              }}
            >
              { name }
            </Typography>
            <Chip
              label={ category }
              size='small'
              sx={{
                mt: 0.5,
                height: 18,
                fontSize: '0.62rem',
                fontWeight: 600,
                backgroundColor: catCfg.bgColor,
                color: catCfg.color,
                border: '1px solid',
                borderColor: catCfg.borderColor,
              }}
            />
          </Box>

        </Box>

      </Box>
    </Tooltip>
  );
}

/**
 * AddSkillDialog 컴포넌트
 * 새 스킬 추가 다이얼로그 — 기술명 / 카테고리 / 숙련도 슬라이더 / 설명
 *
 * Props:
 * @param {boolean} open - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 * @param {function} onAdd - 스킬 추가 핸들러 [Required]
 *
 * Example usage:
 * <AddSkillDialog open={open} onClose={handleClose} onAdd={handleAddSkill} />
 */
function AddSkillDialog({ open, onClose, onAdd }) {
  const [form, setForm] = useState(BLANK_FORM);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({
      id: Date.now(),
      icon: form.name.toLowerCase().replace(/\s+/g, ''),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      showInMain: false,
    });
    setForm(BLANK_FORM);
    onClose();
  };

  const handleClose = () => {
    setForm(BLANK_FORM);
    onClose();
  };

  return (
    <Dialog open={ open } onClose={ handleClose } maxWidth='xs' fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1rem', pb: 1 }}>
        스킬 추가
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
          <TextField
            label='기술명'
            value={ form.name }
            onChange={ (e) => setForm((p) => ({ ...p, name: e.target.value })) }
            size='small'
            fullWidth
            autoFocus
            placeholder='예: TypeScript'
          />

          <FormControl fullWidth size='small'>
            <InputLabel id='add-skill-category-label'>카테고리</InputLabel>
            <Select
              labelId='add-skill-category-label'
              value={ form.category }
              label='카테고리'
              onChange={ (e) => setForm((p) => ({ ...p, category: e.target.value })) }
            >
              { Object.keys(CATEGORY_CONFIG).map((cat) => (
                <MenuItem key={ cat } value={ cat }>{ cat }</MenuItem>
              )) }
            </Select>
          </FormControl>

          <TextField
            label='설명 (툴팁)'
            value={ form.description }
            onChange={ (e) => setForm((p) => ({ ...p, description: e.target.value })) }
            size='small'
            fullWidth
            placeholder='예: 반응형 레이아웃, 애니메이션'
            multiline
            rows={ 2 }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={ handleClose }
          sx={{ color: 'var(--color-text-muted)' }}
        >
          취소
        </Button>
        <Button
          onClick={ handleAdd }
          variant='contained'
          disabled={ !form.name.trim() }
          sx={{
            backgroundColor: 'var(--color-primary)',
            fontWeight: 700,
            '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * AboutPage 컴포넌트
 * 상세 자기소개 탭 페이지
 * - 기본 정보 카드: 프로필 사진 업로드 + 이름 / 전공 / 경력
 * - 콘텐츠 탭: 나의 개발 스토리 / 개발 철학 / 개인적인 이야기
 * - 기술 스택: 카테고리별 스킬 카드 그리드 + 스킬 추가 다이얼로그
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  const [aboutData, setAboutData] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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

  /** 새 스킬 추가 */
  const handleAddSkill = (newSkill) => {
    setAboutData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };


  const { basicInfo, sections, skills } = aboutData;

  /** 카테고리별 그룹핑 */
  const groupedSkills = CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {});

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
            <PhotoUploadArea
              photo={ basicInfo.photo }
              onPhotoChange={ handlePhotoChange }
            />

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
            mb: { xs: 4, md: 6 },
          }}
        >
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

        {/* ── 기술 스택 섹션 ── */}
        <Box>
          {/* 섹션 헤더 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: { xs: 5, md: 6 },
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
                  mb: 1,
                }}
              >
                Tech Stack
              </Typography>
              <Typography
                variant='h2'
                sx={{
                  fontSize: { xs: '1.4rem', md: '1.8rem' },
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                기술 스택
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                startIcon={ <AddIcon /> }
                onClick={ () => setAddDialogOpen(true) }
                variant='outlined'
                size='small'
                sx={{
                  height: 40,
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                  px: 2,
                  '&:hover': {
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                    backgroundColor: 'rgba(240,78,35,0.04)',
                  },
                }}
              >
                스킬 추가
              </Button>
            </Box>
          </Box>

          {/* 카테고리별 그룹 */}
          { Object.entries(groupedSkills).map(([category, catSkills]) => (
            <Box key={ category } sx={{ mb: { xs: 5, md: 6 } }}>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  mb: 2.5,
                }}
              >
                { category }
              </Typography>
              <Grid container spacing={ 2 }>
                { catSkills.map((skill) => (
                  <Grid key={ skill.id } size={{ xs: 12, sm: 6, md: 4 }}>
                    <SkillCard skill={ skill } />
                  </Grid>
                )) }
              </Grid>
            </Box>
          )) }
        </Box>

        {/* 스킬 추가 다이얼로그 */}
        <AddSkillDialog
          open={ addDialogOpen }
          onClose={ () => setAddDialogOpen(false) }
          onAdd={ handleAddSkill }
        />

      </Container>
    </Box>
  );
}

export default AboutPage;
