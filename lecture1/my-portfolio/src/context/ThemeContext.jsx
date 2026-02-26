import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
 * useThemeMode 훅
 * ThemeProvider 내부에서 isDark, toggleTheme 값을 가져옵니다.
 *
 * Example usage:
 * const { isDark, toggleTheme } = useThemeMode();
 */
export function useThemeMode() {
  return useContext(ThemeCtx);
}

/**
 * ThemeModeProvider 컴포넌트
 *
 * Props:
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <ThemeModeProvider><App /></ThemeModeProvider>
 */
export function ThemeModeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

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
