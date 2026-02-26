import { Box } from '@mui/material';
import SectionWrapper from './SectionWrapper';

function Section01_FlexNavigation() {
  const menuItems = ['홈', '소개', '상품', '연락처', '설정'];

  return (
    <SectionWrapper
      title="Flex Navigation"
      description="Flexbox를 활용한 반응형 네비게이션 바 구현"
    >
      {/* 네비게이션 바 */}
      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '60px',
          backgroundColor: '#2d3748',
          px: 3,
          borderRadius: 1,
        }}
      >
        {/* 로고 박스 */}
        <Box
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          MyWebsite
        </Box>

        {/* 메뉴들 박스 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {menuItems.map((item) => (
            <Box
              key={item}
              component="a"
              href="#"
              sx={{
                color: '#a0aec0',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  color: '#ffffff',
                },
              }}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrapper>
  );
}

export default Section01_FlexNavigation;
