import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const NAV_ITEMS = [
  { id: 'home', label: '홈', icon: HomeIcon },
  {
    id: 'about',
    label: '소개',
    icon: InfoIcon,
    children: [
      { id: 'greeting', label: '인사말' },
      { id: 'directions', label: '오시는 길' },
    ],
  },
  {
    id: 'services',
    label: '서비스',
    icon: BuildIcon,
    children: [
      { id: 'presentation', label: 'Presentation' },
      { id: 'print', label: 'Print' },
    ],
  },
  { id: 'blog', label: '블로그', icon: ArticleIcon },
  { id: 'contact', label: '연락처', icon: ContactMailIcon },
];

/**
 * SidebarSection 컴포넌트
 * MUI Drawer 기반 좌/우 위치 선택 가능한 사이드바 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <SidebarSection />
 */
function SidebarSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState('left');
  const [selected, setSelected] = useState('');
  const [openSubmenu, setOpenSubmenu] = useState('');

  const handleAnchorChange = (event, newAnchor) => {
    if (newAnchor !== null) {
      setAnchor(newAnchor);
    }
  };

  const handleNavClick = (item) => {
    if (item.children) {
      setOpenSubmenu(openSubmenu === item.id ? '' : item.id);
      return;
    }
    setSelected(item.label);
    setIsOpen(false);
  };

  const handleSubNavClick = (subItem) => {
    setSelected(subItem.label);
    setIsOpen(false);
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
        Sidebar
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ToggleButtonGroup
              value={anchor}
              exclusive
              onChange={handleAnchorChange}
              size="small"
            >
              <ToggleButton value="left">
                <ChevronRightIcon sx={{ mr: 0.5 }} />
                왼쪽
              </ToggleButton>
              <ToggleButton value="right">
                오른쪽
                <ChevronLeftIcon sx={{ ml: 0.5 }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              사이드바 열기 ({anchor === 'left' ? '왼쪽' : '오른쪽'})
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box sx={{ width: 260 }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              내비게이션
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {NAV_ITEMS.map((item) => {
              const { id, label, icon: Icon, children } = item;
              return (
                <Box key={id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selected === label}
                      onClick={() => handleNavClick(item)}
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                      {children && (openSubmenu === id ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>
                  {children && (
                    <Collapse in={openSubmenu === id} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {children.map((subItem) => (
                          <ListItem key={subItem.id} disablePadding>
                            <ListItemButton
                              sx={{ pl: 7 }}
                              selected={selected === subItem.label}
                              onClick={() => handleSubNavClick(subItem)}
                            >
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </List>
        </Box>
      </Drawer>

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
          : '사이드바에서 메뉴를 선택해주세요'}
      </Typography>
    </Box>
  );
}

export default SidebarSection;
