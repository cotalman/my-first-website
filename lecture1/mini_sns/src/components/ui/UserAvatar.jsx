import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { getUserLevel } from '../../utils/levelSystem';

/**
 * UserAvatar 컴포넌트 - 레벨 링 포함 사용자 아바타
 *
 * Props:
 * @param {string} src - 프로필 이미지 URL [Optional]
 * @param {string} displayName - 표시 이름 [Optional]
 * @param {number} postsCount - 게시물 수 (레벨 계산용) [Optional, 기본값: 0]
 * @param {number} totalLikes - 총 좋아요 수 [Optional, 기본값: 0]
 * @param {string} size - 'small' | 'medium' | 'large' [Optional, 기본값: 'medium']
 * @param {boolean} showLevel - 레벨 뱃지 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <UserAvatar src={url} displayName="홍길동" postsCount={10} />
 */
function UserAvatar({ src, displayName = '?', postsCount = 0, totalLikes = 0, size = 'medium', showLevel = true }) {
  const level = getUserLevel(postsCount, totalLikes);

  const sizeMap = {
    small: { avatar: 32, border: 2, badge: 14 },
    medium: { avatar: 44, border: 2.5, badge: 18 },
    large: { avatar: 80, border: 3, badge: 22 },
  };
  const s = sizeMap[size] || sizeMap['medium'];

  return (
    <Tooltip title={showLevel ? `${level.emoji} ${level.name}` : ''} arrow>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <Avatar
          src={src || ''}
          alt={displayName}
          sx={{
            width: s.avatar,
            height: s.avatar,
            border: `${s.border}px solid ${level.color}`,
            fontSize: s.avatar * 0.4,
          }}
        >
          {displayName?.[0]?.toUpperCase() || '?'}
        </Avatar>
        {showLevel && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: s.badge,
              height: s.badge,
              borderRadius: '50%',
              backgroundColor: level.bgColor,
              border: `1.5px solid ${level.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: s.badge * 0.6,
              lineHeight: 1,
            }}
          >
            {level.emoji}
          </Box>
        )}
      </Box>
    </Tooltip>
  );
}

export default UserAvatar;
