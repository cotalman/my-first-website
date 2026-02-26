import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ModalSection 컴포넌트
 * MUI Dialog 기반 모달 열기/닫기 섹션
 *
 * Props: 없음
 *
 * Example usage:
 * <ModalSection />
 */
function ModalSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    alert('확인 버튼이 클릭되었습니다!');
    setIsOpen(false);
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
        Modal
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={handleOpen}>
          모달 열기
        </Button>
      </Box>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          모달 제목
          <IconButton aria-label="닫기" onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            이것은 MUI Dialog 컴포넌트를 사용한 모달 예제입니다.
            배경을 클릭하거나 닫기 버튼을 눌러 모달을 닫을 수 있습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            취소
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ModalSection;
