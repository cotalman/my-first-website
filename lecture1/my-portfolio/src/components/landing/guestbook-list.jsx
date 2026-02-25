import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase-client';

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
        .select('id, name, message, created_at')
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
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        <Typography sx={{ fontSize: '2rem', mb: 1 }}>💬</Typography>
        <Typography sx={{ fontSize: '0.95rem' }}>
          아직 방명록이 없습니다. 첫 번째 방명록을 남겨보세요!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={ 2 }>
      { entries.map((entry) => (
        <Grid key={ entry.id } size={{ xs: 12, md: 6 }}>
          <GuestbookCard entry={ entry } />
        </Grid>
      )) }
    </Grid>
  );
}

/**
 * GuestbookCard 컴포넌트
 * 방명록 개별 카드
 *
 * Props:
 * @param {object} entry - 방명록 데이터 객체 [Required]
 */
function GuestbookCard({ entry }) {
  const date = new Date(entry.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 2,
        p: 3,
        height: '100%',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: 'rgba(255,0,0,0.4)',
        },
      }}
    >
      {/* 상단: 이름 + 날짜 */}
      <Box sx={{ mb: 1.5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: '0.95rem',
            mb: 0.3,
          }}
        >
          { entry.name }
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
          { date }
        </Typography>
      </Box>

      {/* 메시지 */}
      <Typography
        sx={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.7,
          wordBreak: 'break-word',
        }}
      >
        { entry.message }
      </Typography>

    </Box>
  );
}

export default GuestbookList;
