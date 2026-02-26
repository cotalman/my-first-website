import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import PostCard from '../components/ui/PostCard';

const CATEGORIES = ['전체', '음료', '간식', '베이커리', '단백질', '기타'];

/**
 * HomePage 컴포넌트 - 메인 피드 페이지
 *
 * Example usage:
 * <HomePage />
 */
function HomePage() {
  const { profile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('zl_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (selectedCategory !== '전체') {
        query = query.eq('category', selectedCategory);
      }

      const { data } = await query;
      if (data) {
        setPosts(data);
        await fetchProfiles(data.map((p) => p.user_id));
      }

      // 인기 게시물 (좋아요 상위 3개)
      if (selectedCategory === '전체') {
        const { data: popular } = await supabase
          .from('zl_posts')
          .select('*')
          .order('likes_count', { ascending: false })
          .limit(3);
        if (popular) setPopularPosts(popular);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProfiles = async (userIds) => {
    const uniqueIds = [...new Set(userIds)];
    if (uniqueIds.length === 0) return;
    const { data } = await supabase
      .from('zl_profiles')
      .select('*')
      .in('id', uniqueIds);
    if (data) {
      const profileMap = {};
      data.forEach((p) => { profileMap[p.id] = p; });
      setProfiles(profileMap);
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
        <Box>
          <Typography
            variant='h6'
            sx={{ fontWeight: 800, color: '#1BA88C', letterSpacing: -0.5, fontSize: '1.1rem' }}
          >
            🥤 ZERO LIFE
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
            안녕하세요, {profile?.display_name || profile?.username || '제로러'}님 👋
          </Typography>
        </Box>
        <IconButton size='small'>
          <NotificationsNoneRoundedIcon sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Box>

      {/* 카테고리 필터 */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          position: 'sticky',
          top: 65,
          backgroundColor: 'white',
          zIndex: 99,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              cursor: 'pointer',
              flexShrink: 0,
              fontWeight: 600,
              backgroundColor: selectedCategory === cat ? 'primary.main' : 'grey.100',
              color: selectedCategory === cat ? 'white' : 'text.secondary',
              '&:hover': { backgroundColor: selectedCategory === cat ? 'primary.dark' : 'grey.200' },
            }}
          />
        ))}
      </Box>

      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        {/* 인기 게시물 섹션 */}
        {selectedCategory === '전체' && popularPosts.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: 'text.primary' }}>
              🔥 인기 게시물
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
              {popularPosts.map((post) => (
                <Box key={post.id} sx={{ minWidth: 200, maxWidth: 200 }}>
                  <PostCard post={post} profile={profiles[post.user_id]} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 최신 피드 */}
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1.5, color: 'text.primary' }}>
          {selectedCategory === '전체' ? '📰 최신 피드' : `📂 ${selectedCategory}`}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: '2rem', mb: 1 }}>🥤</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              아직 게시물이 없어요.
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
              첫 번째 리뷰를 작성해보세요!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1.5}>
            {posts.map((post) => (
              <Grid size={{ xs: 6 }} key={post.id}>
                <PostCard post={post} profile={profiles[post.user_id]} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
