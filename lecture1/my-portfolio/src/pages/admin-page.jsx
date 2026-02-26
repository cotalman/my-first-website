import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabase-client';

/**
 * AdminPage 컴포넌트
 * 프로젝트 썸네일 이미지 관리 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <AdminPage />
 */
function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({});
  const [success, setSuccess] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, thumbnail_url, sort_order')
        .order('sort_order', { ascending: true });

      if (!error) setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  /** 이미지 업로드 후 thumbnail_url 업데이트 */
  const handleUpload = async (projectId, file) => {
    if (!file) return;

    setUploading((prev) => ({ ...prev, [projectId]: true }));
    setSuccess((prev) => ({ ...prev, [projectId]: false }));

    const ext = file.name.split('.').pop();
    const filePath = `${projectId}_${Date.now()}.${ext}`;

    // Storage 업로드
    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('업로드 실패: ' + uploadError.message);
      setUploading((prev) => ({ ...prev, [projectId]: false }));
      return;
    }

    // 공개 URL 조회
    const { data: urlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // projects 테이블 thumbnail_url 업데이트
    const { error: updateError } = await supabase
      .from('projects')
      .update({ thumbnail_url: publicUrl })
      .eq('id', projectId);

    if (updateError) {
      alert('DB 업데이트 실패: ' + updateError.message);
    } else {
      setProjects((prev) =>
        prev.map((p) => p.id === projectId ? { ...p, thumbnail_url: publicUrl } : p)
      );
      setSuccess((prev) => ({ ...prev, [projectId]: true }));
      setTimeout(() => setSuccess((prev) => ({ ...prev, [projectId]: false })), 2500);
    }

    setUploading((prev) => ({ ...prev, [projectId]: false }));
  };

  /** 썸네일 삭제 */
  const handleRemove = async (projectId) => {
    const { error } = await supabase
      .from('projects')
      .update({ thumbnail_url: null })
      .eq('id', projectId);

    if (!error) {
      setProjects((prev) =>
        prev.map((p) => p.id === projectId ? { ...p, thumbnail_url: null } : p)
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto' }}>

        {/* 헤더 */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              fontWeight: 600,
              color: 'var(--color-primary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Admin
          </Typography>
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              mb: 1,
            }}
          >
            프로젝트 이미지 관리
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
            각 프로젝트의 썸네일 이미지를 등록하거나 변경할 수 있습니다. (JPG, PNG, WebP, GIF · 최대 5MB)
          </Typography>
        </Box>

        {/* 프로젝트 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          { projects.map((project) => (
            <ProjectImageRow
              key={ project.id }
              project={ project }
              isUploading={ !!uploading[project.id] }
              isSuccess={ !!success[project.id] }
              onUpload={ (file) => handleUpload(project.id, file) }
              onRemove={ () => handleRemove(project.id) }
            />
          )) }
        </Box>

      </Container>
    </Box>
  );
}

/**
 * ProjectImageRow 컴포넌트
 * 프로젝트 한 줄: 썸네일 미리보기 + 제목 + 업로드/삭제 버튼
 *
 * @param {object} project - 프로젝트 데이터 [Required]
 * @param {boolean} isUploading - 업로드 진행 중 여부 [Optional, 기본값: false]
 * @param {boolean} isSuccess - 업로드 성공 여부 [Optional, 기본값: false]
 * @param {function} onUpload - 파일 선택 시 호출 함수 [Required]
 * @param {function} onRemove - 이미지 삭제 시 호출 함수 [Required]
 *
 * Example usage:
 * <ProjectImageRow project={p} onUpload={fn} onRemove={fn} />
 */
function ProjectImageRow({ project, isUploading, isSuccess, onUpload, onRemove }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = '';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: { xs: 2, md: 3 },
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* 썸네일 미리보기 */}
      <Box
        sx={{
          width: { xs: 80, md: 120 },
          height: { xs: 80, md: 120 },
          borderRadius: 1.5,
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: 'var(--color-bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--color-border)',
        }}
      >
        { project.thumbnail_url ? (
          <Box
            component='img'
            src={ project.thumbnail_url }
            alt={ project.title }
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <AddPhotoAlternateIcon sx={{ fontSize: '2rem', color: 'var(--color-text-muted)', opacity: 0.4 }} />
        ) }
      </Box>

      {/* 제목 */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          { project.title }
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          { project.thumbnail_url ? '이미지 등록됨' : '이미지 없음' }
        </Typography>
      </Box>

      {/* 액션 버튼 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>

        {/* 업로드 성공 표시 */}
        { isSuccess && (
          <CheckCircleIcon sx={{ color: '#22c55e', fontSize: '1.4rem' }} />
        ) }

        {/* 업로드 버튼 */}
        <input
          ref={ inputRef }
          type='file'
          accept='image/jpeg,image/png,image/webp,image/gif'
          style={{ display: 'none' }}
          onChange={ handleFileChange }
        />
        <Tooltip title='이미지 업로드'>
          <span>
            <IconButton
              onClick={ () => inputRef.current?.click() }
              disabled={ isUploading }
              sx={{
                border: '1px solid var(--color-primary)',
                borderRadius: 1.5,
                color: 'var(--color-primary)',
                minWidth: 44,
                minHeight: 44,
                '&:hover': { backgroundColor: 'rgba(255,0,0,0.05)' },
                '&:disabled': { opacity: 0.5 },
              }}
            >
              { isUploading
                ? <CircularProgress size={ 18 } sx={{ color: 'var(--color-primary)' }} />
                : <AddPhotoAlternateIcon sx={{ fontSize: '1.2rem' }} />
              }
            </IconButton>
          </span>
        </Tooltip>

        {/* 삭제 버튼 */}
        { project.thumbnail_url && (
          <Tooltip title='이미지 삭제'>
            <IconButton
              onClick={ onRemove }
              sx={{
                border: '1px solid var(--color-border)',
                borderRadius: 1.5,
                color: 'var(--color-text-muted)',
                minWidth: 44,
                minHeight: 44,
                '&:hover': { color: '#ef4444', borderColor: '#ef4444' },
              }}
            >
              <DeleteIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Tooltip>
        ) }
      </Box>
    </Box>
  );
}

export default AdminPage;
