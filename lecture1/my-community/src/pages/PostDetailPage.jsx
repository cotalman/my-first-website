import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
import { useAuth } from '../hooks/use-auth';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: '' });

  useEffect(() => {
    fetchPost();
    fetchComments();
    incrementViewCount();
  }, [id]);

  useEffect(() => {
    if (user) fetchLikeStatus();
  }, [user, id]);

  const incrementViewCount = async () => {
    const { data } = await supabase.from('posts').select('view_count').eq('id', id).single();
    if (data) {
      await supabase.from('posts').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id);
    }
  };

  const fetchPost = async () => {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('*, profiles(name)')
      .eq('id', id)
      .single();

    if (fetchError) {
      setError('게시물을 찾을 수 없습니다.');
    } else {
      setPost(data);
      setLikeCount(data.like_count || 0);
    }
    setIsLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(name)')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    setComments(data || []);
  };

  const fetchLikeStatus = async () => {
    const { data } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    setIsLiked(!!data);
  };

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isLiked) {
      await supabase.from('post_likes').delete().eq('post_id', id).eq('user_id', user.id);
      const newCount = likeCount - 1;
      setLikeCount(newCount);
      setIsLiked(false);
      await supabase.from('posts').update({ like_count: newCount }).eq('id', id);
    } else {
      await supabase.from('post_likes').insert({ post_id: parseInt(id), user_id: user.id });
      const newCount = likeCount + 1;
      setLikeCount(newCount);
      setIsLiked(true);
      await supabase.from('posts').update({ like_count: newCount }).eq('id', id);
    }
  };

  const handleDelete = async () => {
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);
    if (!deleteError) {
      navigate('/');
    }
    setDeleteDialogOpen(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);

    const { error: commentError } = await supabase.from('comments').insert({
      content: commentText.trim(),
      post_id: parseInt(id),
      user_id: user.id,
    });

    if (!commentError) {
      setCommentText('');
      fetchComments();
    }
    setIsSubmitting(false);
  };

  const openLightbox = (src) => {
    setLightbox({ open: true, src });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: '' });
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Alert severity='error'>{ error || '게시물을 찾을 수 없습니다.' }</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          목록으로
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        {/* 상단 버튼 영역 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'text.secondary' }}
          >
            목록으로
          </Button>
          {user && user.id === post.user_id && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='outlined'
                onClick={() => navigate(`/posts/${id}/edit`)}
              >
                수정하기
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={() => setDeleteDialogOpen(true)}
              >
                삭제하기
              </Button>
            </Box>
          )}
        </Box>

        {/* 게시물 본문 */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 3 }}>
          <Typography
            variant='h4'
            sx={{ fontWeight: 700, color: 'text.primary', mb: 1, lineHeight: 1.4 }}
          >
            { post.title }
          </Typography>

          {/* 카테고리 뱃지 */}
          {post.category?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {post.category.map((cat) => {
                const colorMap = {
                  '신제품': { bg: '#E8F5E9', color: '#2E7D32' },
                  '제로음료': { bg: '#E3F2FD', color: '#1565C0' },
                  '제로간식': { bg: '#FFF3E0', color: '#E65100' },
                  '저당음료': { bg: '#E0F7FA', color: '#00695C' },
                  '저당간식': { bg: '#F3E5F5', color: '#6A1B9A' },
                  '저당소스': { bg: '#FCE4EC', color: '#AD1457' },
                };
                const style = colorMap[cat];
                if (!style) return null;
                return (
                  <Chip
                    key={cat}
                    label={cat}
                    size='small'
                    sx={{
                      height: 22,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: style.bg,
                      color: style.color,
                    }}
                  />
                );
              })}
            </Box>
          )}

          {/* 메타 정보 */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                { post.profiles?.name || '익명' }
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                { formatDate(post.created_at) }
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                조회 { post.view_count || 0 }
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* 이미지 (URL 입력) */}
          {post.image_url && (
            <Box
              component='img'
              src={post.image_url}
              alt='게시물 이미지'
              onClick={() => openLightbox(post.image_url)}
              sx={{
                width: '60%',
                display: 'block',
                mx: 'auto',
                borderRadius: 2,
                mb: 3,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.9 },
              }}
            />
          )}

          {/* 첨부파일 */}
          {(() => {
            const attachments = post.attachments?.length
              ? post.attachments
              : post.attachment_url
                ? [{ url: post.attachment_url, name: post.attachment_name }]
                : [];
            if (!attachments.length) return null;
            return (
              <Box sx={{ mb: 3 }}>
                {attachments.map((att, index) => {
                  const ext = att.name?.split('.').pop().toLowerCase();
                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext);
                  return (
                    <Box key={index} sx={{ mb: 2 }}>
                      {isImage && (
                        <Box
                          component='img'
                          src={att.url}
                          alt={att.name}
                          onClick={() => openLightbox(att.url)}
                          sx={{
                            width: '60%',
                            display: 'block',
                            mx: 'auto',
                            borderRadius: 2,
                            mb: 1,
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            '&:hover': { opacity: 0.9 },
                          }}
                        />
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant='outlined'
                          size='small'
                          startIcon={<DownloadIcon />}
                          href={att.url}
                          download={att.name}
                          target='_blank'
                        >
                          { att.name || '첨부파일 다운로드' }
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            );
          })()}

          {/* 본문 */}
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              mb: 4,
            }}
          >
            { post.content }
          </Typography>

          {/* 좋아요 버튼 */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <IconButton
                onClick={handleLike}
                sx={{
                  backgroundColor: isLiked ? '#FFF0F5' : 'grey.100',
                  '&:hover': { backgroundColor: '#FFE0EE' },
                  width: 56,
                  height: 56,
                }}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ color: '#FF6B9D', fontSize: 28 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: 'text.secondary', fontSize: 28 }} />
                )}
              </IconButton>
              <Typography variant='body2' sx={{ color: isLiked ? '#FF6B9D' : 'text.secondary', fontWeight: 600 }}>
                { likeCount }
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 하단 버튼 영역 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ color: 'text.secondary' }}
          >
            목록으로
          </Button>
          {user && user.id === post.user_id && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant='outlined'
                onClick={() => navigate(`/posts/${id}/edit`)}
              >
                수정하기
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={() => setDeleteDialogOpen(true)}
              >
                삭제하기
              </Button>
            </Box>
          )}
        </Box>

        {/* 삭제 확인 다이얼로그 */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>게시물 삭제</DialogTitle>
          <DialogContent>
            <DialogContentText>
              정말 삭제하시겠습니까? 삭제된 게시물은 복구할 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
            <Button onClick={handleDelete} color='error' variant='contained'>삭제</Button>
          </DialogActions>
        </Dialog>

        {/* 댓글 섹션 */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant='h6' sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            댓글 { comments.length }개
          </Typography>

          {/* 댓글 작성 */}
          {user ? (
            <Box component='form' onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder='댓글을 입력하세요...'
                multiline
                maxRows={4}
                fullWidth
                size='small'
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <IconButton
                type='submit'
                color='primary'
                disabled={isSubmitting || !commentText.trim()}
                sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          ) : (
            <Alert
              severity='info'
              action={
                <Button color='inherit' size='small' onClick={() => navigate('/login')}>
                  로그인
                </Button>
              }
              sx={{ mb: 3 }}
            >
              댓글을 작성하려면 로그인이 필요합니다.
            </Alert>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* 댓글 목록 */}
          {comments.length === 0 ? (
            <Typography variant='body2' sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
              아직 댓글이 없어요. 첫 댓글을 작성해보세요! 💬
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {comments.map((comment) => (
                <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.light', fontSize: 14 }}>
                    { comment.profiles?.name?.[0] || <PersonIcon sx={{ fontSize: 18 }} /> }
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                      <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        { comment.profiles?.name || '익명' }
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        { formatDate(comment.created_at) }
                      </Typography>
                    </Box>
                    <Typography variant='body2' sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                      { comment.content }
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Container>

      {/* 이미지 라이트박스 */}
      {lightbox.open && (
        <Box
          onClick={closeLightbox}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          {/* 닫기 버튼 */}
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              zIndex: 10000,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.85)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* 이미지 컨테이너 */}
          <Box
            sx={{ position: 'relative', display: 'inline-flex' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              component='img'
              src={lightbox.src}
              alt='확대 이미지'
              sx={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: 2,
                display: 'block',
                userSelect: 'none',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PostDetailPage;
