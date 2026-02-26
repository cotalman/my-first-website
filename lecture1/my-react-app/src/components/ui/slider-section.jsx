import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const MARKS = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];

/**
 * SliderSection 컴포넌트
 * MUI Slider 기반 0~100 범위 슬라이더와 실시간 값 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <SliderSection />
 */
function SliderSection() {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        Slider
      </Typography>
      <Box sx={{ px: { xs: 1, md: 3 } }}>
        <Slider
          value={value}
          onChange={handleChange}
          min={0}
          max={100}
          step={1}
          marks={MARKS}
          valueLabelDisplay="auto"
        />
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          textAlign: 'center',
        }}
      >
        현재 값: {value}
      </Typography>
    </Box>
  );
}

export default SliderSection;
