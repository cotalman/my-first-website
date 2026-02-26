import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import HeroSection from './components/landing/hero-section';
import AboutMeSection from './components/landing/about-me-section';
import ProjectsSection from './components/landing/projects-section';
import ContactSection from './components/landing/contact-section';
import ButtonSection from './components/ui/button-section';
import InputSection from './components/ui/input-section';
import NavigationSection from './components/ui/navigation-section';
import DropdownSection from './components/ui/dropdown-section';
import CheckboxSection from './components/ui/checkbox-section';
import RadioSection from './components/ui/radio-section';
import SliderSection from './components/ui/slider-section';
import ModalSection from './components/ui/modal-section';
import CardSection from './components/ui/card-section';
import DragDropSection from './components/ui/drag-drop-section';
import ScrollSection from './components/ui/scroll-section';
import AnimationSection from './components/ui/animation-section';
import MenuSection from './components/ui/menu-section';
import SidebarSection from './components/ui/sidebar-section';
import HoverSection from './components/ui/hover-section';
import SwipeSection from './components/ui/swipe-section';

function App() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationSection />
      <HeroSection />
      <AboutMeSection />
      <ProjectsSection />
      <ContactSection />
      <Container maxWidth={false} sx={{ maxWidth: '1600px', mx: 'auto', py: 4 }}>
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
  );
}

export default App;
