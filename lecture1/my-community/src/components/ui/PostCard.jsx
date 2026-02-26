import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';

/**
 * 게시물 카드 컴포넌트 (썸네일 포함)
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {string} post.title - 게시물 제목
 * @param {string} post.content - 게시물 내용
 * @param {string} post.image_url - 이미지 URL [Optional]
 * @param {string} post.attachment_url - 첨부파일 URL [Optional]
 * @param {string} post.attachment_name - 첨부파일명 [Optional]
 * @param {string} post.created_at - 작성 날짜
 * @param {number} post.like_count - 좋아요 수
 * @param {object} post.profiles - 작성자 프로필
 * @param {number} commentCount - 댓글 수 [Optional, 기본값: 0]
 *
 * Example usage:
 * <PostCard post={postData} commentCount={5} />
 */
function PostCard({ post, commentCount = 0 }) {
  const navigate = useNavigate();

  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const previewContent = post.content.length > 60
    ? post.content.slice(0, 60) + '...'
    : post.content;

  const getAttachmentImageUrl = () => {
    if (!post.attachment_url || !post.attachment_name) return null;
    const ext = post.attachment_name.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext);
    return isImage ? post.attachment_url : null;
  };

  const thumbnailUrl = post.image_url || getAttachmentImageUrl();

  const CATEGORY_COLORS = {
    '신제품': { bg: '#E8F5E9', color: '#2E7D32' },
    '제로음료': { bg: '#E3F2FD', color: '#1565C0' },
    '제로간식': { bg: '#FFF3E0', color: '#E65100' },
    '저당음료': { bg: '#E0F7FA', color: '#00695C' },
    '저당간식': { bg: '#F3E5F5', color: '#6A1B9A' },
    '저당소스': { bg: '#FCE4EC', color: '#AD1457' },
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <CardActionArea
        onClick={() => navigate(`/posts/${post.id}`)}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* 썸네일 */}
        {thumbnailUrl ? (
          <CardMedia
            component='img'
            image={thumbnailUrl}
            alt={post.title}
            sx={{ height: 200, objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              height: 200,
              backgroundColor: 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon sx={{ fontSize: 48, color: 'grey.300' }} />
          </Box>
        )}

        <CardContent sx={{ p: { xs: 2, md: 2.5 }, flex: 1 }}>
          {/* 카테고리 뱃지 */}
          {post.category?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {post.category.map((cat) => CATEGORY_COLORS[cat] && (
                <Chip
                  key={cat}
                  label={cat}
                  size='small'
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: CATEGORY_COLORS[cat].bg,
                    color: CATEGORY_COLORS[cat].color,
                  }}
                />
              ))}
            </Box>
          )}

          {/* 제목 */}
          <Typography
            variant='subtitle1'
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>

          {/* 내용 미리보기 */}
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.5 }}
          >
            {previewContent}
          </Typography>

          {/* 메타 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                { post.profiles?.name || '익명' }
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                { formattedDate }
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
              <Chip
                icon={<FavoriteIcon sx={{ fontSize: '12px !important', color: '#FF6B9D !important' }} />}
                label={post.like_count || 0}
                size='small'
                sx={{ backgroundColor: '#FFF0F5', color: '#FF6B9D', fontWeight: 600, height: 22 }}
              />
              <Chip
                icon={<ChatBubbleOutlineIcon sx={{ fontSize: '12px !important' }} />}
                label={commentCount}
                size='small'
                sx={{ backgroundColor: 'grey.100', height: 22 }}
              />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
