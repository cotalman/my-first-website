import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CARDS = [
  {
    id: 'react',
    title: 'React',
    description: '사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반으로 효율적인 UI 개발이 가능합니다.',
    image: 'https://picsum.photos/seed/react/400/200',
  },
  {
    id: 'mui',
    title: 'Material UI',
    description: 'Google의 Material Design을 구현한 React UI 라이브러리입니다. 다양한 컴포넌트를 제공합니다.',
    image: 'https://picsum.photos/seed/mui/400/200',
  },
  {
    id: 'vite',
    title: 'Vite',
    description: '차세대 프론트엔드 빌드 도구입니다. 빠른 개발 서버와 최적화된 빌드를 제공합니다.',
    image: 'https://picsum.photos/seed/vite/400/200',
  },
];

/**
 * HoverCard 컴포넌트
 * 호버 시 elevation이 변경되는 개별 카드
 *
 * Props:
 * @param {string} title - 카드 제목 [Required]
 * @param {string} description - 카드 설명 텍스트 [Required]
 * @param {string} image - 카드 이미지 URL [Required]
 *
 * Example usage:
 * <HoverCard title="React" description="설명" image="https://..." />
 */
function HoverCard({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      elevation={isHovered ? 8 : 1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => alert(`${title} 자세히 보기`)}>
          자세히 보기
        </Button>
        <Button size="small" onClick={() => alert(`${title} 공유하기`)}>
          공유
        </Button>
      </CardActions>
    </Card>
  );
}

/**
 * CardSection 컴포넌트
 * MUI Card 기반 Grid 레이아웃 카드 목록 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <CardSection />
 */
function CardSection() {
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
        Card
      </Typography>
      <Grid container spacing={3}>
        {CARDS.map(({ id, title, description, image }) => (
          <Grid key={id} size={{ xs: 12, md: 4 }}>
            <HoverCard
              title={title}
              description={description}
              image={image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardSection;
