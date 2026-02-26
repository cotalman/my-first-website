import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NutritionBadge from '../components/ui/NutritionBadge';
import UserAvatar from '../components/ui/UserAvatar';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
  { value: 'calories', label: '칼로리 낮은순' },
  { value: 'sugar', label: '당류 낮은순' },
];

/**
 * PostListPage 컴포넌트 - 게시물 목록 페이지
 *
 * Example usage:
 * <PostListPage />
 */
function PostListPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState('latest');
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase.from('zl_posts').select('*');

      if (sort === 'latest') query = query.order('created_at', { ascending: false });
      else if (sort === 'popular') query = query.order('likes_count', { ascending: false });
      else if (sort === 'calories') query = query.order('calories', { ascending: true });
      else if (sort === 'sugar') query = query.order('sugar', { ascending: true });

      const { data } = await query.limit(30);
      if (data) {
        setPosts(data);
        const ids = [...new Set(data.map((p) => p.user_id))];
        const { data: profileData } = await supabase.from('zl_profiles').select('*').in('id', ids);
        if (profileData) {
          const map = {};
          profileData.forEach((p) => { map[p.id] = p; });
          setProfiles(map);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* 헤더 */}
      <Box
        sx={{
          px: 2,
          pt: 2.5,
          pb: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
          📋 게시물 목록
        </Typography>
        <FormControl size='small' sx={{ minWidth: 110 }}>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{ borderRadius: 2, fontSize: '0.82rem', fontWeight: 600 }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.82rem' }}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <Box>
          {posts.map((post, index) => {
            const p = profiles[post.user_id];
            const displayName = p?.display_name || p?.username || '익명';
            return (
              <Box key={post.id}>
                <Box
                  onClick={() => navigate(`/posts/${post.id}`)}
                  sx={{
                    px: 2,
                    py: 1.8,
                    display: 'flex',
                    gap: 1.5,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#F8FFFE' },
                  }}
                >
                  {/* 썸네일 */}
                  <Box
                    component='img'
                    src={post.image_url || `https://picsum.photos/seed/${post.id}/200/200`}
                    alt={post.title}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />

                  {/* 내용 */}
                  <Box sx={{ flex: 1, overflow: 'hidden' }}>
                    {/* 뱃지 */}
                    <Box sx={{ mb: 0.5 }}>
                      <NutritionBadge category={post.category} calories={post.calories} sugar={post.sugar} />
                    </Box>

                    {/* 제목 */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        mb: 0.8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.title}
                    </Typography>

                    {/* 작성자 + 날짜 + 스탯 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                        <UserAvatar src={p?.profile_image} displayName={displayName} size='small' showLevel={false} />
                        <Box>
                          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, lineHeight: 1.2 }}>
                            {displayName}
                          </Typography>
                          <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                            {new Date(post.created_at).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <StarRoundedIcon sx={{ fontSize: 13, color: '#FFE347' }} />
                          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{post.star_rating}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <FavoriteRoundedIcon sx={{ fontSize: 13, color: 'error.main' }} />
                          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{post.likes_count || 0}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                          <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{post.comments_count || 0}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {index < posts.length - 1 && <Divider sx={{ mx: 2 }} />}
              </Box>
            );
          })}

          {posts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ fontSize: '2rem', mb: 1 }}>📭</Typography>
              <Typography sx={{ color: 'text.secondary' }}>게시물이 없습니다.</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PostListPage;
