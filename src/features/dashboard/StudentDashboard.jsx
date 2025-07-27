import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiZap,
  FiCheckCircle,
  FiClock,
  FiX,
  FiEye,
  FiMessageCircle,
  FiTrendingUp
} from 'react-icons/fi';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    pendingIdeas: 0,
    endorsedIdeas: 0,
    rejectedIdeas: 0
  });
  const [recentIdeas, setRecentIdeas] = useState([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setStats({
      totalIdeas: 3,
      pendingIdeas: 1,
      endorsedIdeas: 1,
      rejectedIdeas: 1
    });

    setRecentIdeas([
      {
        id: 1,
        title: 'AI-Powered Study Assistant',
        status: 'pending',
        submittedAt: '2024-01-20T10:00:00Z',
        views: 45,
        comments: 3
      },
      {
        id: 2,
        title: 'Sustainable Energy Monitor',
        status: 'endorsed',
        submittedAt: '2024-01-18T10:00:00Z',
        views: 78,
        comments: 5
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock size={16} />;
      case 'endorsed': return <FiCheckCircle size={16} />;
      case 'rejected': return <FiX size={16} />;
      default: return <FiZap size={16} />;
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
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-primary-100 mb-4">
          Ready to share your next innovative idea with the world?
        </p>
        <Link
          to="/ideas/submit"
          className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
        >
          <FiPlus className="mr-2" size={16} />
          Submit New Idea
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {stats.pendingIdeas}
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
                Endorsed
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

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Success Rate
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.totalIdeas > 0 ? Math.round((stats.endorsedIdeas / stats.totalIdeas) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Ideas */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Recent Ideas
            </h2>
            <Link
              to="/ideas/my"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentIdeas.length === 0 ? (
            <div className="text-center py-8">
              <FiZap className="mx-auto text-secondary-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                No ideas yet
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                Start by submitting your first innovative idea!
              </p>
              <Link
                to="/ideas/submit"
                className="btn-primary"
              >
                Submit Your First Idea
              </Link>
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
                        {getStatusIcon(idea.status)}
                        <span className="ml-1 capitalize">{idea.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                      <span>Submitted {formatDate(idea.submittedAt)}</span>
                      <div className="flex items-center space-x-1">
                        <FiEye size={14} />
                        <span>{idea.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiMessageCircle size={14} />
                        <span>{idea.comments} comments</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/ideas/${idea.id}`}
                    className="btn-outline text-sm"
                  >
                    View Details
                  </Link>
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
              to="/ideas/submit"
              className="flex items-center p-3 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiPlus className="text-primary-600 mr-3" size={20} />
              <span className="font-medium text-secondary-900 dark:text-white">
                Submit New Idea
              </span>
            </Link>
            <Link
              to="/ideas/my"
              className="flex items-center p-3 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
            >
              <FiZap className="text-primary-600 mr-3" size={20} />
              <span className="font-medium text-secondary-900 dark:text-white">
                Manage My Ideas
              </span>
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Tips for Success
          </h3>
          <div className="space-y-3 text-sm text-secondary-600 dark:text-secondary-400">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Write clear, detailed descriptions of your ideas</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Include technical specifications and implementation plans</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Respond promptly to feedback from reviewers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
