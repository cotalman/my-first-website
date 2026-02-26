import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: '신제품', label: '신제품' },
  { value: '제로음료', label: '제로음료' },
  { value: '제로간식', label: '제로간식' },
  { value: '저당음료', label: '저당음료' },
  { value: '저당간식', label: '저당간식' },
  { value: '저당소스', label: '저당소스' },
];
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
import { useAuth } from '../hooks/use-auth';
import PostCard from '../components/ui/PostCard';

function PostListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError('');

    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*, profiles(name)')
      .order('created_at', { ascending: false });

    if (postsError) {
      setError('게시물을 불러오는 데 실패했습니다.');
      setIsLoading(false);
      return;
    }

    // 댓글 수 조회
    const { data: commentsData } = await supabase
      .from('comments')
      .select('post_id');

    if (commentsData) {
      const counts = {};
      commentsData.forEach(({ post_id }) => {
        counts[post_id] = (counts[post_id] || 0) + 1;
      });
      setCommentCounts(counts);
    }

    setPosts(postsData || []);
    setIsLoading(false);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        {/* 페이지 헤더 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant='h4'
              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
            >
              제로템 리뷰
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              솔직한 제로칼로리 식품 & 음료 후기를 공유해요 🧊
            </Typography>
          </Box>
          {user && (
            <Button
              variant='contained'
              color='primary'
              startIcon={<EditIcon />}
              onClick={() => navigate('/posts/new')}
              disableElevation
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              글쓰기
            </Button>
          )}
        </Box>

        {/* 카테고리 탭 */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          {CATEGORIES.map((cat) => (
            <Tab key={cat.value} value={cat.value} label={cat.label} />
          ))}
        </Tabs>

        {/* 로딩 */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color='primary' />
          </Box>
        )}

        {/* 에러 */}
        {error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert>}

        {/* 게시물 목록 */}
        {!isLoading && posts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='h6' sx={{ color: 'text.secondary', mb: 2 }}>
              아직 게시물이 없어요
            </Typography>
            {user ? (
              <Button variant='contained' color='primary' onClick={() => navigate('/posts/new')}>
                첫 번째 리뷰 작성하기
              </Button>
            ) : (
              <Button variant='outlined' color='primary' onClick={() => navigate('/login')}>
                로그인하고 리뷰 작성하기
              </Button>
            )}
          </Box>
        )}

        <Grid container spacing={2}>
          {!isLoading && posts
            .filter((post) => activeTab === 'all' || post.category?.includes(activeTab))
            .map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PostCard
                  post={post}
                  commentCount={commentCounts[post.id] || 0}
                />
              </Grid>
            ))}
        </Grid>
      </Container>

      {/* 모바일 글쓰기 버튼 */}
      {user && (
        <Fab
          color='primary'
          onClick={() => navigate('/posts/new')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'flex', sm: 'none' },
            boxShadow: 'none',
          }}
        >
          <EditIcon />
        </Fab>
      )}
    </Box>
  );
}

export default PostListPage;
