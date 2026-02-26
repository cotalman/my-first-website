import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError('비밀번호 변경에 실패했습니다. 링크가 만료됐을 수 있습니다.');
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #F0FDFC 0%, #CCFBF1 100%)',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='sm'>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant='h2'
            sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}
          >
            🌿 ZERO LIFE
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            비밀번호 재설정
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h5' sx={{ mb: 3, textAlign: 'center', color: 'text.primary' }}>
              새 비밀번호 설정
            </Typography>

            {success ? (
              <Alert severity='success'>
                비밀번호가 변경됐습니다. 잠시 후 메인 화면으로 이동합니다.
              </Alert>
            ) : (
              <>
                {error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert>}

                <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label='새 비밀번호 (6자 이상)'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    autoFocus
                    autoComplete='new-password'
                  />
                  <TextField
                    label='비밀번호 확인'
                    type='password'
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    fullWidth
                    autoComplete='new-password'
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    size='large'
                    fullWidth
                    disableElevation
                    disabled={isLoading}
                    sx={{ mt: 1, py: 1.5 }}
                  >
                    { isLoading ? '변경 중...' : '비밀번호 변경' }
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ResetPasswordPage;
