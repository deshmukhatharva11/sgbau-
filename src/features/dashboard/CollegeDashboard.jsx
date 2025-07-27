import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiZap,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiEye,
  FiSend
} from 'react-icons/fi';

const CollegeDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalIdeas: 0,
    pendingEndorsements: 0,
    endorsedIdeas: 0
  });
  const [recentIdeas, setRecentIdeas] = useState([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setStats({
      totalStudents: 245,
      totalIdeas: 67,
      pendingEndorsements: 12,
      endorsedIdeas: 45
    });

    setRecentIdeas([
      {
        id: 1,
        title: 'AI-Powered Study Assistant',
        studentName: 'John Doe',
        submittedAt: '2024-01-20T10:00:00Z',
        status: 'pending',
        category: 'Education Technology'
      },
      {
        id: 2,
        title: 'Smart Campus Navigation',
        studentName: 'Sarah Wilson',
        submittedAt: '2024-01-19T10:00:00Z',
        status: 'pending',
        category: 'Mobile App'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'endorsed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user?.name}! 🎓
        </h1>
        <p className="text-primary-100 mb-4">
          Manage student innovations and endorse promising ideas for incubation.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/endorse"
            className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
          >
            <FiCheckCircle className="mr-2" size={16} />
            Review Ideas
          </Link>
          <Link
            to="/students"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-400 transition-colors duration-200"
          >
            <FiUsers className="mr-2" size={16} />
            Manage Students
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Students
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.totalStudents}
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
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.totalIdeas}
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
                Pending Review
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.pendingEndorsements}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiClock className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Endorsed Ideas
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.endorsedIdeas}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiCheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Ideas for Review */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Ideas Pending Review
            </h2>
            <Link
              to="/endorse"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentIdeas.length === 0 ? (
            <div className="text-center py-8">
              <FiCheckCircle className="mx-auto text-secondary-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                No pending reviews
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                All student ideas have been reviewed!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-secondary-900 dark:text-white">
                        {idea.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                        <FiClock size={12} className="mr-1" />
                        Pending Review
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                      <span>By {idea.studentName}</span>
                      <span>•</span>
                      <span>{idea.category}</span>
                      <span>•</span>
                      <span>Submitted {formatDate(idea.submittedAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/ideas/${idea.id}`}
                      className="btn-outline text-sm"
                    >
                      <FiEye className="mr-1" size={14} />
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/endorse"
              className="flex items-center p-3 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiCheckCircle className="text-primary-600 mr-3" size={20} />
              <span className="font-medium text-secondary-900 dark:text-white">
                Review & Endorse Ideas
              </span>
            </Link>
            <Link
              to="/students"
              className="flex items-center p-3 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiUsers className="text-primary-600 mr-3" size={20} />
              <span className="font-medium text-secondary-900 dark:text-white">
                Manage Students
              </span>
            </Link>
            <Link
              to="/ideas/submit"
              className="flex items-center p-3 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiSend className="text-primary-600 mr-3" size={20} />
              <span className="font-medium text-secondary-900 dark:text-white">
                Refer Ideas to Incubators
              </span>
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            College Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Endorsement Rate
              </span>
              <span className="text-lg font-semibold text-secondary-900 dark:text-white">
                {stats.totalIdeas > 0 ? Math.round((stats.endorsedIdeas / stats.totalIdeas) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full" 
                style={{ 
                  width: `${stats.totalIdeas > 0 ? (stats.endorsedIdeas / stats.totalIdeas) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
              <FiTrendingUp size={16} />
              <span>Strong performance this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboard;
