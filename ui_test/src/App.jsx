import { Box, Container, Typography } from '@mui/material';

import { Section01_FlexNavigation } from './components/sections';

function App() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
{/* 섹션 영역 - 새 섹션을 아래에 추가하세요 */}
      <Box>
        <Section01_FlexNavigation />
        {/* ... 추가 섹션 ... */}
      </Box>

      {/* 푸터 */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#e0e0e0',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          UI Test Project — React + MUI
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
