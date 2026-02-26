import { useState, useEffect, useCallback } from 'react';

/**
 * useParallax 훅
 *
 * requestAnimationFrame으로 throttle한 scrollY 값을 반환합니다.
 * CSS custom property와 함께 translate3d 패럴렉스 효과에 활용합니다.
 *
 * @param {object} options
 * @param {number} options.speed - 스크롤 대비 배율 [Optional, 기본값: 1]
 *
 * Example usage:
 * const scrollY = useParallax();
 * // style={{ '--py': `${scrollY * 0.15}px` }}
 * // sx={{ transform: 'translate3d(0, var(--py), 0)' }}
 */
function useParallax({ speed = 1 } = {}) {
  const [scrollY, setScrollY] = useState(0);

  const update = useCallback(() => {
    setScrollY(window.scrollY * speed);
  }, [speed]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  return scrollY;
}

export default useParallax;
