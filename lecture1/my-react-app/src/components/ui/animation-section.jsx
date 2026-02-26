import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

/**
 * AnimationSection 컴포넌트
 * MUI 트랜지션(Fade, Grow, Slide)과 CSS keyframes 애니메이션 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <AnimationSection />
 */
function AnimationSection() {
  const [showFade, setShowFade] = useState(false);
  const [showGrow, setShowGrow] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

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
        Animation
      </Typography>

      {/* MUI 트랜지션 */}
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
        MUI Transitions
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowFade((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Fade {showFade ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Fade in={showFade} timeout={600}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                Fade 효과
              </Paper>
            </Fade>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowGrow((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Grow {showGrow ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grow in={showGrow} timeout={600}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
                Grow 효과
              </Paper>
            </Grow>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowSlide((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Slide {showSlide ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <Slide direction="up" in={showSlide} timeout={600} mountOnEnter unmountOnExit>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: 'error.main', color: 'error.contrastText' }}>
                Slide 효과
              </Paper>
            </Slide>
          </Box>
        </Grid>
      </Grid>

      {/* CSS 애니메이션 */}
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
        CSS Animations
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsBouncing((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Bounce {isBouncing ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'success.main',
                color: 'success.contrastText',
                animation: isBouncing ? `${bounce} 0.8s ease infinite` : 'none',
              }}
            >
              Bounce 효과
            </Paper>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsSpinning((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Spin {isSpinning ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'warning.main',
                color: 'warning.contrastText',
                animation: isSpinning ? `${spin} 1.5s linear infinite` : 'none',
              }}
            >
              Spin 효과
            </Paper>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsPulsing((prev) => !prev)}
            sx={{ mb: 2, textTransform: 'none' }}
          >
            Pulse {isPulsing ? 'OFF' : 'ON'}
          </Button>
          <Box sx={{ minHeight: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'info.main',
                color: 'info.contrastText',
                animation: isPulsing ? `${pulse} 1.2s ease infinite` : 'none',
              }}
            >
              Pulse 효과
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnimationSection;
