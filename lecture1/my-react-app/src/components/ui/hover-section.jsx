import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const HOVER_EFFECTS = [
  {
    id: 'shadow',
    label: 'Shadow',
    description: '그림자 효과',
    sx: {
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      },
    },
  },
  {
    id: 'scale',
    label: 'Scale Up',
    description: '크기 확대',
    sx: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.08)',
      },
    },
  },
  {
    id: 'color',
    label: 'Color',
    description: '배경색 변화',
    sx: {
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        '& .hover-desc': {
          color: 'primary.contrastText',
        },
      },
    },
  },
  {
    id: 'border',
    label: 'Border',
    description: '테두리 강조',
    sx: {
      border: '2px solid transparent',
      transition: 'border-color 0.3s ease, transform 0.3s ease',
      '&:hover': {
        borderColor: 'secondary.main',
        transform: 'translateY(-4px)',
      },
    },
  },
  {
    id: 'glow',
    label: 'Glow',
    description: '네온 글로우',
    sx: {
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: '0 0 16px rgba(25,118,210,0.6), 0 0 32px rgba(25,118,210,0.3)',
      },
    },
  },
  {
    id: 'rotate',
    label: 'Rotate',
    description: '살짝 회전',
    sx: {
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'rotate(3deg) scale(1.05)',
      },
    },
  },
];

/**
 * HoverSection 컴포넌트
 * 다양한 CSS 호버 효과를 보여주는 카드 목록 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <HoverSection />
 */
function HoverSection() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: 'center',
        }}
      >
        Hover
      </Typography>
      <Grid container spacing={2}>
        {HOVER_EFFECTS.map(({ id, label, description, sx }) => (
          <Grid key={id} size={{ xs: 6, md: 4 }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                ...sx,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
              <Typography
                className="hover-desc"
                variant="body2"
                sx={{ color: 'text.secondary', mt: 0.5 }}
              >
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HoverSection;
