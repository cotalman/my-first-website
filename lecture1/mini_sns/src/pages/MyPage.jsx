import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { getUserLevel, getProgressToNext, calculateActivityScore, LEVELS } from '../utils/levelSystem';
import PostCard from '../components/ui/PostCard';
import UserAvatar from '../components/ui/UserAvatar';

/**
 * MyPage 컴포넌트 - 마이페이지
 *
 * Example usage:
 * <MyPage />
 */
function MyPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ postsCount: 0, totalLikes: 0 });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: posts } = await supabase
        .from('zl_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (posts) {
        setMyPosts(posts);
        const totalLikes = posts.reduce((sum, p) => sum + (p.likes_count || 0), 0);
        setStats({ postsCount: posts.length, totalLikes });
      }

      const { data: likes } = await supabase
        .from('zl_post_likes')
        .select('post_id')
        .eq('user_id', user.id);

      if (likes && likes.length > 0) {
        const postIds = likes.map((l) => l.post_id);
        const { data: likedData } = await supabase
          .from('zl_posts')
          .select('*')
          .in('id', postIds)
          .order('created_at', { ascending: false });
        if (likedData) setLikedPosts(likedData);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const level = getUserLevel(stats.postsCount, stats.totalLikes);
  const progress = getProgressToNext(stats.postsCount, stats.totalLikes);
  const activityScore = calculateActivityScore(stats.postsCount, stats.totalLikes);

  const displayName = profile?.display_name || profile?.username || '익명';
  const posts = tab === 0 ? myPosts : likedPosts;

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
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
          👤 마이페이지
        </Typography>
        <Button
          startIcon={<LogoutRoundedIcon />}
          onClick={handleSignOut}
          size='small'
          sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
        >
          로그아웃
        </Button>
      </Box>

      {/* 프로필 섹션 */}
      <Box sx={{ px: 3, py: 3, backgroundColor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <UserAvatar
            src={profile?.profile_image}
            displayName={displayName}
            postsCount={stats.postsCount}
            totalLikes={stats.totalLikes}
            size='large'
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{displayName}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
              @{profile?.username || '...'}
            </Typography>
            {profile?.bio && (
              <Typography sx={{ fontSize: '0.85rem', mt: 0.5, color: 'text.primary' }}>
                {profile.bio}
              </Typography>
            )}
          </Box>
        </Box>

        {/* 통계 */}
        <Box
          sx={{
            display: 'flex',
            gap: 0,
            mt: 2.5,
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {[
            { label: '리뷰', value: stats.postsCount },
            { label: '좋아요', value: stats.totalLikes },
            { label: '활동점수', value: activityScore },
          ].map((item, i) => (
            <Box
              key={item.label}
              sx={{
                flex: 1,
                textAlign: 'center',
                py: 1.5,
                borderRight: i < 2 ? '1px solid' : 'none',
                borderColor: 'grey.200',
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: 'primary.main' }}>
                {item.value}
              </Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* 레벨 카드 */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 3,
            backgroundColor: level.bgColor,
            border: '1px solid',
            borderColor: level.color + '40',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.5rem' }}>{level.emoji}</Typography>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '0.92rem', color: level.color }}>
                  Lv.{level.level} {level.name}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                  {progress.message}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={`${progress.progress}%`}
              size='small'
              sx={{ backgroundColor: level.color, color: 'white', fontWeight: 700 }}
            />
          </Box>
          <LinearProgress
            variant='determinate'
            value={progress.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: level.color + '30',
              '& .MuiLinearProgress-bar': { backgroundColor: level.color, borderRadius: 4 },
            }}
          />

          {/* 레벨 로드맵 */}
          <Box sx={{ mt: 2, display: 'flex', gap: 0.8 }}>
            {LEVELS.map((lv) => (
              <Box
                key={lv.level}
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  opacity: lv.level <= level.level ? 1 : 0.4,
                }}
              >
                <Typography sx={{ fontSize: '1rem' }}>{lv.emoji}</Typography>
                <Typography sx={{ fontSize: '0.58rem', color: lv.level <= level.level ? lv.color : 'text.secondary', fontWeight: lv.level === level.level ? 800 : 400 }}>
                  Lv.{lv.level}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* 탭 */}
      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        variant='fullWidth'
        sx={{
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          '& .MuiTab-root': { fontWeight: 700, fontSize: '0.88rem' },
          '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
        }}
      >
        <Tab label={`내 리뷰 (${myPosts.length})`} />
        <Tab label={`좋아요 (${likedPosts.length})`} />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <Box sx={{ p: 1.5 }}>
          {posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography sx={{ fontSize: '2rem', mb: 1 }}>{tab === 0 ? '📝' : '💖'}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
                {tab === 0 ? '아직 작성한 리뷰가 없습니다.' : '좋아요한 게시물이 없습니다.'}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={1.5}>
              {posts.map((post) => (
                <Grid size={{ xs: 6 }} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
}

export default MyPage;
