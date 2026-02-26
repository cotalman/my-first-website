import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Divider from '@mui/material/Divider';

const ITEMS = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'nodejs', label: 'Node.js' },
];

/**
 * CheckboxSection 컴포넌트
 * MUI Checkbox 기반 다중 선택 및 전체 선택/해제 기능 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <CheckboxSection />
 */
function CheckboxSection() {
  const [checked, setChecked] = useState({});

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const isAllChecked = checkedCount === ITEMS.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < ITEMS.length;

  const handleToggle = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    if (isAllChecked) {
      setChecked({});
    } else {
      const allChecked = {};
      ITEMS.forEach(({ id }) => {
        allChecked[id] = true;
      });
      setChecked(allChecked);
    }
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
        Checkbox
      </Typography>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllChecked}
              indeterminate={isIndeterminate}
              onChange={handleToggleAll}
            />
          }
          label="전체 선택"
          sx={{ fontWeight: 600 }}
        />
        <Divider sx={{ my: 1 }} />
        <FormGroup>
          {ITEMS.map(({ id, label }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={!!checked[id]}
                  onChange={() => handleToggle(id)}
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
        }}
      >
        {checkedCount > 0
          ? `${checkedCount}개 항목 선택됨: ${ITEMS.filter(({ id }) => checked[id]).map(({ label }) => label).join(', ')}`
          : '선택된 항목이 없습니다'}
      </Typography>
    </Box>
  );
}

export default CheckboxSection;
