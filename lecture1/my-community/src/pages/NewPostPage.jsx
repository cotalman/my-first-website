import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CATEGORIES = ['신제품', '제로음료', '제로간식', '저당음료', '저당간식', '저당소스'];
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
import { useAuth } from '../hooks/use-auth';

const MAX_FILES = 3;

function NewPostPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (attachedFiles.length >= MAX_FILES) return;
    setAttachedFiles((prev) => [...prev, file]);
    fileInputRef.current.value = '';
  };

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    const uploaded = [];
    for (const file of attachedFiles) {
      const ext = file.name.split('.').pop();
      const safePath = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('post-attachments')
        .upload(safePath, file);
      if (uploadError) throw new Error('파일 업로드 실패');
      const { data } = supabase.storage.from('post-attachments').getPublicUrl(safePath);
      uploaded.push({ url: data.publicUrl, name: file.name });
    }
    return uploaded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setError('');
    setIsSubmitting(true);

    try {
      const attachments = await uploadFiles();
      const { data, error: insertError } = await supabase.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl.trim() || null,
        attachment_url: attachments[0]?.url || null,
        attachment_name: attachments[0]?.name || null,
        attachments,
        category: category.length > 0 ? category : null,
        user_id: user.id,
      }).select().single();

      if (insertError) {
        setError('게시물 작성에 실패했습니다. 다시 시도해주세요.');
      } else {
        navigate(`/posts/${data.id}`);
      }
    } catch {
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    }
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          목록으로
        </Button>

        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant='h4' sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            리뷰 작성하기 ✍️
          </Typography>

          {error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert>}

          <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 카테고리 선택 */}
            <Box>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                카테고리 선택
              </Typography>
              <ToggleButtonGroup
                value={category}
                onChange={(_, val) => setCategory(val)}
                size='small'
              >
                {CATEGORIES.map((cat) => (
                  <ToggleButton key={cat} value={cat}>
                    { cat }
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <TextField
              label='제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              placeholder='리뷰할 제품명이나 제목을 입력하세요'
            />
            <TextField
              label='이미지 URL (선택)'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              placeholder='https://example.com/image.jpg'
              helperText='제품 이미지 링크를 입력하면 게시물에 표시됩니다'
            />
            <Box>
              <Typography variant='body2' sx={{ color: 'text.secondary', mb: 1 }}>
                첨부파일 (최대 { MAX_FILES }개)
              </Typography>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button
                variant='outlined'
                startIcon={<AttachFileIcon />}
                onClick={() => fileInputRef.current.click()}
                size='small'
                disabled={attachedFiles.length >= MAX_FILES}
              >
                파일 선택 ({ attachedFiles.length }/{ MAX_FILES })
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {attachedFiles.map((file, index) => (
                  <Chip
                    key={index}
                    label={file.name}
                    onDelete={() => removeFile(index)}
                    size='small'
                  />
                ))}
              </Box>
            </Box>
            <TextField
              label='내용'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              multiline
              rows={10}
              placeholder='제품 후기, 맛 평가, 추천 여부 등을 자유롭게 작성해보세요 🌿'
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant='outlined'
                onClick={() => navigate('/')}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={isSubmitting || !title.trim() || !content.trim()}
                sx={{ px: 4 }}
              >
                { isSubmitting ? '등록 중...' : '게시하기' }
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default NewPostPage;
