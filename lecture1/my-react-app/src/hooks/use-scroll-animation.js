import { useState, useEffect, useRef } from 'react';

/**
 * useScrollAnimation 훅
 *
 * IntersectionObserver로 요소가 뷰포트에 진입할 때 isVisible을 true로 전환합니다.
 * translate3d + opacity 기반 등장 애니메이션의 트리거로 활용합니다.
 *
 * @param {object} options
 * @param {number} options.threshold - 트리거 임계값 0~1 [Optional, 기본값: 0.12]
 * @param {boolean} options.once - 한 번만 실행 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * const { ref, isVisible } = useScrollAnimation();
 */
function useScrollAnimation({ threshold = 0.12, once = true } = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}

export default useScrollAnimation;
