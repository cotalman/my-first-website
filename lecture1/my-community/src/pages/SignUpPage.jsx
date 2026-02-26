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
import { useAuth } from '../hooks/use-auth';

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    const { error: signUpError } = await signUp(email, password, name, phoneNumber);

    if (signUpError) {
      setError(signUpError.message || '회원가입에 실패했습니다.');
    } else {
      setSuccess('가입 완료! 이메일 인증 후 로그인해 주세요. (인증 메일을 확인해 주세요.)');
      setTimeout(() => navigate('/login'), 3000);
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
            제로한 하루 · 건강한 선택 커뮤니티
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h4' sx={{ mb: 3, textAlign: 'center', color: 'text.primary' }}>
              회원가입
            </Typography>

            {error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert>}
            {success && <Alert severity='success' sx={{ mb: 2 }}>{ success }</Alert>}

            <Box component='form' onSubmit={handleSignUp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label='이름'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                autoComplete='name'
              />
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
                label='비밀번호 (6자 이상)'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete='new-password'
              />
              <TextField
                label='전화번호 (선택)'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                placeholder='010-0000-0000'
                autoComplete='tel'
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
                fullWidth
                disabled={isLoading}
                sx={{ mt: 1, py: 1.5 }}
              >
                { isLoading ? '가입 중...' : '회원가입' }
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant='text'
                color='primary'
                onClick={() => navigate('/login')}
              >
                이미 계정이 있으신가요? 로그인
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SignUpPage;
