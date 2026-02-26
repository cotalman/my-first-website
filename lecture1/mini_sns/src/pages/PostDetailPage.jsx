import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import NutritionBadge from '../components/ui/NutritionBadge';
import UserAvatar from '../components/ui/UserAvatar';

const TASTE_LABELS = {
  '달지않음': { color: '#3B82F6', bg: '#EFF6FF', label: '🧊 달지않음' },
  '적당': { color: '#2ED3B7', bg: '#F0FDF9', label: '✅ 적당한 단맛' },
  '달다': { color: '#EF4444', bg: '#FFF1F2', label: '🍬 달다' },
};

/**
 * PostDetailPage 컴포넌트 - 게시물 상세 페이지
 *
 * Example usage:
 * <PostDetailPage />
 */
function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [postProfile, setPostProfile] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentProfiles, setCommentProfiles] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const { data } = await supabase.from('zl_posts').select('*').eq('id', id).single();
    if (data) {
      setPost(data);
      const { data: prof } = await supabase.from('zl_profiles').select('*').eq('id', data.user_id).single();
      setPostProfile(prof);

      if (user) {
        const { data: likeData } = await supabase
          .from('zl_post_likes')
          .select('id')
          .eq('user_id', user.id)
          .eq('post_id', id)
          .maybeSingle();
        setIsLiked(!!likeData);
      }
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('zl_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });
    if (data) {
      setComments(data);
      const ids = [...new Set(data.map((c) => c.user_id))];
      if (ids.length > 0) {
        const { data: profs } = await supabase.from('zl_profiles').select('*').in('id', ids);
        if (profs) {
          const map = {};
          profs.forEach((p) => { map[p.id] = p; });
          setCommentProfiles(map);
        }
      }
    }
  };

  const handleLike = async () => {
    if (!user) return;
    if (isLiked) {
      await supabase.from('zl_post_likes').delete().eq('user_id', user.id).eq('post_id', id);
      setIsLiked(false);
      setPost((prev) => ({ ...prev, likes_count: Math.max((prev.likes_count || 1) - 1, 0) }));
    } else {
      await supabase.from('zl_post_likes').insert({ user_id: user.id, post_id: parseInt(id) });
      setIsLiked(true);
      setPost((prev) => ({ ...prev, likes_count: (prev.likes_count || 0) + 1 }));
    }
  };

  const handleComment = async () => {
    if (!newComment.trim() || !user) return;
    setCommentLoading(true);
    const { error } = await supabase.from('zl_comments').insert({
      content: newComment.trim(),
      user_id: user.id,
      post_id: parseInt(id),
    });
    if (!error) {
      setNewComment('');
      await fetchComments();
    }
    setCommentLoading(false);
  };

  const handleDeleteComment = async (commentId) => {
    await supabase.from('zl_comments').delete().eq('id', commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>게시물을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate(-1)}>돌아가기</Button>
      </Box>
    );
  }

  const displayName = postProfile?.display_name || postProfile?.username || '익명';
  const taste = TASTE_LABELS[post.taste_rating] || TASTE_LABELS['적당'];

  return (
    <Box>
      {/* 헤더 */}
      <Box
        sx={{
          px: 1,
          pt: 1.5,
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', ml: 0.5 }}>게시물 상세</Typography>
      </Box>

      {/* 이미지 */}
      <Box
        component='img'
        src={post.image_url || `https://picsum.photos/seed/${post.id}/800/600`}
        alt={post.title}
        sx={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
      />

      <Box sx={{ px: 2, pt: 2, pb: 2 }}>
        {/* 뱃지 */}
        <Box sx={{ mb: 1.5 }}>
          <NutritionBadge category={post.category} calories={post.calories} sugar={post.sugar} />
        </Box>

        {/* 제목 */}
        <Typography variant='h6' sx={{ fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
          {post.title}
        </Typography>

        {/* 작성자 정보 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <UserAvatar src={postProfile?.profile_image} displayName={displayName} size='medium' />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '0.88rem' }}>{displayName}</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                {new Date(post.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
          </Box>
          {/* 별점 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarRoundedIcon
                key={star}
                sx={{
                  fontSize: 20,
                  color: star <= post.star_rating ? '#FFE347' : '#E0E0E0',
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* 영양정보 카드 */}
        <Box
          sx={{
            backgroundColor: '#F8FFFE',
            borderRadius: 3,
            p: 2,
            mb: 2,
            border: '1px solid',
            borderColor: 'primary.light',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1.5, color: 'primary.dark' }}>
            📊 영양정보
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[
              { icon: <LocalFireDepartmentRoundedIcon sx={{ color: '#E65100', fontSize: 20 }} />, label: '칼로리', value: `${post.calories}kcal`, color: '#E65100' },
              { icon: <WaterDropRoundedIcon sx={{ color: '#1565C0', fontSize: 20 }} />, label: '당류', value: `${post.sugar}g`, color: '#1565C0' },
              { icon: <FitnessCenterRoundedIcon sx={{ color: '#2E7D32', fontSize: 20 }} />, label: '단백질', value: `${post.protein}g`, color: '#2E7D32' },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  p: 1.2,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                {item.icon}
                <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 0.3 }}>{item.label}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: item.color }}>{item.value}</Typography>
              </Box>
            ))}
          </Box>

          {/* 맛 평가 */}
          <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>맛 평가</Typography>
            <Chip
              label={taste.label}
              size='small'
              sx={{ backgroundColor: taste.bg, color: taste.color, fontWeight: 700, fontSize: '0.72rem' }}
            />
          </Box>
        </Box>

        {/* 본문 */}
        <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'text.primary', mb: 2, whiteSpace: 'pre-wrap' }}>
          {post.caption}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* 좋아요 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton
            onClick={handleLike}
            sx={{
              color: isLiked ? 'error.main' : 'text.secondary',
              backgroundColor: isLiked ? '#FFF1F2' : 'grey.100',
              '&:hover': { backgroundColor: isLiked ? '#FFE4E6' : 'grey.200' },
            }}
          >
            {isLiked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          </IconButton>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
            {post.likes_count || 0}명이 좋아합니다
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* 댓글 섹션 */}
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2 }}>
          💬 댓글 {comments.length}개
        </Typography>

        {/* 댓글 입력 */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='댓글을 입력하세요...'
            size='small'
            fullWidth
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleComment()}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <IconButton
            onClick={handleComment}
            disabled={commentLoading || !newComment.trim()}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              '&:hover': { backgroundColor: 'primary.dark' },
              '&:disabled': { backgroundColor: 'grey.200' },
            }}
          >
            {commentLoading ? <CircularProgress size={20} color='inherit' /> : <SendRoundedIcon />}
          </IconButton>
        </Box>

        {/* 댓글 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {comments.map((comment) => {
            const cp = commentProfiles[comment.user_id];
            const cName = cp?.display_name || cp?.username || '익명';
            return (
              <Box key={comment.id} sx={{ display: 'flex', gap: 1.2 }}>
                <UserAvatar src={cp?.profile_image} displayName={cName} size='small' showLevel={false} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem' }}>{cName}</Typography>
                      <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
                        {new Date(comment.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      </Typography>
                    </Box>
                    {user?.id === comment.user_id && (
                      <IconButton size='small' onClick={() => handleDeleteComment(comment.id)}>
                        <DeleteRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </IconButton>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem', color: 'text.primary', mt: 0.3 }}>
                    {comment.content}
                  </Typography>
                </Box>
              </Box>
            );
          })}
          {comments.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem', py: 2 }}>
              첫 번째 댓글을 남겨보세요!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PostDetailPage;
