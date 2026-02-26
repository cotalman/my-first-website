import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/common/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { useAuth } from './hooks/use-auth';
import { supabase } from './utils/supabase-client';

/**
 * 인증이 필요한 라우트 보호 컴포넌트
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to='/login' replace />;
}

/**
 * Supabase PASSWORD_RECOVERY 이벤트 감지 후 재설정 페이지로 이동
 */
function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // implicit flow: URL hash에서 recovery 토큰을 직접 파싱하여 세션 명시적 설정
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const tokenType = params.get('type');

    if (tokenType === 'recovery' && accessToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (!error) {
          navigate('/reset-password', { replace: true });
        }
      });
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password', { replace: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <AuthHandler />
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component='main' sx={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<PostListPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/posts/:id' element={<PostDetailPage />} />
            <Route
              path='/posts/:id/edit'
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/posts/new'
              element={
                <ProtectedRoute>
                  <NewPostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='*'
              element={
                window.location.hash.includes('type=recovery')
                  ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                      <CircularProgress />
                    </Box>
                  )
                  : <Navigate to='/' replace />
              }
            />
          </Routes>
        </Box>
      </Box>
    </HashRouter>
  );
}

export default App;
