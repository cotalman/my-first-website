import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['전체', '음료', '간식', '베이커리', '단백질'];
const RANK_TABS = ['칼로리 낮은순', '당류 낮은순'];

const RANK_MEDALS = ['🥇', '🥈', '🥉'];
const CAT_EMOJIS = { 전체: '🏆', 음료: '🥤', 간식: '🍡', 베이커리: '🥖', 단백질: '💪' };

/**
 * RankingPage 컴포넌트 - 제로 데이터 랭킹 페이지
 *
 * Example usage:
 * <RankingPage />
 */
function RankingPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('전체');
  const [rankTab, setRankTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRankings();
  }, [category, rankTab]);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const sortField = rankTab === 0 ? 'calories' : 'sugar';
      let query = supabase
        .from('zl_posts')
        .select('*')
        .order(sortField, { ascending: true })
        .limit(10);

      if (category !== '전체') {
        query = query.eq('category', category);
      }

      const { data } = await query;
      if (data) setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const maxValue = posts.length > 0 ? Math.max(...posts.map((p) => rankTab === 0 ? p.calories : p.sugar), 1) : 1;

  return (
    <Box>
      {/* 헤더 */}
      <Box
        sx={{
          px: 2,
          pt: 2.5,
          pb: 1.5,
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 800, fontSize: '1.05rem', mb: 1.5 }}>
          🏆 제로 데이터 랭킹
        </Typography>

        {/* 카테고리 필터 */}
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={`${CAT_EMOJIS[cat]} ${cat}`}
              onClick={() => setCategory(cat)}
              sx={{
                flexShrink: 0,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.8rem',
                backgroundColor: category === cat ? 'primary.main' : 'grey.100',
                color: category === cat ? 'white' : 'text.secondary',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* 랭킹 탭 */}
      <Tabs
        value={rankTab}
        onChange={(_e, v) => setRankTab(v)}
        variant='fullWidth'
        sx={{
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          '& .MuiTab-root': { fontWeight: 700, fontSize: '0.88rem' },
          '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
        }}
      >
        {RANK_TABS.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {/* 랭킹 설명 배너 */}
      <Box
        sx={{
          mx: 2,
          mt: 2,
          p: 1.5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #F0FDF9, #E0FBF5)',
          border: '1px solid',
          borderColor: 'primary.light',
        }}
      >
        <Typography sx={{ fontSize: '0.8rem', color: 'primary.dark', fontWeight: 600 }}>
          {rankTab === 0 ? '🔥 칼로리가 가장 낮은 제품 Top 10' : '💧 당류가 가장 낮은 제품 Top 10'}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.3 }}>
          {category !== '전체' ? `${category} 카테고리 기준` : '전체 카테고리 기준'}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color='primary' />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontSize: '2rem', mb: 1 }}>🏜️</Typography>
          <Typography sx={{ color: 'text.secondary' }}>아직 데이터가 없습니다.</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>첫 리뷰를 작성해보세요!</Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {posts.map((post, index) => {
            const value = rankTab === 0 ? post.calories : post.sugar;
            const unit = rankTab === 0 ? 'kcal' : 'g';
            const barWidth = maxValue > 0 ? Math.max((value / maxValue) * 100, 2) : 2;
            const isTopThree = index < 3;

            return (
              <Box
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: isTopThree ? '#F0FDF9' : 'white',
                  border: '1px solid',
                  borderColor: isTopThree ? 'primary.light' : 'grey.200',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                {/* 순위 */}
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: isTopThree ? 'primary.main' : 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: isTopThree ? '1.1rem' : '0.88rem', color: isTopThree ? 'white' : 'text.secondary' }}>
                    {isTopThree ? RANK_MEDALS[index] : index + 1}
                  </Typography>
                </Box>

                {/* 썸네일 */}
                <Box
                  component='img'
                  src={post.image_url || `https://picsum.photos/seed/${post.id}/100/100`}
                  alt={post.title}
                  sx={{ width: 48, height: 48, borderRadius: 1.5, objectFit: 'cover', flexShrink: 0 }}
                />

                {/* 내용 */}
                <Box sx={{ flex: 1, overflow: 'hidden' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 0.5 }}>
                    {post.category}
                  </Typography>
                  {/* 그래프 바 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ flex: 1, height: 6, backgroundColor: 'grey.200', borderRadius: 3, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${barWidth}%`,
                          height: '100%',
                          backgroundColor: value === 0 ? '#22C55E' : 'primary.main',
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: value === 0 ? 'success.main' : 'primary.dark',
                        flexShrink: 0,
                        minWidth: 60,
                        textAlign: 'right',
                      }}
                    >
                      {value}{unit}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default RankingPage;
