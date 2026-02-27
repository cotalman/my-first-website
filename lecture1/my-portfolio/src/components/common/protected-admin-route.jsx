import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPasswordDialog from '../ui/admin-password-dialog';

const SESSION_KEY = 'adminAuth';

/**
 * ProtectedAdminRoute 컴포넌트
 * 관리자 페이지 접근 보호 — 인증되지 않은 경우 비밀번호 다이얼로그 표시
 *
 * Props:
 * @param {React.ReactNode} children - 인증 후 렌더링할 콘텐츠 [Required]
 *
 * Example usage:
 * <ProtectedAdminRoute><AdminPage /></ProtectedAdminRoute>
 */
function ProtectedAdminRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem(SESSION_KEY) === 'true'
  );
  const [dialogOpen, setDialogOpen] = useState(!isAuthenticated);

  const handleSuccess = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    navigate('/');
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <>
      {/* 잠금 화면 */}
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 28, color: 'var(--color-text-muted)' }} />
        </Box>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          관리자 전용 페이지
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
          }}
        >
          비밀번호를 입력해야 접근할 수 있습니다.
        </Typography>
      </Box>

      <AdminPasswordDialog
        isOpen={ dialogOpen }
        onClose={ handleClose }
        onSuccess={ handleSuccess }
      />
    </>
  );
}

export default ProtectedAdminRoute;
