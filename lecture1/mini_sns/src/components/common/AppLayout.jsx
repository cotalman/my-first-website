import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

/**
 * AppLayout 컴포넌트 - 앱 전체 레이아웃 (하단 네비게이션 + FAB 포함)
 *
 * Example usage:
 * <AppLayout />
 */
function AppLayout() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      {/* 컨텐츠 영역 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          minHeight: '100vh',
          backgroundColor: 'background.paper',
          position: 'relative',
          pb: '72px',
        }}
      >
        <Outlet />
      </Box>

      {/* 플로팅 작성 버튼 */}
      <Fab
        color='primary'
        aria-label='게시물 작성'
        onClick={() => navigate('/posts/create')}
        sx={{
          position: 'fixed',
          bottom: 72,
          left: '50%',
          transform: 'translateX(calc(-50% + 160px))',
          boxShadow: '0 4px 16px rgba(46,211,183,0.4)',
          zIndex: 1001,
        }}
      >
        <AddRoundedIcon />
      </Fab>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </Box>
  );
}

export default AppLayout;
