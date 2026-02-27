import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fade from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
import { usePortfolio } from '../context/PortfolioContext';

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
const PhotoUploadArea = memo(function PhotoUploadArea({ photo, onPhotoChange }) {
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
        aria-label='프로필 사진 업로드'
        style={{ display: 'none' }}
        onChange={ onPhotoChange }
      />
    </Box>
  );
});

/**
 * SectionTabPanel 컴포넌트
 * 탭 패널 콘텐츠 — 내용 텍스트 + 인라인 편집
 *
 * Props:
 * @param {object} section - 섹션 데이터 객체 [Required]
 * @param {number} value - 현재 활성 탭 인덱스 [Required]
 * @param {number} index - 이 패널의 인덱스 [Required]
 * @param {function} onContentChange - (sectionId, newContent) 편집 저장 핸들러 [Required]
 *
 * Example usage:
 * <SectionTabPanel section={section} value={activeTab} index={0} onContentChange={fn} />
 */
function SectionTabPanel({ section, value, index, onContentChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(section.content);

  if (value !== index) return null;

  const handleSave = () => {
    onContentChange(section.id, draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(section.content);
    setIsEditing(false);
  };

  return (
    <Box
      role='tabpanel'
      aria-label={ `${section.title} 내용` }
      sx={{ pt: { xs: 3, md: 4 } }}
    >
      { isEditing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            value={ draft }
            onChange={ (e) => setDraft(e.target.value) }
            multiline
            rows={ 5 }
            fullWidth
            size='small'
            autoFocus
            aria-label={ `${section.title} 편집` }
            sx={{ '& .MuiOutlinedInput-root': { fontSize: '1rem', lineHeight: 2 } }}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size='small' onClick={ handleCancel } sx={{ color: 'var(--color-text-muted)' }}>
              취소
            </Button>
            <Button
              size='small'
              variant='contained'
              onClick={ handleSave }
              sx={{ backgroundColor: 'var(--color-primary)', fontWeight: 700 }}
            >
              저장
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Fade in key={ section.content }>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.05rem' },
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
                mb: 2,
              }}
            >
              { section.content }
            </Typography>
          </Fade>
        </Box>
      ) }
    </Box>
  );
}

/**
 * SkillCard 컴포넌트
 * 개별 스킬 카드 — 아이콘 배지 + 이름 + 카테고리
 *
 * Props:
 * @param {object} skill - 스킬 데이터 객체 [Required]
 *
 * Example usage:
 * <SkillCard skill={skill} />
 */
const SkillCard = memo(function SkillCard({ skill }) {
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
});

/**
 * AddSkillDialog 컴포넌트
 * 새 스킬 추가 다이얼로그 — 기술명 / 카테고리 / 설명
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
  const {
    aboutMeData: aboutData,
    setAboutMeData: setAboutData,
    updateSectionContent,
  } = usePortfolio();
  const [activeTab, setActiveTab] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const showSnackbar = useCallback((message) => {
    setSnackbar({ open: true, message });
  }, []);

  /** 프로필 사진 선택 → Supabase Storage 업로드 */
  const handlePhotoChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { error } = await supabase.storage
      .from('portfolio-profile')
      .upload('profile', file, { upsert: true });

    if (error) {
      showSnackbar('사진 업로드에 실패했습니다.');
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-profile')
      .getPublicUrl('profile');

    const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;
    setAboutData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, photo: urlWithTimestamp },
    }));
    showSnackbar('프로필 사진이 업데이트되었습니다.');
  }, [setAboutData, showSnackbar]);

  /** 새 스킬 추가 */
  const handleAddSkill = useCallback((newSkill) => {
    setAboutData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    showSnackbar('새 스킬이 추가되었습니다. 홈 탭에 반영됩니다.');
  }, [setAboutData, showSnackbar]);

  /** 섹션 내용 저장 */
  const handleSectionContentChange = useCallback((sectionId, newContent) => {
    updateSectionContent(sectionId, newContent);
    showSnackbar('내용이 저장되었습니다. 홈 탭에 반영됩니다.');
  }, [updateSectionContent, showSnackbar]);

  const location = useLocation();

  /** scrollTo state가 있으면 해당 섹션으로 스크롤 */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const { basicInfo, sections, skills } = aboutData;

  /** 카테고리별 그룹핑 — skills 변경 시에만 재계산 */
  const groupedSkills = useMemo(() => CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {}), [skills]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto' }}>

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
                    backgroundColor: 'rgba(255,0,0,0.08)',
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(255,0,0,0.2)',
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
              { sections.map((section, i) => (
                <Tab
                  key={ section.id }
                  label={ section.title }
                  id={ `tab-${section.id}` }
                  aria-controls={ `tabpanel-${section.id}` }
                  aria-selected={ activeTab === i }
                />
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
                onContentChange={ handleSectionContentChange }
              />
            )) }
          </Box>
        </Box>

        {/* ── 기술 스택 섹션 ── */}
        <Box id='tech-stack'>
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

      {/* 저장 피드백 스낵바 */}
      <Snackbar
        open={ snackbar.open }
        autoHideDuration={ 2500 }
        onClose={ () => setSnackbar((p) => ({ ...p, open: false })) }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={ () => setSnackbar((p) => ({ ...p, open: false })) }
          severity='success'
          variant='filled'
          sx={{ fontSize: '0.85rem' }}
        >
          { snackbar.message }
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AboutPage;
