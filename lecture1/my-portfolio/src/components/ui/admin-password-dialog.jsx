import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_PASSWORD = '1357';

/**
 * AdminPasswordDialog 컴포넌트
 * 관리자 인증 비밀번호 확인 다이얼로그
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 다이얼로그 닫기 핸들러 [Required]
 * @param {function} onSuccess - 인증 성공 시 실행할 콜백 [Optional, 기본값: /admin 페이지로 이동]
 *
 * Example usage:
 * <AdminPasswordDialog isOpen={open} onClose={() => setOpen(false)} />
 * <AdminPasswordDialog isOpen={open} onClose={() => setOpen(false)} onSuccess={() => setIsAuth(true)} />
 */
function AdminPasswordDialog({ isOpen, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setPassword('');
    setIsError(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      handleClose();
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/admin');
      }
    } else {
      setIsError(true);
      setPassword('');
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    if (isError) setIsError(false);
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ handleClose }
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 360,
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LockOutlinedIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Typography variant='h6' sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
            관리자 인증
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box component='form' onSubmit={ handleSubmit } sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            type='password'
            placeholder='비밀번호를 입력하세요'
            value={ password }
            onChange={ handleChange }
            autoFocus
            fullWidth
            size='small'
            error={ isError }
            helperText={ isError ? '비밀번호가 올바르지 않습니다.' : ' ' }
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 1.5 },
            }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant='outlined'
              onClick={ handleClose }
              sx={{ borderRadius: 1.5, fontWeight: 500 }}
            >
              취소
            </Button>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{ borderRadius: 1.5, fontWeight: 600 }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AdminPasswordDialog;
