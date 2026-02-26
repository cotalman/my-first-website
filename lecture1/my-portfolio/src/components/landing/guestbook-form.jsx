import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { supabase } from '../../utils/supabase-client';

const INITIAL_FORM = {
  name: '',
  message: '',
  email: '',
  sns_account: '',
};

const AVATAR_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];
const getAvatarColor = (name = '') => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼 (프로필 이미지 업로드 포함)
 *
 * Props:
 * @param {function} onSubmitSuccess - 제출 성공 시 목록 갱신 콜백 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmitSuccess={handleRefresh} />
 */
function GuestbookForm({ onSubmitSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /** 프로필 이미지 파일 선택 */
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  /** 이미지 제거 */
  const handleImageRemove = () => {
    setProfileImage(null);
    setProfilePreview(null);
  };

  /** 이미지 업로드 후 URL 반환 */
  const uploadProfileImage = async () => {
    if (!profileImage) return null;
    setImageUploading(true);
    const ext = profileImage.name.split('.').pop();
    const filePath = `avatar_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('guestbook-avatars')
      .upload(filePath, profileImage, { upsert: true });
    setImageUploading(false);
    if (error) return null;
    const { data } = supabase.storage.from('guestbook-avatars').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setLoading(true);
    const profileImageUrl = await uploadProfileImage();

    const { error } = await supabase.from('guestbook').insert([
      {
        name: form.name.trim(),
        message: form.message.trim(),
        email: form.email.trim() || null,
        sns_account: form.sns_account.trim() || null,
        profile_image_url: profileImageUrl,
      },
    ]);
    setLoading(false);

    if (error) {
      setSnackbar({ open: true, message: '등록에 실패했습니다. 다시 시도해주세요.', severity: 'error' });
    } else {
      setForm(INITIAL_FORM);
      setProfileImage(null);
      setProfilePreview(null);
      setSnackbar({ open: true, message: '방명록이 등록되었습니다! 감사합니다.', severity: 'success' });
      onSubmitSuccess();
    }
  };

  const avatarColor = getAvatarColor(form.name);
  const initial = (form.name || '?').charAt(0).toUpperCase();
  const isSubmitting = loading || imageUploading;

  return (
    <Box
      component='form'
      onSubmit={ handleSubmit }
      sx={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
        p: { xs: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem' },
          fontWeight: 600,
          color: '#FFFFFF',
          mb: 3,
        }}
      >
        방명록 작성
      </Typography>

      {/* 프로필 이미지 + 이름 한 줄 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 2.5 }}>

        {/* 프로필 이미지 업로드 버튼 */}
        <Tooltip title={ profilePreview ? '이미지 변경' : '프로필 이미지 추가' }>
          <Box
            onClick={ () => fileInputRef.current?.click() }
            sx={{
              position: 'relative',
              width: 64,
              height: 64,
              borderRadius: '50%',
              flexShrink: 0,
              cursor: 'pointer',
              backgroundColor: profilePreview ? 'transparent' : 'var(--color-secondary)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s, opacity 0.2s',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.6)',
                '& .overlay': { opacity: 1 },
              },
            }}
          >
            { profilePreview ? (
              <Box
                component='img'
                src={ profilePreview }
                alt='프로필 미리보기'
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', userSelect: 'none' }}>
                { form.name ? initial : <AddPhotoAlternateIcon sx={{ fontSize: '1.6rem', opacity: 0.7 }} /> }
              </Typography>
            ) }

            {/* 호버 오버레이 */}
            <Box
              className='overlay'
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: '1.3rem', color: '#fff' }} />
            </Box>
          </Box>
        </Tooltip>
        <input
          ref={ fileInputRef }
          type='file'
          accept='image/jpeg,image/png,image/webp,image/gif'
          style={{ display: 'none' }}
          onChange={ handleImageSelect }
        />

        {/* 이름 필드 */}
        <Box sx={{ flex: 1 }}>
          <TextField
            required
            fullWidth
            name='name'
            label='이름 *'
            value={ form.name }
            onChange={ handleChange }
            inputProps={{ maxLength: 20 }}
            sx={ inputSx }
          />
          { profilePreview && (
            <Typography
              onClick={ handleImageRemove }
              sx={{
                mt: 0.5,
                fontSize: '0.72rem',
                color: 'rgba(255,100,100,0.7)',
                cursor: 'pointer',
                '&:hover': { color: 'rgba(255,100,100,1)' },
              }}
            >
              이미지 제거
            </Typography>
          ) }
        </Box>
      </Box>

      <Grid container spacing={ 2 }>
        {/* 메시지 */}
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            multiline
            rows={ 3 }
            name='message'
            label='메시지 *'
            value={ form.message }
            onChange={ handleChange }
            inputProps={{ maxLength: 300 }}
            sx={ inputSx }
          />
        </Grid>

        {/* 이메일 */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            name='email'
            label='이메일 (선택, 비공개)'
            type='email'
            value={ form.email }
            onChange={ handleChange }
            sx={ inputSx }
          />
        </Grid>

        {/* SNS */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            name='sns_account'
            label='SNS 계정 (선택)'
            placeholder='예: @username'
            value={ form.sns_account }
            onChange={ handleChange }
            inputProps={{ maxLength: 50 }}
            sx={ inputSx }
          />
        </Grid>

        {/* 제출 버튼 */}
        <Grid size={{ xs: 12 }}>
          <Button
            type='submit'
            variant='contained'
            disabled={ isSubmitting || !form.name.trim() || !form.message.trim() }
            endIcon={ isSubmitting ? <CircularProgress size={ 16 } color='inherit' /> : <SendIcon /> }
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
              px: 4,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            { isSubmitting ? '등록 중...' : '방명록 남기기' }
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={ snackbar.open }
        autoHideDuration={ 4000 }
        onClose={ () => setSnackbar((s) => ({ ...s, open: false })) }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={ snackbar.severity } variant='filled' sx={{ width: '100%' }}>
          { snackbar.message }
        </Alert>
      </Snackbar>
    </Box>
  );
}

/** 다크 배경용 TextField sx 스타일 */
const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#FFFFFF',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.55)',
    '&.Mui-focused': { color: 'var(--color-primary)' },
  },
};

export default GuestbookForm;
