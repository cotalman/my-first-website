import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const PortfolioContext = createContext();

const INITIAL_ABOUT_DATA = {
  basicInfo: {
    name: '이효진',
    education: '',
    major: 'IT계열',
    experience: '프론트엔드 개발 학습 중',
    photo: localStorage.getItem('portfolio_photo') || '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '웹디자이너로 다양한 프로젝트를 진행하며 많은 웹사이트를 제작해왔습니다. 처음에는 디자인 결과물을 만드는 것에 집중했지만, 점점 "이 화면이 어떻게 구현될까?"라는 궁금증이 생기기 시작했습니다. HTML과 CSS를 직접 다루며 마크업 구조를 이해하게 되었고, 자연스럽게 JavaScript와 React까지 관심이 확장되었습니다. 지금은 단순히 예쁜 화면을 만드는 것을 넘어, 구조적으로 안정적이고 유지보수가 쉬운 UI를 설계하는 프론트엔드 개발자로 성장하는 과정에 있습니다. 디자인과 개발을 모두 이해하는 사람이 되는 것이 저의 목표입니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '오랜 실무 경험을 통해, 결과물보다 더 중요한 것은 "유지보수와 협업"이라는 것을 배웠습니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '새로운 기술을 배우는 것을 즐깁니다. 최근에는 AI 기반 개발 도구와 생산성 향상 툴에 많은 관심을 가지고 있습니다. 일과 삶의 균형을 중요하게 생각하며, 항상 한 단계 더 발전한 내일의 저를 만들기 위해 노력하고 있습니다.',
      showInHome: false,
    },
  ],
  skills: [
    { id: 1, icon: 'html', name: 'HTML', level: 80, category: 'Frontend', description: '시맨틱 마크업, 웹 접근성, SEO 구조' },
    { id: 2, icon: 'css', name: 'CSS', level: 75, category: 'Frontend', description: '반응형 레이아웃, 애니메이션, 스타일링' },
    { id: 3, icon: 'photoshop', name: 'Photoshop', level: 85, category: 'Design', description: '이미지 편집, 합성 / 보정, 배너 제작' },
    { id: 4, icon: 'illustrator', name: 'Illustrator', level: 75, category: 'Design', description: '벡터 그래픽, 로고 디자인, 아이콘 제작' },
    { id: 5, icon: 'figma', name: 'Figma', level: 65, category: 'Design', description: '화면 설계, 프로토타이핑, 컴포넌트 시스템' },
  ],
};

/**
 * PortfolioProvider 컴포넌트
 * About Me 탭과 홈 탭 간 데이터 공유를 위한 전역 Context Provider
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export const PortfolioProvider = ({ children }) => {
  const [aboutMeData, setAboutMeData] = useState(INITIAL_ABOUT_DATA);

  /** aboutMeData 변경 시에만 재계산 — 홈 탭용 파생 데이터 */
  const homeData = useMemo(() => {
    const devStory = aboutMeData.sections.find((s) => s.id === 'dev-story');
    const storySummary = devStory?.content
      ? devStory.content.length > 160
        ? devStory.content.substring(0, 160) + '...'
        : devStory.content
      : '';

    const topSkills = [...aboutMeData.skills]
      .sort((a, b) => (b.level ?? 0) - (a.level ?? 0))
      .slice(0, 4);

    return {
      storySummary,
      topSkills,
      basicInfo: aboutMeData.basicInfo,
    };
  }, [aboutMeData]);

  /** 섹션 내용 수정 */
  const updateSectionContent = useCallback((sectionId, newContent) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, content: newContent } : s
      ),
    }));
  }, []);

  const contextValue = useMemo(() => ({
    aboutMeData,
    setAboutMeData,
    homeData,
    updateSectionContent,
  }), [aboutMeData, homeData, updateSectionContent]);

  return (
    <PortfolioContext.Provider value={ contextValue }>
      { children }
    </PortfolioContext.Provider>
  );
};

/** usePortfolio 훅 */
export const usePortfolio = () => useContext(PortfolioContext);

export default PortfolioContext;
