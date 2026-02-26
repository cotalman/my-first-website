import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

/**
 * 전역 헤더 컴포넌트
 *
 * Props: 없음 (useAuth 훅으로 상태 관리)
 *
 * Example usage:
 * <Header />
 */
function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        {/* 로고 */}
        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1 }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            🌿 ZERO LIFE
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: 'text.secondary',
              display: { xs: 'none', sm: 'block' },
              fontWeight: 500,
            }}
          >
            제로한 하루
          </Typography>
        </Box>

        {/* 인증 버튼 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <>
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => navigate('/posts/new')}
                disableElevation
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                글쓰기
              </Button>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                onClick={handleSignOut}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => navigate('/signup')}
              >
                회원가입
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
