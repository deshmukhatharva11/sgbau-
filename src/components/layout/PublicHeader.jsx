import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../store/slices/themeSlice';
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiMonitor,
  FiChevronDown,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiBookOpen,
  FiHelpCircle
} from 'react-icons/fi';

const PublicHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const navigation = [
    {
      name: 'Home',
      href: '/',
      current: location.pathname === '/'
    },
    {
      name: 'How It Works',
      href: '/how-it-works',
      current: location.pathname === '/how-it-works'
    },
    {
      name: 'Success Stories',
      href: '/success-stories',
      current: location.pathname === '/success-stories'
    },
    {
      name: 'Resources',
      href: '#',
      dropdown: [
        { name: 'Learning Center', href: '/resources', icon: FiBookOpen },
        { name: 'Mentorship', href: '/mentorship', icon: FiUsers },
        { name: 'Funding Guide', href: '/funding', icon: FiTrendingUp },
        { name: 'Success Tips', href: '/tips', icon: FiAward }
      ]
    },
    {
      name: 'About',
      href: '/about',
      current: location.pathname === '/about'
    },
    {
      name: 'Contact',
      href: '/contact',
      current: location.pathname === '/contact'
    }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: FiSun },
    { value: 'dark', label: 'Dark', icon: FiMoon },
    { value: 'system', label: 'System', icon: FiMonitor }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-200">
                <FiZap className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-bold ${
                  isScrolled ? 'text-secondary-900 dark:text-white' : 'text-white'
                }`}>
                  Innovation Hub
                </span>
                <div className={`text-xs ${
                  isScrolled ? 'text-secondary-600 dark:text-secondary-400' : 'text-primary-200'
                }`}>
                  Maharashtra
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isScrolled
                        ? 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                        : 'text-white hover:text-primary-200'
                    }`}>
                      <span>{item.name}</span>
                      <FiChevronDown size={16} className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-secondary-800 rounded-lg shadow-xl border border-secondary-200 dark:border-secondary-700 py-2">
                        {item.dropdown.map((dropdownItem) => {
                          const Icon = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                            >
                              <Icon size={18} />
                              <span>{dropdownItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      item.current
                        ? isScrolled
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-primary-200'
                        : isScrolled
                          ? 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                          : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Selector */}
            <div className="relative">
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('theme')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`p-2 rounded-lg transition-colors duration-200 ${
                  isScrolled
                    ? 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                    : 'text-white hover:bg-white/10'
                }`}>
                  {mode === 'light' ? <FiSun size={20} /> : mode === 'dark' ? <FiMoon size={20} /> : <FiMonitor size={20} />}
                </button>
                
                {activeDropdown === 'theme' && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-secondary-800 rounded-lg shadow-xl border border-secondary-200 dark:border-secondary-700 py-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleThemeChange(option.value)}
                          className={`flex items-center space-x-3 w-full px-4 py-2 text-sm transition-colors duration-200 ${
                            mode === option.value
                              ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                              : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isScrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-white text-primary-600 hover:bg-primary-50'
                }`}
              >
                <FiUser size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isScrolled
                      ? 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <FiLogIn size={16} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isScrolled
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <FiUserPlus size={16} />
                  <span className="hidden sm:inline">Sign Up</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white mb-2">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.dropdown.map((dropdownItem) => {
                          const Icon = dropdownItem.icon;
                          return (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="flex items-center space-x-3 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Icon size={16} />
                              <span>{dropdownItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                        item.current
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 space-y-3">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-secondary-700 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiLogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
