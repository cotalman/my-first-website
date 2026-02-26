import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt' },
];

/**
 * DropdownSection 컴포넌트
 * MUI Select 기반 드롭다운 메뉴와 선택값 실시간 표시 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <DropdownSection />
 */
function DropdownSection() {
  const [language, setLanguage] = useState('');
  const [framework, setFramework] = useState('');

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
        Dropdown
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="language-select-label">프로그래밍 언어</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              label="프로그래밍 언어"
              onChange={(e) => setLanguage(e.target.value)}
            >
              {PROGRAMMING_LANGUAGES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              minHeight: '1.5em',
              color: 'text.secondary',
            }}
          >
            {language
              ? `선택된 언어: ${PROGRAMMING_LANGUAGES.find((l) => l.value === language)?.label}`
              : '언어를 선택해주세요'}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="framework-select-label">프레임워크</InputLabel>
            <Select
              labelId="framework-select-label"
              id="framework-select"
              value={framework}
              label="프레임워크"
              onChange={(e) => setFramework(e.target.value)}
            >
              {FRAMEWORKS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              minHeight: '1.5em',
              color: 'text.secondary',
            }}
          >
            {framework
              ? `선택된 프레임워크: ${FRAMEWORKS.find((f) => f.value === framework)?.label}`
              : '프레임워크를 선택해주세요'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DropdownSection;
