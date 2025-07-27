import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { 
  setNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification 
} from '../../store/slices/notificationSlice';

const NotificationDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    // Load mock notifications
    const mockNotifications = [
      {
        id: 1,
        title: 'Idea Endorsed',
        message: 'Your idea "AI-Powered Study Assistant" has been endorsed by MIT',
        type: 'endorsement',
        read: false,
        createdAt: '2024-01-22T10:00:00Z',
        actionUrl: '/ideas/1'
      },
      {
        id: 2,
        title: 'New Comment',
        message: 'Alex Johnson commented on your idea "Sustainable Energy Monitor"',
        type: 'comment',
        read: false,
        createdAt: '2024-01-23T10:00:00Z',
        actionUrl: '/ideas/2'
      },
      {
        id: 3,
        title: 'Idea Submitted',
        message: 'Your idea has been successfully submitted for review',
        type: 'submission',
        read: true,
        createdAt: '2024-01-21T10:00:00Z',
        actionUrl: '/ideas/my'
      }
    ];
    dispatch(setNotifications(mockNotifications));
  }, [dispatch]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    onClose();
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDeleteNotification = (e, notificationId) => {
    e.stopPropagation();
    dispatch(deleteNotification(notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'endorsement':
        return '✅';
      case 'comment':
        return '💬';
      case 'submission':
        return '📝';
      default:
        return '🔔';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
          Notifications
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-secondary-500 dark:text-secondary-400">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`
                p-4 border-b border-secondary-100 dark:border-secondary-700 cursor-pointer hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200
                ${!notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-2">
                        {formatTimeAgo(notification.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                      
                      <button
                        onClick={(e) => handleDeleteNotification(e, notification.id)}
                        className="p-1 text-secondary-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-secondary-200 dark:border-secondary-700">
          <button
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
            className="w-full text-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 py-2"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
