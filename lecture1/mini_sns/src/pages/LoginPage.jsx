import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * LoginPage 컴포넌트 - 로그인 / 회원가입 페이지
 *
 * Example usage:
 * <LoginPage />
 */
function LoginPage() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) { setError('이메일과 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message === 'Invalid login credentials' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) { setError('모든 필드를 입력해주세요.'); return; }
    if (password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return; }
    setLoading(true);
    setError('');
    try {
      await signUp(email, password, username, displayName || username);
      setSuccessMsg('회원가입이 완료되었습니다! 이메일을 확인하거나 바로 로그인하세요.');
      setTab(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F0FDF9 0%, #E0FBF5 50%, #D1F5EF 100%)',
      }}
    >
      <Container maxWidth='sm' sx={{ px: 3 }}>
        {/* 로고 영역 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2ED3B7, #1BA88C)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: '0 8px 24px rgba(46,211,183,0.3)',
              fontSize: 36,
            }}
          >
            🥤
          </Box>
          <Typography variant='h5' sx={{ fontWeight: 800, color: '#1BA88C', letterSpacing: -0.5 }}>
            ZERO LIFE
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mt: 0.5 }}>
            제로한 하루 🌿
          </Typography>
        </Box>

        {/* 탭 */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={tab}
            onChange={(_e, v) => { setTab(v); setError(''); setSuccessMsg(''); }}
            variant='fullWidth'
            sx={{
              '& .MuiTab-root': { fontWeight: 700, py: 2 },
              '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
              borderBottom: '1px solid',
              borderColor: 'grey.100',
            }}
          >
            <Tab label='로그인' />
            <Tab label='회원가입' />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {error && <Alert severity='error' sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            {successMsg && <Alert severity='success' sx={{ mb: 2, borderRadius: 2 }}>{successMsg}</Alert>}

            {/* 로그인 폼 */}
            {tab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label='이메일'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant='outlined'
                  size='medium'
                />
                <TextField
                  label='비밀번호'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  variant='outlined'
                  size='medium'
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button
                  variant='contained'
                  size='large'
                  fullWidth
                  onClick={handleLogin}
                  disabled={loading}
                  sx={{ py: 1.5, fontSize: '1rem' }}
                >
                  {loading ? <CircularProgress size={24} color='inherit' /> : '로그인'}
                </Button>
                <Divider sx={{ my: 1 }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>SNS 로그인</Typography>
                </Divider>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['카카오', '네이버', '구글'].map((sns) => (
                    <Button
                      key={sns}
                      variant='outlined'
                      fullWidth
                      sx={{
                        py: 1.2,
                        borderColor: 'grey.300',
                        color: 'text.secondary',
                        fontSize: '0.8rem',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                      disabled
                    >
                      {sns}
                    </Button>
                  ))}
                </Box>
                <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.78rem' }}>
                  SNS 로그인은 준비 중입니다
                </Typography>
              </Box>
            )}

            {/* 회원가입 폼 */}
            {tab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label='아이디 (@username)'
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                  fullWidth
                  helperText='영문, 숫자, 밑줄(_) 사용 가능'
                />
                <TextField
                  label='표시 이름 (선택)'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  fullWidth
                  helperText='프로필에 보여지는 이름'
                />
                <TextField
                  label='이메일'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label='비밀번호 (6자 이상)'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <Button
                  variant='contained'
                  size='large'
                  fullWidth
                  onClick={handleSignUp}
                  disabled={loading}
                  sx={{ py: 1.5, fontSize: '1rem' }}
                >
                  {loading ? <CircularProgress size={24} color='inherit' /> : '가입하기'}
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Typography sx={{ textAlign: 'center', mt: 3, color: 'text.secondary', fontSize: '0.78rem' }}>
          제로칼로리·저당 식품 리뷰 커뮤니티 💚
        </Typography>
      </Container>
    </Box>
  );
}

export default LoginPage;
