import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const OPTIONS = [
  { value: 'frontend', label: '프론트엔드 개발자' },
  { value: 'backend', label: '백엔드 개발자' },
  { value: 'fullstack', label: '풀스택 개발자' },
  { value: 'mobile', label: '모바일 개발자' },
  { value: 'devops', label: 'DevOps 엔지니어' },
];

/**
 * RadioSection 컴포넌트
 * MUI Radio/RadioGroup 기반 단일 선택 라디오 버튼 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <RadioSection />
 */
function RadioSection() {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
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
        Radio
      </Typography>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend">희망 직무를 선택하세요</FormLabel>
        <RadioGroup value={selected} onChange={handleChange}>
          {OPTIONS.map(({ value, label }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
        }}
      >
        {selected
          ? `선택된 직무: ${OPTIONS.find((o) => o.value === selected)?.label}`
          : '직무를 선택해주세요'}
      </Typography>
    </Box>
  );
}

export default RadioSection;
