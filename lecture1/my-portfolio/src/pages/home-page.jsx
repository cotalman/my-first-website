import AboutSection from '../components/landing/about-section';
import ContactSection from '../components/landing/contact-section';
import HeroSection from '../components/landing/hero-section';
import ProjectsSection from '../components/landing/projects-section';
import SkillSection from '../components/landing/skill-section';

/**
 * HomePage 컴포넌트
 * 5개 섹션으로 구성된 메인 홈 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
