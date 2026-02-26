import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * BottomNav 컴포넌트 - 하단 탭 네비게이션
 *
 * Example usage:
 * <BottomNav />
 */
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/posts', '/ranking', '/my'];
  const currentIndex = routes.indexOf(location.pathname);
  const value = currentIndex >= 0 ? currentIndex : 0;

  const handleChange = (_event, newValue) => {
    navigate(routes[newValue]);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 480,
        zIndex: 1000,
        borderTop: '1px solid',
        borderColor: 'grey.200',
      }}
      elevation={0}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'unset',
            color: 'text.secondary',
          },
          '& .Mui-selected': {
            color: 'primary.main',
          },
        }}
      >
        <BottomNavigationAction label='홈' icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label='게시물' icon={<ArticleRoundedIcon />} />
        <BottomNavigationAction label='랭킹' icon={<LeaderboardRoundedIcon />} />
        <BottomNavigationAction label='마이' icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
