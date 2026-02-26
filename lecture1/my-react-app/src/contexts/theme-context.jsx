import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * 초기 다크모드 여부를 동기적으로 판별하고
 * document.documentElement에 data-theme을 즉시 설정 (깜빡임 방지)
 */
function getInitialIsDark() {
  const saved = localStorage.getItem('portfolio-theme');
  const isDark = saved !== null
    ? saved === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  return isDark;
}

const ThemeCtx = createContext(null);

/**
 * useThemeContext 훅
 * ThemeContextProvider 내부에서 isDark, toggleTheme 값을 가져옵니다.
 *
 * Example usage:
 * const { isDark, toggleTheme } = useThemeContext();
 */
export function useThemeContext() {
  return useContext(ThemeCtx);
}

/**
 * ThemeContextProvider 컴포넌트
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <ThemeContextProvider><App /></ThemeContextProvider>
 */
export function ThemeContextProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // 상태 변경 시 data-theme 속성 & localStorage 동기화
  useEffect(() => {
    const next = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
