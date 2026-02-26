import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import darkTheme from '../dark-theme';
import ButtonSection from '../components/ui/button-section';
import InputSection from '../components/ui/input-section';
import NavigationSection from '../components/ui/navigation-section';
import DropdownSection from '../components/ui/dropdown-section';
import CheckboxSection from '../components/ui/checkbox-section';
import RadioSection from '../components/ui/radio-section';
import SliderSection from '../components/ui/slider-section';
import ModalSection from '../components/ui/modal-section';
import CardSection from '../components/ui/card-section';
import DragDropSection from '../components/ui/drag-drop-section';
import ScrollSection from '../components/ui/scroll-section';
import AnimationSection from '../components/ui/animation-section';
import MenuSection from '../components/ui/menu-section';
import SidebarSection from '../components/ui/sidebar-section';
import HoverSection from '../components/ui/hover-section';
import SwipeSection from '../components/ui/swipe-section';

/**
 * DarkPage 컴포넌트
 * 다크모드 테마가 적용된 UI Components Gallery 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <DarkPage />
 */
function DarkPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Container maxWidth="lg">
              <Typography variant="h3" sx={{ fontWeight: 600 }}>UI Components Gallery</Typography>
              <Typography variant="subtitle1">16개의 UI 요소를 섹션별로 확인할 수 있습니다 (Dark Mode)</Typography>
            </Container>
          </Box>
          <NavigationSection />
          <Box sx={{ my: 4 }} />
          <ButtonSection />
          <Box sx={{ my: 4 }} />
          <InputSection />
          <Box sx={{ my: 4 }} />
          <DropdownSection />
          <Box sx={{ my: 4 }} />
          <CheckboxSection />
          <Box sx={{ my: 4 }} />
          <RadioSection />
          <Box sx={{ my: 4 }} />
          <SliderSection />
          <Box sx={{ my: 4 }} />
          <ModalSection />
          <Box sx={{ my: 4 }} />
          <CardSection />
          <Box sx={{ my: 4 }} />
          <DragDropSection />
          <Box sx={{ my: 4 }} />
          <ScrollSection />
          <Box sx={{ my: 4 }} />
          <AnimationSection />
          <Box sx={{ my: 4 }} />
          <MenuSection />
          <Box sx={{ my: 4 }} />
          <SidebarSection />
          <Box sx={{ my: 4 }} />
          <HoverSection />
          <Box sx={{ my: 4 }} />
          <SwipeSection />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default DarkPage;
