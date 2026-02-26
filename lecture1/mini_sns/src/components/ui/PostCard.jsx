import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate } from 'react-router-dom';
import NutritionBadge from './NutritionBadge';
import UserAvatar from './UserAvatar';

/**
 * PostCard 컴포넌트 - 게시물 카드
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {object} profile - 작성자 프로필 데이터 [Optional]
 *
 * Example usage:
 * <PostCard post={postData} profile={profileData} />
 */
function PostCard({ post, profile }) {
  const navigate = useNavigate();
  const displayName = profile?.display_name || profile?.username || '익명';
  const createdAt = new Date(post.created_at).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card
      onClick={() => navigate(`/posts/${post.id}`)}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* 게시물 이미지 */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          height='180'
          image={post.image_url || `https://picsum.photos/seed/${post.id}/400/300`}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
        {/* 칼로리 뱃지 오버레이 */}
        <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
          <NutritionBadge category={post.category} calories={post.calories} />
        </Box>
        {/* 별점 오버레이 */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 2,
            px: 0.8,
            py: 0.3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.3,
          }}
        >
          <StarRoundedIcon sx={{ color: '#FFE347', fontSize: 14 }} />
          <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
            {post.star_rating}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        {/* 제목 */}
        <Typography
          variant='body1'
          sx={{
            fontWeight: 700,
            fontSize: '0.9rem',
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {post.title}
        </Typography>

        {/* 작성자 + 날짜 + 좋아요/댓글 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <UserAvatar
              src={profile?.profile_image}
              displayName={displayName}
              size='small'
              showLevel={false}
            />
            <Box>
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, lineHeight: 1.2 }}>
                {displayName}
              </Typography>
              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', lineHeight: 1.2 }}>
                {createdAt}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <FavoriteRoundedIcon sx={{ fontSize: 13, color: 'error.main' }} />
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                {post.likes_count || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                {post.comments_count || 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;
