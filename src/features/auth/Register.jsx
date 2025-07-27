import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiHome } from 'react-icons/fi';
import { loginSuccess } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    role: Yup.string()
      .oneOf(['student', 'college', 'incubator'], 'Please select a valid role')
      .required('Role is required'),
    organization: Yup.string()
      .required('Organization/College name is required'),
    phone: Yup.string()
      .matches(/^[+]?[\d\s-()]+$/, 'Invalid phone number')
      .required('Phone number is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Mock registration - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser = {
        id: Date.now(),
        name: values.name,
        email: values.email,
        role: values.role,
        organization: values.organization,
        phone: values.phone,
        avatar: `https://ui-avatars.com/api/?name=${values.name}&background=3b82f6&color=fff`
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      dispatch(loginSuccess({
        user: mockUser,
        token: mockToken
      }));
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
      
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mt-2">
          Join the innovation community today
        </p>
      </div>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          organization: '',
          phone: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-secondary-400" />
                </div>
                <Field
                  name="name"
                  type="text"
                  className="input-field pl-10"
                  placeholder="Enter your full name"
                />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

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

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="input-field"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="college">College Administrator</option>
                <option value="incubator">Incubation Center</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Organization Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                {values.role === 'student' ? 'College/University' : 
                 values.role === 'college' ? 'College Name' : 
                 'Organization Name'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="h-5 w-5 text-secondary-400" />
                </div>
                <Field
                  name="organization"
                  type="text"
                  className="input-field pl-10"
                  placeholder={values.role === 'student' ? 'Enter your college name' : 
                             values.role === 'college' ? 'Enter college name' : 
                             'Enter organization name'}
                />
              </div>
              <ErrorMessage name="organization" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Phone Number
              </label>
              <Field
                name="phone"
                type="tel"
                className="input-field"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
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
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-secondary-400" />
                </div>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5 text-secondary-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-secondary-400" />
                  )}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-secondary-600 dark:text-secondary-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
