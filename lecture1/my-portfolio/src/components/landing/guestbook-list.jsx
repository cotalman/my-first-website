import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase-client';

/** 이름 첫 글자 기반 일관된 색상 */
const AVATAR_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

const getAvatarColor = (name = '') => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

/** 상대 시간 표시 */
const getRelativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '방금 전';
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return new Date(dateStr).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
};

/**
 * GuestbookList 컴포넌트
 * 방명록 목록 표시
 *
 * Props:
 * @param {number} refreshKey - 목록 갱신을 트리거하는 키 값 [Required]
 *
 * Example usage:
 * <GuestbookList refreshKey={refreshKey} />
 */
function GuestbookList({ refreshKey }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('guestbook')
        .select('id, name, message, created_at, profile_image_url')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error) setEntries(data || []);
      setLoading(false);
    };

    fetchEntries();
  }, [refreshKey]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: 'var(--color-primary)' }} />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, color: 'rgba(255,255,255,0.35)' }}>
        <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>💬</Typography>
        <Typography sx={{ fontSize: '0.95rem' }}>
          아직 방명록이 없습니다. 첫 번째 방명록을 남겨보세요!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={ 2 }>
      { entries.map((entry, index) => (
        <Grid key={ entry.id } size={{ xs: 12, sm: 6, md: 4 }}>
          <GuestbookCard entry={ entry } index={ index } />
        </Grid>
      )) }
    </Grid>
  );
}

/**
 * GuestbookCard 컴포넌트
 * 방명록 개별 카드 — testimonial 스타일
 *
 * Props:
 * @param {object} entry - 방명록 데이터 객체 [Required]
 * @param {number} index - 카드 순서 (애니메이션 딜레이용) [Optional, 기본값: 0]
 */
function GuestbookCard({ entry, index = 0 }) {
  const avatarColor = getAvatarColor(entry.name);
  const initial = (entry.name || '?').charAt(0).toUpperCase();
  const relativeTime = getRelativeTime(entry.created_at);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        opacity: 0,
        animation: `fadeUp 0.5s ease ${index * 0.06}s forwards`,
        '@keyframes fadeUp': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        '&:hover': {
          background: 'rgba(255,255,255,0.07)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 메시지 */}
      <Typography
        sx={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.8,
          flex: 1,
          wordBreak: 'break-word',
          pr: 2,
        }}
      >
        { entry.message }
      </Typography>

      {/* 구분선 */}
      <Box sx={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.07)' }} />

      {/* 작성자 정보 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* 아바타 */}
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: entry.profile_image_url ? 'transparent' : 'var(--color-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#fff',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          { entry.profile_image_url ? (
            <Box
              component='img'
              src={ entry.profile_image_url }
              alt={ entry.name }
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : initial }
        </Box>

        {/* 이름 + 시간 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#FFFFFF',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            { entry.name }
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.32)', mt: 0.2 }}>
            { relativeTime }
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default GuestbookList;
