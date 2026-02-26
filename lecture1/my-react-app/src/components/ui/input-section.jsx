import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const VARIANTS = [
  { variant: 'standard', label: 'Standard', placeholder: 'Standard 입력' },
  { variant: 'outlined', label: 'Outlined', placeholder: 'Outlined 입력' },
  { variant: 'filled', label: 'Filled', placeholder: 'Filled 입력' },
];

/**
 * InputSection 컴포넌트
 * MUI TextField의 variant별 입력 필드와 실시간 입력값 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <InputSection />
 */
function InputSection() {
  const [values, setValues] = useState({
    standard: '',
    outlined: '',
    filled: '',
  });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({
      ...prev,
      [variant]: event.target.value,
    }));
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
        Input
      </Typography>
      <Grid container spacing={3}>
        {VARIANTS.map(({ variant, label, placeholder }) => (
          <Grid key={variant} size={{ xs: 12, md: 4 }}>
            <TextField
              variant={variant}
              label={label}
              placeholder={placeholder}
              value={values[variant]}
              onChange={handleChange(variant)}
              fullWidth
            />
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                minHeight: '1.5em',
                color: 'text.secondary',
                wordBreak: 'break-all',
              }}
            >
              {values[variant] ? `입력값: ${values[variant]}` : '입력값이 없습니다'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default InputSection;
