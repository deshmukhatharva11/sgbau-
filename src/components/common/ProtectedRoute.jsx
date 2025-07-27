import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../store/slices/authSlice';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in but user data is missing
    if (token && !user) {
      // In a real app, you would fetch user data from the API
      // For now, we'll use mock data based on the token
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'student@example.com',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      };
      dispatch(setUser(mockUser));
    }
  }, [token, user, dispatch]);

  // If not authenticated, redirect to login
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  // If user data is still loading
  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
