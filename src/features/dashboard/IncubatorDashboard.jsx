import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiZap,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiEye,
  FiBarChart2,
  FiMapPin,
  FiUsers
} from 'react-icons/fi';

const IncubatorDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalIdeas: 0,
    pendingReview: 0,
    acceptedIdeas: 0,
    activeProjects: 0
  });
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [regionalStats, setRegionalStats] = useState([]);
  const [collegeStats, setCollegeStats] = useState([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setStats({
      totalIdeas: 156,
      pendingReview: 23,
      acceptedIdeas: 89,
      activeProjects: 34
    });

    setRecentIdeas([
      {
        id: 1,
        title: 'AI-Powered Study Assistant',
        studentName: 'Rahul Sharma',
        college: 'Shivaji College',
        submittedAt: '2024-01-20T10:00:00Z',
        status: 'pending',
        category: 'Education Technology'
      },
      {
        id: 2,
        title: 'Sustainable Energy Monitor',
        studentName: 'Priya Patil',
        college: 'Jotiba Fule College',
        submittedAt: '2024-01-19T10:00:00Z',
        status: 'pending',
        category: 'Green Technology'
      }
    ]);

    setRegionalStats([
      { region: 'Amravati', ideas: 45, colleges: 3, avgRating: 4.3 },
      { region: 'Daryapur', ideas: 38, colleges: 2, avgRating: 4.1 },
      { region: 'Achalpur', ideas: 32, colleges: 2, avgRating: 4.0 },
      { region: 'Murtizapur', ideas: 28, colleges: 2, avgRating: 3.9 },
      { region: 'Bhatkuli', ideas: 25, colleges: 1, avgRating: 4.2 },
      { region: 'Paratwada', ideas: 22, colleges: 1, avgRating: 3.8 },
      { region: 'Badnera', ideas: 18, colleges: 1, avgRating: 4.0 }
    ]);

    setCollegeStats([
      {
        id: 1,
        name: 'Shivaji College',
        location: 'Amravati, Maharashtra',
        totalStudents: 245,
        totalIdeas: 45,
        pendingIdeas: 8,
        endorsedIdeas: 28,
        acceptedIdeas: 15,
        successRate: 85
      },
      {
        id: 2,
        name: 'Jotiba Fule College',
        location: 'Daryapur, Maharashtra',
        totalStudents: 198,
        totalIdeas: 38,
        pendingIdeas: 6,
        endorsedIdeas: 22,
        acceptedIdeas: 12,
        successRate: 78
      },
      {
        id: 3,
        name: 'Tukdoji Maharaj College',
        location: 'Achalpur, Maharashtra',
        totalStudents: 167,
        totalIdeas: 32,
        pendingIdeas: 5,
        endorsedIdeas: 18,
        acceptedIdeas: 10,
        successRate: 72
      },
      {
        id: 4,
        name: 'J D Patil College',
        location: 'Murtizapur, Maharashtra',
        totalStudents: 189,
        totalIdeas: 28,
        pendingIdeas: 4,
        endorsedIdeas: 16,
        acceptedIdeas: 8,
        successRate: 68
      },
      {
        id: 5,
        name: 'Biyani College',
        location: 'Bhatkuli, Maharashtra',
        totalStudents: 156,
        totalIdeas: 25,
        pendingIdeas: 3,
        endorsedIdeas: 14,
        acceptedIdeas: 7,
        successRate: 65
      },
      {
        id: 6,
        name: 'Ekvira College',
        location: 'Paratwada, Maharashtra',
        totalStudents: 134,
        totalIdeas: 22,
        pendingIdeas: 4,
        endorsedIdeas: 12,
        acceptedIdeas: 6,
        successRate: 62
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'accepted': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
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
          Welcome, {user?.name}! 🚀
        </h1>
        <p className="text-primary-100 mb-4">
          Discover and nurture the next generation of innovative ideas.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/review"
            className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
          >
            <FiEye className="mr-2" size={16} />
            Review Ideas
          </Link>
          <Link
            to="/analytics"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-400 transition-colors duration-200"
          >
            <FiBarChart2 className="mr-2" size={16} />
            View Analytics
          </Link>
        </div>
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
                {stats.pendingReview}
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
                Accepted Ideas
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.acceptedIdeas}
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
                Active Projects
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {stats.activeProjects}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ideas Pending Review */}
        <div className="card">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                Ideas Pending Review
              </h2>
              <Link
                to="/review"
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
                  All ideas have been reviewed!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-secondary-900 dark:text-white">
                        {idea.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                        <FiClock size={12} className="mr-1" />
                        Pending
                      </span>
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                      <p>By {idea.studentName} from {idea.college}</p>
                      <p>{idea.category} • Submitted {formatDate(idea.submittedAt)}</p>
                    </div>
                    <Link
                      to={`/ideas/${idea.id}`}
                      className="btn-outline text-sm"
                    >
                      <FiEye className="mr-1" size={14} />
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="card">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Regional Overview
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {regionalStats.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                      <FiMapPin className="text-primary-600 dark:text-primary-400" size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        {region.region}
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {region.colleges} colleges
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {region.ideas}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      ideas
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Area-wise Overview */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            Area-wise Innovation Hub
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalStats.map((region, index) => (
              <Link
                key={index}
                to={`/areas/${region.region}`}
                className="block p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors duration-200">
                    <FiMapPin className="text-primary-600 dark:text-primary-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {region.region}
                    </h3>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {region.colleges} colleges
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      Total Ideas
                    </span>
                    <span className="font-semibold text-secondary-900 dark:text-white">
                      {region.ideas}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      Avg Rating
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-secondary-900 dark:text-white">
                        {region.avgRating}
                      </span>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(region.avgRating)
                                ? 'bg-yellow-400'
                                : 'bg-secondary-300 dark:bg-secondary-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* College-wise Overview */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
            College-wise Performance
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collegeStats.map((college, index) => (
              <Link
                key={index}
                to={`/colleges/${college.id}`}
                className="block p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {college.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {college.name}
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {college.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {college.totalStudents}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      Students
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-secondary-900 dark:text-white">
                      {college.totalIdeas}
                    </p>
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">
                      Ideas
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm font-semibold text-yellow-600">
                      {college.pendingIdeas}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Pending
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-600">
                      {college.endorsedIdeas}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Endorsed
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600">
                      {college.acceptedIdeas}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Accepted
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600 dark:text-secondary-400">
                      Success Rate
                    </span>
                    <span className="font-semibold text-secondary-900 dark:text-white">
                      {college.successRate}%
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${college.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/review"
            className="flex items-center p-4 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
          >
            <FiEye className="text-primary-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-secondary-900 dark:text-white">
                Review Ideas
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Evaluate new submissions
              </p>
            </div>
          </Link>
          
          <Link
            to="/analytics"
            className="flex items-center p-4 rounded-lg border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
          >
            <FiBarChart2 className="text-primary-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-secondary-900 dark:text-white">
                View Analytics
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Track performance metrics
              </p>
            </div>
          </Link>
          
          <div className="flex items-center p-4 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800">
            <FiUsers className="text-primary-600 mr-3" size={20} />
            <div>
              <p className="font-medium text-secondary-900 dark:text-white">
                Mentor Network
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncubatorDashboard;
