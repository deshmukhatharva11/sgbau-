import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUsers,
  FiZap,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiEye,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTrendingUp,
  FiDownload
} from 'react-icons/fi';

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API based on college ID
    const collegeData = {
      1: {
        id: 1,
        name: 'Shivaji College',
        fullName: 'Shivaji College of Arts, Commerce and Science',
        location: 'Amravati, Maharashtra',
        established: 1962,
        website: 'https://shivajicollegeamravati.edu.in',
        contactEmail: 'innovation@shivajicollegeamravati.edu.in',
        contactPhone: '+91 721 2662345',
        totalStudents: 245,
        totalIdeas: 45,
        pendingIdeas: 8,
        endorsedIdeas: 28,
        acceptedIdeas: 15,
        successRate: 85,
        departments: ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Commerce', 'Arts'],
        recentAchievements: [
          'Top 3 in Maharashtra Innovation Challenge 2024',
          '15 ideas accepted for incubation this year',
          'Highest success rate in Amravati region'
        ]
      },
      2: {
        id: 2,
        name: 'Jotiba Fule College',
        fullName: 'Jotiba Fule College of Arts and Science',
        location: 'Daryapur, Maharashtra',
        established: 1975,
        website: 'https://jotibafulecollegedaryapur.edu.in',
        contactEmail: 'innovation@jotibafulecollegedaryapur.edu.in',
        contactPhone: '+91 721 2445678',
        totalStudents: 198,
        totalIdeas: 38,
        pendingIdeas: 6,
        endorsedIdeas: 22,
        acceptedIdeas: 12,
        successRate: 78,
        departments: ['Computer Science', 'Information Technology', 'Commerce', 'Arts', 'Science'],
        recentAchievements: [
          'Best Innovation Hub Award 2024',
          '12 ideas successfully incubated',
          'Excellence in Rural Innovation'
        ]
      },
      3: {
        id: 3,
        name: 'Tukdoji Maharaj College',
        fullName: 'Tukdoji Maharaj College of Engineering',
        location: 'Achalpur, Maharashtra',
        established: 1980,
        website: 'https://tukdojimaharajcollege.edu.in',
        contactEmail: 'innovation@tukdojimaharajcollege.edu.in',
        contactPhone: '+91 721 2556789',
        totalStudents: 167,
        totalIdeas: 32,
        pendingIdeas: 5,
        endorsedIdeas: 18,
        acceptedIdeas: 10,
        successRate: 72,
        departments: ['Computer Engineering', 'Electrical Engineering', 'Civil Engineering', 'Mechanical Engineering'],
        recentAchievements: [
          'Engineering Innovation Excellence 2024',
          '10 patents filed this year',
          'Best Technical Innovation Award'
        ]
      }
    };

    const mockCollege = collegeData[parseInt(id)] || collegeData[1];

    const mockStudents = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@shivajicollegeamravati.edu.in',
        phone: '+91 9876543210',
        department: 'Computer Science',
        year: 3,
        registeredAt: '2024-01-15T10:00:00Z',
        ideasCount: 3,
        endorsedIdeas: 1,
        acceptedIdeas: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        isActive: true,
        lastLogin: '2024-01-25T14:30:00Z',
        gpa: 3.8,
        recentIdeas: [
          { title: 'AI-Powered Study Assistant', status: 'endorsed' },
          { title: 'Smart Campus Navigation', status: 'pending' }
        ]
      },
      {
        id: 2,
        name: 'Priya Patil',
        email: 'priya.patil@shivajicollegeamravati.edu.in',
        phone: '+91 9876543211',
        department: 'Electronics Engineering',
        year: 4,
        registeredAt: '2024-01-10T10:00:00Z',
        ideasCount: 2,
        endorsedIdeas: 2,
        acceptedIdeas: 1,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isActive: true,
        lastLogin: '2024-01-24T09:15:00Z',
        gpa: 3.9,
        recentIdeas: [
          { title: 'Sustainable Energy Monitor', status: 'accepted' },
          { title: 'Green Building Optimizer', status: 'endorsed' }
        ]
      },
      {
        id: 3,
        name: 'Arjun Deshmukh',
        email: 'arjun.deshmukh@shivajicollegeamravati.edu.in',
        phone: '+91 9876543212',
        department: 'Mechanical Engineering',
        year: 2,
        registeredAt: '2024-01-08T10:00:00Z',
        ideasCount: 1,
        endorsedIdeas: 0,
        acceptedIdeas: 0,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isActive: true,
        lastLogin: '2024-01-23T16:45:00Z',
        gpa: 3.6,
        recentIdeas: [
          { title: 'IoT Security Framework', status: 'pending' }
        ]
      },
      {
        id: 4,
        name: 'Sneha Joshi',
        email: 'sneha.joshi@shivajicollegeamravati.edu.in',
        phone: '+91 9876543213',
        department: 'Commerce',
        year: 1,
        registeredAt: '2024-01-20T10:00:00Z',
        ideasCount: 0,
        endorsedIdeas: 0,
        acceptedIdeas: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        isActive: false,
        lastLogin: '2024-01-20T10:00:00Z',
        gpa: 3.7,
        recentIdeas: []
      },
      {
        id: 5,
        name: 'Vikram Kulkarni',
        email: 'vikram.kulkarni@shivajicollegeamravati.edu.in',
        phone: '+91 9876543214',
        department: 'Arts',
        year: 3,
        registeredAt: '2024-01-12T10:00:00Z',
        ideasCount: 4,
        endorsedIdeas: 3,
        acceptedIdeas: 2,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        isActive: true,
        lastLogin: '2024-01-25T11:20:00Z',
        gpa: 3.85,
        recentIdeas: [
          { title: 'Digital Art Platform for Rural Artists', status: 'accepted' },
          { title: 'Cultural Heritage Preservation App', status: 'endorsed' }
        ]
      }
    ];
    
    setCollege(mockCollege);
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by department
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(student => student.department === departmentFilter);
    }

    // Filter by year
    if (yearFilter !== 'all') {
      filtered = filtered.filter(student => student.year.toString() === yearFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, departmentFilter, yearFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'endorsed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'accepted': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'rejected': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20';
    }
  };

  const exportStudents = () => {
    const csvContent = [
      ['Name', 'Email', 'Department', 'Year', 'Ideas Count', 'Endorsed Ideas', 'Accepted Ideas', 'GPA', 'Status'],
      ...filteredStudents.map(student => [
        student.name,
        student.email,
        student.department,
        student.year,
        student.ideasCount,
        student.endorsedIdeas,
        student.acceptedIdeas,
        student.gpa,
        student.isActive ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${college.name}_students.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
          College Not Found
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          The college you're looking for doesn't exist or has been removed.
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

  const departments = [...new Set(students.map(student => student.department))];
  const years = [...new Set(students.map(student => student.year))].sort();

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
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            {college.name}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {college.fullName} • {college.location}
          </p>
        </div>
        <button
          onClick={exportStudents}
          className="btn-outline"
        >
          <FiDownload className="mr-2" size={16} />
          Export Students
        </button>
      </div>

      {/* College Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* College Info */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                {college.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  {college.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Est. {college.established}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiMapPin className="text-secondary-400" size={16} />
                <span className="text-secondary-700 dark:text-secondary-300">
                  {college.location}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-secondary-400" size={16} />
                <a 
                  href={`mailto:${college.contactEmail}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  {college.contactEmail}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-secondary-400" size={16} />
                <span className="text-secondary-700 dark:text-secondary-300">
                  {college.contactPhone}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700">
              <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                Recent Achievements
              </h4>
              <ul className="space-y-2">
                {college.recentAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Students
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {college.totalStudents}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FiUsers className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Total Ideas
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {college.totalIdeas}
                  </p>
                </div>
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiZap className="text-primary-600 dark:text-primary-400" size={20} />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Endorsed
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {college.endorsedIdeas}
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FiCheckCircle className="text-green-600 dark:text-green-400" size={20} />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {college.successRate}%
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <FiTrendingUp className="text-yellow-600 dark:text-yellow-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Students ({filteredStudents.length})
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="h-5 w-5 text-secondary-400" />
                </div>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <FiUsers className="mx-auto text-secondary-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                No students found
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {searchTerm || departmentFilter !== 'all' || yearFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No students have registered from this college yet'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200">
                  <div className="flex items-start space-x-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-secondary-900 dark:text-white">
                          {student.name}
                        </h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-secondary-600 dark:text-secondary-400">
                        <p>{student.department} • Year {student.year}</p>
                        <p>GPA: {student.gpa}</p>
                        <p>{student.email}</p>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm font-semibold text-secondary-900 dark:text-white">
                            {student.ideasCount}
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400">
                            Ideas
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-600">
                            {student.endorsedIdeas}
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400">
                            Endorsed
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-blue-600">
                            {student.acceptedIdeas}
                          </p>
                          <p className="text-xs text-secondary-500 dark:text-secondary-400">
                            Accepted
                          </p>
                        </div>
                      </div>

                      {student.recentIdeas.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                          <p className="text-xs font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                            Recent Ideas:
                          </p>
                          <div className="space-y-1">
                            {student.recentIdeas.slice(0, 2).map((idea, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-xs text-secondary-600 dark:text-secondary-400 truncate">
                                  {idea.title}
                                </span>
                                <span className={`inline-flex px-1.5 py-0.5 text-xs rounded-full ${getStatusColor(idea.status)}`}>
                                  {idea.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex space-x-2">
                        <a
                          href={`mailto:${student.email}`}
                          className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
                        >
                          <FiMail size={14} />
                        </a>
                        <button className="text-xs text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white">
                          <FiEye size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeDetail;
