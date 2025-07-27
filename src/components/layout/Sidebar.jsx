import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiZap,
  FiPlus,
  FiUsers,
  FiCheckCircle,
  FiEye,
  FiBarChart2,
  FiX,
  FiSend,
  FiUser,
  FiSettings
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const location = useLocation();

  const getNavigationItems = () => {
    const commonItems = [
      { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    ];

    switch (userRole) {
      case 'student':
        return [
          ...commonItems,
          { path: '/ideas/submit', icon: FiPlus, label: 'Submit Idea' },
          { path: '/ideas/my', icon: FiZap, label: 'My Ideas' },
        ];
      
      case 'college':
        return [
          ...commonItems,
          { path: '/students', icon: FiUsers, label: 'Students' },
          { path: '/endorse', icon: FiCheckCircle, label: 'Endorse Ideas' },
          { path: '/ideas/submit', icon: FiSend, label: 'Refer Ideas' },
        ];
      
      case 'incubator':
        return [
          ...commonItems,
          { path: '/review', icon: FiEye, label: 'Review Ideas' },
          { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
        ];

      case 'admin':
        return [
          { path: '/admin', icon: FiHome, label: 'Dashboard' },
          { path: '/admin/users', icon: FiUsers, label: 'User Management' },
          { path: '/admin/settings', icon: FiSettings, label: 'System Settings' },
        ];

      default:
        return commonItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IH</span>
            </div>
            <span className="text-lg font-semibold text-secondary-900 dark:text-white">
              Innovation Hub
            </span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-secondary-500 hover:bg-secondary-100 dark:hover:bg-secondary-700"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2 flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    sidebar-link
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-secondary-200 dark:border-secondary-700 my-4"></div>

          {/* Profile & Settings */}
          <div className="space-y-2">
            <NavLink
              to="/profile"
              onClick={onClose}
              className={`
                sidebar-link
                ${location.pathname === '/profile' ? 'active' : ''}
              `}
            >
              <FiUser size={20} className="mr-3" />
              <span className="font-medium">Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              onClick={onClose}
              className={`
                sidebar-link
                ${location.pathname === '/settings' ? 'active' : ''}
              `}
            >
              <FiSettings size={20} className="mr-3" />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* Role Badge */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300 capitalize">
                {userRole} Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
