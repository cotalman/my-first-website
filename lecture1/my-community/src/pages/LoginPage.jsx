import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { supabase } from '../utils/supabase-client';

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      navigate('/');
    }
    setIsLoading(false);
  };

  const handleResetOpen = () => {
    setResetEmail(email);
    setResetStatus('');
    setResetDialogOpen(true);
  };

  const handleResetClose = () => {
    setResetDialogOpen(false);
    setResetStatus('');
    setResetEmail('');
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) return;
    setIsSending(true);
    setResetStatus('');

    const redirectTo = window.location.href.split('#')[0];
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      resetEmail.trim(),
      { redirectTo }
    );

    if (resetError) {
      setResetStatus('error');
    } else {
      setResetStatus('success');
    }
    setIsSending(false);
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
        {/* 로고 영역 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant='h2'
            sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}
          >
            🌿 ZERO LIFE
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            제로한 하루 · 건강한 선택 커뮤니티
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h4' sx={{ mb: 3, textAlign: 'center', color: 'text.primary' }}>
              로그인
            </Typography>

            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                { error }
              </Alert>
            )}

            <Box component='form' onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label='이메일'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete='email'
              />
              <TextField
                label='비밀번호'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete='current-password'
              />
              <Box sx={{ textAlign: 'right', mt: -1 }}>
                <Button
                  variant='text'
                  size='small'
                  onClick={handleResetOpen}
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  비밀번호를 잊으셨나요?
                </Button>
              </Box>
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
                { isLoading ? '로그인 중...' : '로그인' }
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                아직 계정이 없으신가요?
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                onClick={() => navigate('/signup')}
              >
                회원가입
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>

      {/* 비밀번호 찾기 다이얼로그 */}
      <Dialog open={resetDialogOpen} onClose={handleResetClose} maxWidth='xs' fullWidth>
        <DialogTitle>비밀번호 찾기</DialogTitle>
        <DialogContent>
          {resetStatus === 'success' ? (
            <Alert severity='success' sx={{ mt: 1 }}>
              재설정 메일을 발송했습니다. 이메일을 확인해 주세요.
            </Alert>
          ) : (
            <>
              {resetStatus === 'error' && (
                <Alert severity='error' sx={{ mb: 2, mt: 1 }}>
                  메일 발송에 실패했습니다. 이메일을 확인해 주세요.
                </Alert>
              )}
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2, mt: 1 }}>
                가입한 이메일 주소를 입력하시면 비밀번호 재설정 링크를 보내드립니다.
              </Typography>
              <TextField
                label='이메일'
                type='email'
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                fullWidth
                autoFocus
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetClose}>닫기</Button>
          {resetStatus !== 'success' && (
            <Button
              onClick={handleResetPassword}
              variant='contained'
              disableElevation
              disabled={isSending || !resetEmail.trim()}
            >
              { isSending ? '발송 중...' : '재설정 메일 발송' }
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;
