import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiZap, 
  FiCheckCircle, 
  FiClock, 
  FiX,
  FiEye,
  FiMessageCircle,
  FiSearch,
  FiFilter,
  FiEdit3
} from 'react-icons/fi';

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockIdeas = [
      {
        id: 1,
        title: 'AI-Powered Study Assistant',
        description: 'An intelligent tutoring system that adapts to individual learning styles and provides personalized study recommendations.',
        category: 'Education Technology',
        status: 'pending',
        submittedAt: '2024-01-20T10:00:00Z',
        views: 45,
        comments: 3,
        endorsements: []
      },
      {
        id: 2,
        title: 'Sustainable Energy Monitor',
        description: 'IoT-based system for monitoring and optimizing energy consumption in smart buildings.',
        category: 'Green Technology',
        status: 'endorsed',
        submittedAt: '2024-01-18T10:00:00Z',
        views: 78,
        comments: 5,
        endorsements: [
          {
            collegeName: 'MIT',
            endorsedBy: 'Dr. Jane Smith',
            endorsedAt: '2024-01-22T10:00:00Z'
          }
        ]
      },
      {
        id: 3,
        title: 'Smart Campus Navigation',
        description: 'Mobile app for indoor navigation in large campus buildings using AR technology.',
        category: 'Mobile App',
        status: 'rejected',
        submittedAt: '2024-01-15T10:00:00Z',
        views: 32,
        comments: 2,
        endorsements: []
      }
    ];
    
    setIdeas(mockIdeas);
    setFilteredIdeas(mockIdeas);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = ideas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(idea => idea.status === statusFilter);
    }

    setFilteredIdeas(filtered);
  }, [ideas, searchTerm, statusFilter]);

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            My Ideas
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Manage and track your submitted ideas
          </p>
        </div>
        <Link
          to="/ideas/submit"
          className="btn-primary mt-4 sm:mt-0"
        >
          <FiPlus className="mr-2" size={16} />
          Submit New Idea
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-secondary-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="endorsed">Endorsed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.length === 0 ? (
          <div className="card p-12 text-center">
            <FiZap className="mx-auto text-secondary-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No ideas found' : 'No ideas yet'}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by submitting your first innovative idea!'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link to="/ideas/submit" className="btn-primary">
                Submit Your First Idea
              </Link>
            )}
          </div>
        ) : (
          filteredIdeas.map((idea) => (
            <div key={idea.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                      {idea.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                      {getStatusIcon(idea.status)}
                      <span className="ml-1 capitalize">{idea.status}</span>
                    </span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-3 line-clamp-2">
                    {idea.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-secondary-500 dark:text-secondary-400">
                    <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 rounded">
                      {idea.category}
                    </span>
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
                <div className="flex space-x-2 ml-4">
                  <Link
                    to={`/ideas/${idea.id}/edit`}
                    className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
                    title="Edit idea"
                  >
                    <FiEdit3 size={16} />
                  </Link>
                  <Link
                    to={`/ideas/${idea.id}`}
                    className="btn-outline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Endorsements */}
              {idea.endorsements.length > 0 && (
                <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                  <h4 className="text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Endorsements
                  </h4>
                  <div className="space-y-2">
                    {idea.endorsements.map((endorsement, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <FiCheckCircle className="text-green-500" size={14} />
                        <span className="text-secondary-600 dark:text-secondary-400">
                          Endorsed by <span className="font-medium">{endorsement.endorsedBy}</span> from{' '}
                          <span className="font-medium">{endorsement.collegeName}</span> on{' '}
                          {formatDate(endorsement.endorsedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {ideas.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-900 dark:text-white">
                {ideas.length}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Total Ideas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {ideas.filter(idea => idea.status === 'pending').length}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Pending
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {ideas.filter(idea => idea.status === 'endorsed').length}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Endorsed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-900 dark:text-white">
                {ideas.reduce((sum, idea) => sum + idea.views, 0)}
              </div>
              <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Total Views
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;
