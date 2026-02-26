import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AppLayout from './components/common/AppLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';
import MyPage from './pages/MyPage';
import RankingPage from './pages/RankingPage';

/** 인증 필요 라우트 */
function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color='primary' size={48} />
      </Box>
    );
  }

  return user ? <Outlet /> : <Navigate to='/login' replace />;
}

/** 로그인 상태에서 로그인 페이지 접근 시 홈으로 이동 */
function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color='primary' size={48} />
      </Box>
    );
  }

  return user ? <Navigate to='/' replace /> : <Outlet />;
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* 공개 라우트 */}
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>

        {/* 인증 필요 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/posts' element={<PostListPage />} />
            <Route path='/posts/create' element={<PostCreatePage />} />
            <Route path='/posts/:id' element={<PostDetailPage />} />
            <Route path='/ranking' element={<RankingPage />} />
            <Route path='/my' element={<MyPage />} />
          </Route>
        </Route>

        {/* 기타 경로 → 홈으로 */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
