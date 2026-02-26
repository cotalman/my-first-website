import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CATEGORIES = ['신제품', '제로음료', '제로간식', '저당음료', '저당간식', '저당소스'];
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../utils/supabase-client';
import { useAuth } from '../hooks/use-auth';

const MAX_FILES = 3;

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];

const isImageFile = (name) => {
  if (!name) return false;
  return IMAGE_EXTS.includes(name.split('.').pop().toLowerCase());
};

/**
 * @param {string|null} url - 미리보기 이미지 URL
 */
function ImageTooltip({ url, name, children }) {
  if (!isImageFile(name) || !url) return children;
  return (
    <Tooltip
      title={
        <Box component='img' src={url} alt={name} sx={{ width: 100, height: 'auto', borderRadius: 1 }} />
      }
      placement='top'
      arrow
    >
      {children}
    </Tooltip>
  );
}

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState([]);
  const [existingAttachments, setExistingAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !data) {
        setError('게시물을 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      if (data.user_id !== user?.id) {
        navigate(`/posts/${id}`);
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      setImageUrl(data.image_url || '');
      setCategory(data.category || []);
      setExistingAttachments(data.attachments || (data.attachment_url ? [{ url: data.attachment_url, name: data.attachment_name }] : []));
      setIsLoading(false);
    };

    if (user) fetchPost();
  }, [id, user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (existingAttachments.length + newFiles.length >= MAX_FILES) return;
    setNewFiles((prev) => [...prev, file]);
    fileInputRef.current.value = '';
  };

  const removeExisting = (index) => {
    setExistingAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNew = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    const uploaded = [];
    for (const file of newFiles) {
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
    setError('');
    setIsSubmitting(true);

    try {
      const newUploaded = await uploadFiles();
      const attachments = [...existingAttachments, ...newUploaded];

      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title: title.trim(),
          content: content.trim(),
          image_url: imageUrl.trim() || null,
          attachment_url: attachments[0]?.url || null,
          attachment_name: attachments[0]?.name || null,
          attachments,
          category: category.length > 0 ? category : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) {
        setError('게시물 수정에 실패했습니다. 다시 시도해주세요.');
      } else {
        navigate(`/posts/${id}`);
      }
    } catch {
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }

  const totalFiles = existingAttachments.length + newFiles.length;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/posts/${id}`)}
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          돌아가기
        </Button>

        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant='h4' sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
            리뷰 수정하기 ✏️
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
                disabled={totalFiles >= MAX_FILES}
              >
                파일 선택 ({ totalFiles }/{ MAX_FILES })
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {existingAttachments.map((att, index) => (
                  <ImageTooltip key={`existing-${index}`} url={att.url} name={att.name}>
                    <Chip
                      label={att.name}
                      onDelete={() => removeExisting(index)}
                      size='small'
                      variant='outlined'
                    />
                  </ImageTooltip>
                ))}
                {newFiles.map((file, index) => (
                  <ImageTooltip key={`new-${index}`} url={URL.createObjectURL(file)} name={file.name}>
                    <Chip
                      label={file.name}
                      onDelete={() => removeNew(index)}
                      size='small'
                    />
                  </ImageTooltip>
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
            />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant='outlined'
                onClick={() => navigate(`/posts/${id}`)}
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
                { isSubmitting ? '수정 중...' : '수정완료' }
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditPostPage;
