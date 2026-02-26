import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const VARIANTS = ['contained', 'outlined', 'text'];
const COLORS = ['primary', 'secondary', 'error'];

/**
 * ButtonSection 컴포넌트
 * MUI Button의 variant와 color 조합을 보여주는 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <ButtonSection />
 */
function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`${variant} / ${color} 버튼이 클릭되었습니다!`);
  };

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
        Button
      </Typography>
      <Grid container spacing={2}>
        {VARIANTS.map((variant) =>
          COLORS.map((color) => (
            <Grid key={`${variant}-${color}`} size={{ xs: 6, md: 4 }}>
              <Button
                variant={variant}
                color={color}
                fullWidth
                onClick={() => handleClick(variant, color)}
                sx={{ textTransform: 'none' }}
              >
                {variant} / {color}
              </Button>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default ButtonSection;
