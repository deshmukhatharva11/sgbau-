import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { setTheme } from './store/slices/themeSlice';
import ErrorBoundary from './components/common/ErrorBoundary';


// Layout Components
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Components
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Dashboard Components
import StudentDashboard from './features/dashboard/StudentDashboard';
import CollegeDashboard from './features/dashboard/CollegeDashboard';
import IncubatorDashboard from './features/dashboard/IncubatorDashboard';

// Feature Components
import SubmitIdea from './features/ideas/SubmitIdea';
import MyIdeas from './features/ideas/MyIdeas';
import IdeaDetail from './features/ideas/IdeaDetail';
import StudentManagement from './features/admin/StudentManagement';
import EndorseIdeas from './features/endorsements/EndorseIdeas';
import IdeaReview from './features/ideas/IdeaReview';
import Analytics from './features/analytics/Analytics';
import CollegeDetail from './features/colleges/CollegeDetail';
import AreaDetail from './features/areas/AreaDetail';
import Profile from './features/profile/Profile';
import Settings from './features/profile/Settings';
import SuperAdminDashboard from './features/admin/SuperAdminDashboard';
import UserManagement from './features/admin/UserManagement';
import SystemSettings from './features/admin/SystemSettings';
import HomePage from './features/home/HomePage';
import PublicLayout from './components/layout/PublicLayout';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

function AppContent() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    // Apply initial theme
    dispatch(setTheme(mode));
  }, [dispatch, mode]);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-200">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <RoleDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Student Routes */}
          <Route path="/ideas/submit" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout><SubmitIdea /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/ideas/my" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout><MyIdeas /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* College Routes */}
          <Route path="/students" element={
            <ProtectedRoute allowedRoles={['college']}>
              <DashboardLayout><StudentManagement /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/endorse" element={
            <ProtectedRoute allowedRoles={['college']}>
              <DashboardLayout><EndorseIdeas /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Incubator Routes */}
          <Route path="/review" element={
            <ProtectedRoute allowedRoles={['incubator']}>
              <DashboardLayout><IdeaReview /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute allowedRoles={['incubator']}>
              <DashboardLayout><Analytics /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/colleges/:id" element={
            <ProtectedRoute allowedRoles={['incubator']}>
              <DashboardLayout><CollegeDetail /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/areas/:areaName" element={
            <ProtectedRoute allowedRoles={['incubator']}>
              <DashboardLayout><AreaDetail /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Super Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout><SuperAdminDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout><UserManagement /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout><SystemSettings /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Shared Routes */}
          <Route path="/ideas/:id" element={
            <ProtectedRoute>
              <DashboardLayout><IdeaDetail /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <DashboardLayout><Profile /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout><Settings /></DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Default Routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: mode === 'dark' ? '#1e293b' : '#ffffff',
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
          },
        }}
      />
    </div>
  );
}

// Role-based dashboard component
function RoleDashboard() {
  const { user } = useSelector((state) => state.auth);

  switch (user?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'college':
      return <CollegeDashboard />;
    case 'incubator':
      return <IncubatorDashboard />;
    case 'admin':
      return <SuperAdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}


function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;