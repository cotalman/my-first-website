import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const CATEGORIES = ['음료', '간식', '베이커리', '단백질', '기타'];
const TASTE_OPTIONS = ['달지않음', '적당', '달다'];

/** 랜덤 이미지 시드 생성 */
function generateImageSeeds(count = 6) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 9000) + 1000);
}

/**
 * PostCreatePage 컴포넌트 - 게시물 작성 페이지
 *
 * Example usage:
 * <PostCreatePage />
 */
function PostCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('음료');
  const [calories, setCalories] = useState('');
  const [sugar, setSugar] = useState('');
  const [protein, setProtein] = useState('');
  const [tasteRating, setTasteRating] = useState('적당');
  const [starRating, setStarRating] = useState(3);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [imageSeeds, setImageSeeds] = useState(generateImageSeeds);
  const [imageMode, setImageMode] = useState('random'); // 'random' | 'url'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshImages = () => {
    setImageSeeds(generateImageSeeds());
    setSelectedSeed(null);
  };

  const getFinalImageUrl = () => {
    if (imageMode === 'url' && imageUrl) return imageUrl;
    if (imageMode === 'random' && selectedSeed) return `https://picsum.photos/seed/${selectedSeed}/800/600`;
    return '';
  };

  const handleSubmit = async () => {
    if (!title.trim()) { setError('제목을 입력해주세요.'); return; }
    if (!caption.trim()) { setError('내용을 입력해주세요.'); return; }
    if (!user) { setError('로그인이 필요합니다.'); return; }

    setLoading(true);
    setError('');
    try {
      const { error: err } = await supabase.from('zl_posts').insert({
        user_id: user.id,
        title: title.trim(),
        caption: caption.trim(),
        category,
        calories: parseFloat(calories) || 0,
        sugar: parseFloat(sugar) || 0,
        protein: parseFloat(protein) || 0,
        taste_rating: tasteRating,
        star_rating: starRating,
        image_url: getFinalImageUrl(),
      });
      if (err) throw err;
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>리뷰 작성</Typography>
        </Box>
        <Button
          variant='contained'
          size='small'
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mr: 1, px: 2 }}
        >
          {loading ? <CircularProgress size={18} color='inherit' /> : '게시'}
        </Button>
      </Box>

      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {error && <Alert severity='error' sx={{ borderRadius: 2 }}>{error}</Alert>}

        {/* 제목 */}
        <TextField
          label='제목 *'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          placeholder='제품명이나 리뷰 제목을 입력하세요'
        />

        {/* 카테고리 */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1 }}>카테고리</Typography>
          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={(_e, v) => v && setCategory(v)}
            sx={{ flexWrap: 'wrap', gap: 0.8, '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important', borderRadius: '20px !important', m: 0 } }}
          >
            {CATEGORIES.map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{
                  px: 2,
                  py: 0.6,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } },
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 이미지 선택 */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.88rem' }}>이미지 선택</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['random', 'url'].map((mode) => (
                <Button
                  key={mode}
                  size='small'
                  variant={imageMode === mode ? 'contained' : 'outlined'}
                  onClick={() => setImageMode(mode)}
                  sx={{ fontSize: '0.75rem', py: 0.4, px: 1.5, minHeight: 28 }}
                >
                  {mode === 'random' ? '랜덤 이미지' : 'URL 입력'}
                </Button>
              ))}
            </Box>
          </Box>

          {imageMode === 'url' ? (
            <TextField
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder='이미지 URL을 붙여넣으세요'
              fullWidth
              size='small'
              helperText='Unsplash, 직접 업로드 URL 등 이미지 링크를 입력하세요'
            />
          ) : (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>
                  마음에 드는 이미지를 선택하세요
                </Typography>
                <IconButton size='small' onClick={refreshImages}>
                  <RefreshRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                {imageSeeds.map((seed) => (
                  <Box
                    key={seed}
                    onClick={() => setSelectedSeed(seed)}
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: selectedSeed === seed ? 'primary.main' : 'transparent',
                      aspectRatio: '1',
                    }}
                  >
                    <Box
                      component='img'
                      src={`https://picsum.photos/seed/${seed}/300/300`}
                      alt='이미지 선택'
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {selectedSeed === seed && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          display: 'flex',
                        }}
                      >
                        <CheckCircleRoundedIcon sx={{ fontSize: 20, color: 'white' }} />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* 내용 */}
        <TextField
          label='내용 *'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder='제품 리뷰를 자유롭게 작성해주세요...'
        />

        {/* 영양정보 */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1.2 }}>📊 영양정보</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {[
              { label: '칼로리 (kcal)', value: calories, setter: setCalories },
              { label: '당류 (g)', value: sugar, setter: setSugar },
              { label: '단백질 (g)', value: protein, setter: setProtein },
            ].map((item) => (
              <TextField
                key={item.label}
                label={item.label}
                type='number'
                value={item.value}
                onChange={(e) => item.setter(e.target.value)}
                size='small'
                sx={{ flex: 1 }}
                inputProps={{ min: 0, step: 0.1 }}
              />
            ))}
          </Box>
        </Box>

        {/* 맛 평가 */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1 }}>맛 평가</Typography>
          <ToggleButtonGroup
            value={tasteRating}
            exclusive
            onChange={(_e, v) => v && setTasteRating(v)}
            fullWidth
            sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid !important' } }}
          >
            {TASTE_OPTIONS.map((opt) => (
              <ToggleButton
                key={opt}
                value={opt}
                sx={{
                  py: 1,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } },
                }}
              >
                {opt === '달지않음' ? '🧊 달지않음' : opt === '적당' ? '✅ 적당' : '🍬 달다'}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 별점 */}
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1 }}>별점</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton key={star} size='small' onClick={() => setStarRating(star)} sx={{ p: 0.5 }}>
                {star <= starRating
                  ? <StarRoundedIcon sx={{ color: '#FFE347', fontSize: 32 }} />
                  : <StarBorderRoundedIcon sx={{ color: '#E0E0E0', fontSize: 32 }} />}
              </IconButton>
            ))}
            <Typography sx={{ ml: 1, alignSelf: 'center', fontWeight: 700, color: 'text.secondary' }}>
              {starRating}.0
            </Typography>
          </Box>
        </Box>

        {/* 선택된 이미지 미리보기 */}
        {getFinalImageUrl() && (
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', mb: 1 }}>미리보기</Typography>
            <Box
              component='img'
              src={getFinalImageUrl()}
              alt='미리보기'
              sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 3 }}
            />
          </Box>
        )}

        {/* 제출 버튼 */}
        <Button
          variant='contained'
          size='large'
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          sx={{ py: 1.5, fontSize: '1rem', mt: 1, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : '🥤 리뷰 게시하기'}
        </Button>
      </Box>
    </Box>
  );
}

export default PostCreatePage;
