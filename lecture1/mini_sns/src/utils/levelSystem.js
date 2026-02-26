/** 레벨 시스템 정의 */
export const LEVELS = [
  {
    level: 1,
    name: '제로입문자',
    emoji: '🌱',
    minPosts: 0,
    minLikes: 0,
    color: '#9E9E9E',
    bgColor: '#F5F5F5',
  },
  {
    level: 2,
    name: '저당탐험자',
    emoji: '🔍',
    minPosts: 5,
    minLikes: 0,
    color: '#22C55E',
    bgColor: '#F0FDF4',
  },
  {
    level: 3,
    name: '제로마스터',
    emoji: '⭐',
    minPosts: 20,
    minLikes: 0,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  {
    level: 4,
    name: '혈당수호자',
    emoji: '🛡️',
    minPosts: 50,
    minLikes: 100,
    color: '#9C27B0',
    bgColor: '#F3E8FF',
  },
  {
    level: 5,
    name: '제로전설',
    emoji: '👑',
    minPosts: 100,
    minLikes: 500,
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
];

/**
 * 사용자 레벨 계산
 * @param {number} postsCount - 작성한 게시물 수
 * @param {number} totalLikesReceived - 받은 좋아요 총합
 * @returns {object} 현재 레벨 정보
 */
export function getUserLevel(postsCount = 0, totalLikesReceived = 0) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (postsCount >= LEVELS[i].minPosts && totalLikesReceived >= LEVELS[i].minLikes) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

/**
 * 다음 레벨까지의 진행도 계산
 * @param {number} postsCount
 * @param {number} totalLikesReceived
 * @returns {object} 진행도 정보
 */
export function getProgressToNext(postsCount = 0, totalLikesReceived = 0) {
  const currentLevel = getUserLevel(postsCount, totalLikesReceived);
  const nextLevelIndex = LEVELS.findIndex((l) => l.level === currentLevel.level + 1);

  if (nextLevelIndex === -1) {
    return { progress: 100, message: '🎉 최고 레벨 달성!', nextLevel: null };
  }

  const nextLevel = LEVELS[nextLevelIndex];
  const prevLevel = LEVELS[nextLevelIndex - 1];

  const postsRange = nextLevel.minPosts - prevLevel.minPosts;
  const postsProgress = postsRange > 0
    ? Math.min(((postsCount - prevLevel.minPosts) / postsRange) * 100, 100)
    : 100;

  const remaining = Math.max(nextLevel.minPosts - postsCount, 0);

  return {
    progress: Math.round(postsProgress),
    message: remaining > 0
      ? `다음 레벨까지 리뷰 ${remaining}개 필요`
      : '레벨업 조건 충족!',
    nextLevel,
    currentLevel,
  };
}

/**
 * 활동 점수 계산
 * @param {number} postsCount
 * @param {number} totalLikesReceived
 * @param {number} commentsCount
 * @returns {number} 총 점수
 */
export function calculateActivityScore(postsCount = 0, totalLikesReceived = 0, commentsCount = 0) {
  return postsCount * 10 + totalLikesReceived * 2 + commentsCount * 1;
}
