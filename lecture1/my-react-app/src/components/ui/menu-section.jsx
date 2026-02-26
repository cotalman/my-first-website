import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MENU_ITEMS = [
  { id: 'home', label: '홈', icon: HomeIcon },
  { id: 'profile', label: '프로필', icon: PersonIcon },
  { id: 'bookmark', label: '북마크', icon: BookmarkIcon },
  { id: 'settings', label: '설정', icon: SettingsIcon },
  { id: 'help', label: '도움말', icon: HelpIcon },
  { id: 'logout', label: '로그아웃', icon: LogoutIcon },
];

/**
 * MenuSection 컴포넌트
 * MUI Menu 기반 아이콘 포함 드롭다운 메뉴 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <MenuSection />
 */
function MenuSection() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState('');
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item) => {
    setSelected(item.label);
    handleClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: 'center',
        }}
      >
        Menu
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleOpen}
          endIcon={<KeyboardArrowDownIcon />}
        >
          메뉴 열기
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
        >
          {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
            <MenuItem key={id} onClick={() => handleSelect({ id, label })}>
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        {selected
          ? `선택된 메뉴: ${selected}`
          : '메뉴를 선택해주세요'}
      </Typography>
    </Box>
  );
}

export default MenuSection;
