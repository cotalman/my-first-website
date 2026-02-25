import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { supabase } from '../../utils/supabase-client';

const INITIAL_FORM = {
  name: '',
  message: '',
  email: '',
  sns_account: '',
};

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('guestbook').insert([
      {
        name: form.name.trim(),
        message: form.message.trim(),
        email: form.email.trim() || null,
        sns_account: form.sns_account.trim() || null,
      },
    ]);
    setLoading(false);

    if (error) {
      setSnackbar({ open: true, message: '등록에 실패했습니다. 다시 시도해주세요.', severity: 'error' });
    } else {
      setForm(INITIAL_FORM);
      setSnackbar({ open: true, message: '방명록이 등록되었습니다! 감사합니다 😊', severity: 'success' });
      onSubmitSuccess();
    }
  };

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

      <Grid container spacing={ 2 }>
        {/* 이름 (필수) */}
        <Grid size={{ xs: 12, md: 6 }}>
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
        </Grid>

        {/* 메시지 (필수) */}
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
            disabled={ loading || !form.name.trim() || !form.message.trim() }
            endIcon={ loading ? <CircularProgress size={ 16 } color='inherit' /> : <SendIcon /> }
            sx={{
              backgroundColor: 'var(--color-primary)',
              '&:hover': { backgroundColor: 'var(--color-primary-dark)' },
              px: 4,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            { loading ? '등록 중...' : '방명록 남기기' }
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
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiMenuItem-root': { color: '#1A1A1A' },
};

export default GuestbookForm;
