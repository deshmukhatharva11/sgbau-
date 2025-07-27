import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FiArrowLeft,
  FiZap, 
  FiCheckCircle, 
  FiClock, 
  FiX,
  FiEye,
  FiMessageCircle,
  FiUser,
  FiCalendar,
  FiTag,
  FiDownload,
  FiSend
} from 'react-icons/fi';

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockIdea = {
      id: parseInt(id),
      title: 'AI-Powered Study Assistant',
      description: 'An intelligent tutoring system that adapts to individual learning styles and provides personalized study recommendations. The system uses machine learning algorithms to analyze student performance patterns and creates customized learning paths.',
      category: 'Education Technology',
      techStack: ['React', 'Python', 'TensorFlow', 'MongoDB'],
      status: 'pending',
      submittedAt: '2024-01-20T10:00:00Z',
      views: 45,
      studentId: 1,
      studentName: 'John Doe',
      college: 'MIT',
      department: 'Computer Science',
      implementationPlan: 'Phase 1: Research and prototype development (2 months)\nPhase 2: Core algorithm implementation (3 months)\nPhase 3: User interface development (2 months)\nPhase 4: Testing and refinement (1 month)\nPhase 5: Deployment and user training (1 month)',
      marketPotential: 'The global e-learning market is expected to reach $350 billion by 2025. Our solution targets the personalized learning segment, which is growing at 15% annually. Initial target market includes universities and online education platforms.',
      fundingRequired: '$75,000 - $100,000',
      timeline: '9 months for MVP, 12 months for full launch',
      teamMembers: [
        { name: 'John Doe', role: 'Team Lead', email: 'john@example.com' },
        { name: 'Sarah Wilson', role: 'Developer', email: 'sarah@example.com' }
      ],
      files: [
        { name: 'proposal.pdf', url: '/files/proposal.pdf', type: 'application/pdf' },
        { name: 'mockups.png', url: '/files/mockups.png', type: 'image/png' }
      ],
      endorsements: [
        {
          id: 1,
          collegeId: 2,
          collegeName: 'MIT',
          endorsedBy: 'Dr. Jane Smith',
          status: 'approved',
          comments: 'Excellent concept with strong market potential. The technical approach is sound.',
          endorsedAt: '2024-01-22T10:00:00Z'
        }
      ],
      comments: [
        {
          id: 1,
          userId: 3,
          userName: 'Alex Johnson',
          userRole: 'incubator',
          comment: 'This has great potential. Would love to discuss further. Have you considered the scalability challenges?',
          createdAt: '2024-01-23T10:00:00Z'
        },
        {
          id: 2,
          userId: 2,
          userName: 'Dr. Jane Smith',
          userRole: 'college',
          comment: 'The machine learning approach is innovative. I recommend exploring partnerships with educational content providers.',
          createdAt: '2024-01-24T10:00:00Z'
        }
      ]
    };
    
    setIdea(mockIdea);
    setLoading(false);
  }, [id]);

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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      comment: newComment,
      createdAt: new Date().toISOString()
    };

    setIdea(prev => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));
    setNewComment('');
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'student': return 'Student';
      case 'college': return 'College Admin';
      case 'incubator': return 'Incubator Manager';
      default: return 'User';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'college': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'incubator': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
          Idea Not Found
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          The idea you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
              {idea.title}
            </h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(idea.status)}`}>
              {getStatusIcon(idea.status)}
              <span className="ml-2 capitalize">{idea.status}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
            <div className="flex items-center space-x-1">
              <FiUser size={14} />
              <span>By {idea.studentName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiCalendar size={14} />
              <span>Submitted {formatDate(idea.submittedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiEye size={14} />
              <span>{idea.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiMessageCircle size={14} />
              <span>{idea.comments.length} comments</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Description
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {idea.description}
            </p>
          </div>

          {/* Implementation Plan */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Implementation Plan
            </h2>
            <div className="text-secondary-700 dark:text-secondary-300 whitespace-pre-line">
              {idea.implementationPlan}
            </div>
          </div>

          {/* Market Potential */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Market Potential
            </h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {idea.marketPotential}
            </p>
          </div>

          {/* Comments Section */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
              Comments ({idea.comments.length})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex space-x-4">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows={3}
                    className="input-field resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiSend className="mr-2" size={14} />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {idea.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${comment.userName}&background=3b82f6&color=fff`}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {comment.userName}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(comment.userRole)}`}>
                        {getRoleDisplayName(comment.userRole)}
                      </span>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-secondary-700 dark:text-secondary-300">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Basic Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Category</span>
                <div className="flex items-center space-x-1 mt-1">
                  <FiTag size={14} className="text-secondary-400" />
                  <span className="text-secondary-900 dark:text-white">{idea.category}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">College</span>
                <p className="text-secondary-900 dark:text-white">{idea.college}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Department</span>
                <p className="text-secondary-900 dark:text-white">{idea.department}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Funding Required</span>
                <p className="text-secondary-900 dark:text-white">{idea.fundingRequired}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Timeline</span>
                <p className="text-secondary-900 dark:text-white">{idea.timeline}</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {idea.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Team Members
            </h3>
            <div className="space-y-3">
              {idea.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${member.name}&background=3b82f6&color=fff`}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {member.name}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Files */}
          {idea.files.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Supporting Files
              </h3>
              <div className="space-y-2">
                {idea.files.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    download
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                  >
                    <FiDownload size={16} className="text-secondary-400" />
                    <span className="text-secondary-900 dark:text-white">{file.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Endorsements */}
          {idea.endorsements.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Endorsements
              </h3>
              <div className="space-y-4">
                {idea.endorsements.map((endorsement) => (
                  <div key={endorsement.id} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiCheckCircle className="text-green-500" size={16} />
                      <span className="font-medium text-secondary-900 dark:text-white">
                        {endorsement.collegeName}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                      Endorsed by {endorsement.endorsedBy}
                    </p>
                    <p className="text-sm text-secondary-700 dark:text-secondary-300">
                      {endorsement.comments}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                      {formatDate(endorsement.endorsedAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
