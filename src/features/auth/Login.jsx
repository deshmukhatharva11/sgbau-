import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    dispatch(loginStart());
    
    try {
      // Mock login - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock user data based on email
      let mockUser;
      if (values.email === 'student@example.com') {
        mockUser = {
          id: 1,
          name: 'John Doe',
          email: 'student@example.com',
          role: 'student',
          college: 'MIT',
          department: 'Computer Science',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        };
      } else if (values.email === 'college@example.com') {
        mockUser = {
          id: 2,
          name: 'Dr. Jane Smith',
          email: 'college@example.com',
          role: 'college',
          collegeName: 'MIT',
          position: 'Innovation Director',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
        };
      } else if (values.email === 'incubator@example.com') {
        mockUser = {
          id: 3,
          name: 'Alex Johnson',
          email: 'incubator@example.com',
          role: 'incubator',
          organizationName: 'TechStart Incubator',
          position: 'Program Manager',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        };
      } else if (values.email === 'admin@example.com') {
        mockUser = {
          id: 4,
          name: 'Dr. Rajesh Kumar',
          email: 'admin@example.com',
          role: 'admin',
          organizationName: 'Innovation Hub Maharashtra',
          position: 'Super Administrator',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
        };
      } else {
        throw new Error('Invalid credentials');
      }

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      dispatch(loginSuccess({
        user: mockUser,
        token: mockToken
      }));
      
      toast.success(`Welcome back, ${mockUser.name}!`);
      navigate('/dashboard');
      
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mt-2">
          Sign in to your account to continue
        </p>
      </div>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-secondary-400" />
                </div>
                <Field
                  name="email"
                  type="email"
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-secondary-400" />
                </div>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-secondary-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-secondary-400" />
                  )}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Demo Accounts */}
            <div className="mt-6 p-4 bg-secondary-100 dark:bg-secondary-800 rounded-lg">
              <p className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Demo Accounts:
              </p>
              <div className="space-y-1 text-xs text-secondary-600 dark:text-secondary-400">
                <p>Student: student@example.com / password123</p>
                <p>College: college@example.com / password123</p>
                <p>Incubator: incubator@example.com / password123</p>
                <p>Super Admin: admin@example.com / password123</p>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
