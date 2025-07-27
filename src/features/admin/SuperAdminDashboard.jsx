import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiZap,
  FiMapPin,
  FiTrendingUp,
  FiActivity,
  FiShield,
  FiSettings,
  FiDownload,
  FiRefreshCw,
  FiAlertTriangle,
  FiCheckCircle,
  FiBarChart2
} from 'react-icons/fi';

const SuperAdminDashboard = () => {
  const [systemStats, setSystemStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setSystemStats({
      totalUsers: 1247,
      totalColleges: 45,
      totalAreas: 12,
      totalIdeas: 3456,
      activeUsers: 892,
      pendingApprovals: 23,
      systemUptime: '99.9%',
      dataStorage: '2.3 TB'
    });

    setUserStats({
      students: 1089,
      collegeAdmins: 45,
      incubatorManagers: 12,
      superAdmins: 3,
      activeToday: 234,
      newThisWeek: 67
    });

    setSystemHealth({
      serverStatus: 'healthy',
      databaseStatus: 'healthy',
      apiResponseTime: '120ms',
      errorRate: '0.02%',
      lastBackup: '2 hours ago',
      securityAlerts: 0
    });

    setRecentActivity([
      {
        id: 1,
        type: 'user_registration',
        description: 'New student registered: Amit Sharma from Shivaji College',
        timestamp: '2024-01-25T14:30:00Z',
        severity: 'info'
      },
      {
        id: 2,
        type: 'idea_submission',
        description: 'New idea submitted: "Smart Agriculture System" by Priya Patil',
        timestamp: '2024-01-25T14:15:00Z',
        severity: 'info'
      },
      {
        id: 3,
        type: 'college_approval',
        description: 'College admin approved: Dr. Rajesh Kumar for Tukdoji Maharaj College',
        timestamp: '2024-01-25T13:45:00Z',
        severity: 'success'
      },
      {
        id: 4,
        type: 'system_alert',
        description: 'High server load detected - Auto-scaling triggered',
        timestamp: '2024-01-25T13:30:00Z',
        severity: 'warning'
      },
      {
        id: 5,
        type: 'security_event',
        description: 'Failed login attempts from IP: 192.168.1.100 (Blocked)',
        timestamp: '2024-01-25T13:00:00Z',
        severity: 'error'
      }
    ]);

    setLoading(false);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration': return FiUsers;
      case 'idea_submission': return FiZap;
      case 'college_approval': return FiCheckCircle;
      case 'system_alert': return FiAlertTriangle;
      case 'security_event': return FiShield;
      default: return FiActivity;
    }
  };

  const getActivityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Complete system overview and management
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-outline">
            <FiDownload className="mr-2" size={16} />
            Export Data
          </button>
          <button className="btn-outline">
            <FiRefreshCw className="mr-2" size={16} />
            Refresh
          </button>
          <Link to="/admin/settings" className="btn-primary">
            <FiSettings className="mr-2" size={16} />
            System Settings
          </Link>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Users
              </p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {systemStats.totalUsers?.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +{userStats.newThisWeek} this week
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiUsers className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Ideas
              </p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {systemStats.totalIdeas?.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +156 this month
              </p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <FiZap className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Active Colleges
              </p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {systemStats.totalColleges}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Across {systemStats.totalAreas} areas
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiMapPin className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                System Uptime
              </p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                {systemStats.systemUptime}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Excellent performance
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiTrendingUp className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Quick Actions
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/users"
              className="flex items-center p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiUsers className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Manage Users</p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">View and edit all users</p>
              </div>
            </Link>

            <Link
              to="/admin/colleges"
              className="flex items-center p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiMapPin className="text-green-600 dark:text-green-400 mr-3" size={20} />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Manage Colleges</p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">College administration</p>
              </div>
            </Link>

            <Link
              to="/admin/ideas"
              className="flex items-center p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiZap className="text-primary-600 dark:text-primary-400 mr-3" size={20} />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Manage Ideas</p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">Review all submissions</p>
              </div>
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiBarChart2 className="text-purple-600 dark:text-purple-400 mr-3" size={20} />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">System Analytics</p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">Detailed insights</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="card">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              User Distribution
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-secondary-700 dark:text-secondary-300">Students</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-secondary-900 dark:text-white">
                    {userStats.students?.toLocaleString()}
                  </span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-2">
                    ({((userStats.students / systemStats.totalUsers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-secondary-700 dark:text-secondary-300">College Admins</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-secondary-900 dark:text-white">
                    {userStats.collegeAdmins}
                  </span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-2">
                    ({((userStats.collegeAdmins / systemStats.totalUsers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-secondary-700 dark:text-secondary-300">Incubator Managers</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-secondary-900 dark:text-white">
                    {userStats.incubatorManagers}
                  </span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-2">
                    ({((userStats.incubatorManagers / systemStats.totalUsers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-secondary-700 dark:text-secondary-300">Super Admins</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-secondary-900 dark:text-white">
                    {userStats.superAdmins}
                  </span>
                  <span className="text-sm text-secondary-500 dark:text-secondary-400 ml-2">
                    ({((userStats.superAdmins / systemStats.totalUsers) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">Active Today</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {userStats.activeToday} users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="card">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              System Health
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">Server Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {systemHealth.serverStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {systemHealth.databaseStatus}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">API Response Time</span>
                <span className="text-sm font-medium text-secondary-900 dark:text-white">
                  {systemHealth.apiResponseTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">Error Rate</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {systemHealth.errorRate}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">Last Backup</span>
                <span className="text-sm font-medium text-secondary-900 dark:text-white">
                  {systemHealth.lastBackup}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300">Security Alerts</span>
                <div className="flex items-center space-x-2">
                  <FiShield className="text-green-500" size={14} />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {systemHealth.securityAlerts} active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              to="/admin/activity"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.severity)}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-secondary-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
