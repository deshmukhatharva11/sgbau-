import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMapPin,
  FiUsers,
  FiZap,
  FiTrendingUp,
  FiEye,
  FiDownload,
  FiFilter,
  FiSearch
} from 'react-icons/fi';

const AreaDetail = () => {
  const { areaName } = useParams();
  const navigate = useNavigate();
  const [areaData, setAreaData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('successRate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API based on area name
    const areaDatabase = {
      'Amravati': {
        name: 'Amravati',
        fullName: 'Amravati District',
        state: 'Maharashtra',
        totalColleges: 3,
        totalStudents: 610,
        totalIdeas: 105,
        avgSuccessRate: 75,
        avgRating: 4.3,
        establishedYear: 1956,
        description: 'Amravati is a major educational hub in Maharashtra, known for its prestigious institutions and innovation ecosystem.',
        keyHighlights: [
          'Highest concentration of engineering colleges in the region',
          'Leading in technology and innovation initiatives',
          'Strong industry-academia partnerships',
          'Government support for startup ecosystem'
        ],
        colleges: [
          {
            id: 1,
            name: 'Shivaji College',
            fullName: 'Shivaji College of Arts, Commerce and Science',
            established: 1962,
            totalStudents: 245,
            totalIdeas: 45,
            pendingIdeas: 8,
            endorsedIdeas: 28,
            acceptedIdeas: 15,
            successRate: 85,
            avgRating: 4.5,
            departments: ['Computer Science', 'Electronics Engineering', 'Mechanical Engineering', 'Commerce', 'Arts'],
            recentAchievements: [
              'Top performer in Maharashtra Innovation Challenge 2024',
              'Highest success rate in Amravati region'
            ]
          },
          {
            id: 7,
            name: 'Government Engineering College',
            fullName: 'Government College of Engineering Amravati',
            established: 1960,
            totalStudents: 220,
            totalIdeas: 35,
            pendingIdeas: 6,
            endorsedIdeas: 20,
            acceptedIdeas: 12,
            successRate: 78,
            avgRating: 4.2,
            departments: ['Computer Engineering', 'Electrical Engineering', 'Civil Engineering', 'Mechanical Engineering'],
            recentAchievements: [
              'Excellence in Engineering Innovation 2024',
              'Best Government College Award'
            ]
          },
          {
            id: 8,
            name: 'Amravati University',
            fullName: 'Sant Gadge Baba Amravati University',
            established: 1983,
            totalStudents: 145,
            totalIdeas: 25,
            pendingIdeas: 4,
            endorsedIdeas: 15,
            acceptedIdeas: 8,
            successRate: 68,
            avgRating: 4.0,
            departments: ['Science', 'Arts', 'Commerce', 'Management', 'Law'],
            recentAchievements: [
              'Research Excellence Award 2024',
              'Best University Innovation Hub'
            ]
          }
        ]
      },
      'Daryapur': {
        name: 'Daryapur',
        fullName: 'Daryapur Tehsil',
        state: 'Maharashtra',
        totalColleges: 2,
        totalStudents: 320,
        totalIdeas: 60,
        avgSuccessRate: 72,
        avgRating: 4.1,
        establishedYear: 1960,
        description: 'Daryapur is an emerging educational center with focus on rural innovation and sustainable development.',
        keyHighlights: [
          'Pioneer in rural innovation initiatives',
          'Strong focus on agricultural technology',
          'Community-driven development programs',
          'Excellence in social entrepreneurship'
        ],
        colleges: [
          {
            id: 2,
            name: 'Jotiba Fule College',
            fullName: 'Jotiba Fule College of Arts and Science',
            established: 1975,
            totalStudents: 198,
            totalIdeas: 38,
            pendingIdeas: 6,
            endorsedIdeas: 22,
            acceptedIdeas: 12,
            successRate: 78,
            avgRating: 4.2,
            departments: ['Computer Science', 'Information Technology', 'Commerce', 'Arts', 'Science'],
            recentAchievements: [
              'Best Innovation Hub Award 2024',
              'Excellence in Rural Innovation'
            ]
          },
          {
            id: 9,
            name: 'Rural Development College',
            fullName: 'College of Rural Development and Technology',
            established: 1985,
            totalStudents: 122,
            totalIdeas: 22,
            pendingIdeas: 3,
            endorsedIdeas: 12,
            acceptedIdeas: 8,
            successRate: 65,
            avgRating: 3.9,
            departments: ['Agricultural Engineering', 'Rural Technology', 'Environmental Science', 'Social Work'],
            recentAchievements: [
              'Best Rural Innovation Award 2024',
              'Sustainable Development Excellence'
            ]
          }
        ]
      },
      'Achalpur': {
        name: 'Achalpur',
        fullName: 'Achalpur City',
        state: 'Maharashtra',
        totalColleges: 2,
        totalStudents: 289,
        totalIdeas: 54,
        avgSuccessRate: 70,
        avgRating: 4.0,
        establishedYear: 1965,
        description: 'Achalpur is known for its engineering excellence and technical innovation in Maharashtra.',
        keyHighlights: [
          'Leading engineering education center',
          'Strong industry connections',
          'Technical innovation hub',
          'Research and development focus'
        ],
        colleges: [
          {
            id: 3,
            name: 'Tukdoji Maharaj College',
            fullName: 'Tukdoji Maharaj College of Engineering',
            established: 1980,
            totalStudents: 167,
            totalIdeas: 32,
            pendingIdeas: 5,
            endorsedIdeas: 18,
            acceptedIdeas: 10,
            successRate: 72,
            avgRating: 4.1,
            departments: ['Computer Engineering', 'Electrical Engineering', 'Civil Engineering', 'Mechanical Engineering'],
            recentAchievements: [
              'Engineering Innovation Excellence 2024',
              'Best Technical Innovation Award'
            ]
          },
          {
            id: 10,
            name: 'Technical Institute Achalpur',
            fullName: 'Government Technical Institute Achalpur',
            established: 1978,
            totalStudents: 122,
            totalIdeas: 22,
            pendingIdeas: 4,
            endorsedIdeas: 12,
            acceptedIdeas: 7,
            successRate: 68,
            avgRating: 3.9,
            departments: ['Electronics', 'Mechanical', 'Computer Technology', 'Electrical'],
            recentAchievements: [
              'Technical Excellence Award 2024',
              'Best Diploma College Recognition'
            ]
          }
        ]
      },
      'Murtizapur': {
        name: 'Murtizapur',
        fullName: 'Murtizapur Tehsil',
        state: 'Maharashtra',
        totalColleges: 2,
        totalStudents: 311,
        totalIdeas: 50,
        avgSuccessRate: 68,
        avgRating: 3.9,
        establishedYear: 1970,
        description: 'Murtizapur is developing as an educational center with focus on practical and applied sciences.',
        keyHighlights: [
          'Growing educational infrastructure',
          'Focus on applied sciences and technology',
          'Strong community engagement',
          'Emerging innovation ecosystem'
        ],
        colleges: [
          {
            id: 4,
            name: 'J D Patil College',
            fullName: 'J D Patil College of Science and Technology',
            established: 1985,
            totalStudents: 189,
            totalIdeas: 28,
            pendingIdeas: 4,
            endorsedIdeas: 16,
            acceptedIdeas: 8,
            successRate: 68,
            avgRating: 3.9,
            departments: ['Computer Science', 'Information Technology', 'Electronics', 'Mathematics', 'Physics'],
            recentAchievements: [
              'Science Innovation Award 2024',
              'Best Emerging College Recognition'
            ]
          },
          {
            id: 11,
            name: 'Murtizapur Science College',
            fullName: 'Government Science College Murtizapur',
            established: 1982,
            totalStudents: 122,
            totalIdeas: 22,
            pendingIdeas: 3,
            endorsedIdeas: 12,
            acceptedIdeas: 7,
            successRate: 68,
            avgRating: 3.8,
            departments: ['Chemistry', 'Physics', 'Biology', 'Mathematics', 'Computer Science'],
            recentAchievements: [
              'Research Excellence in Sciences 2024',
              'Best Laboratory Facilities Award'
            ]
          }
        ]
      },
      'Bhatkuli': {
        name: 'Bhatkuli',
        fullName: 'Bhatkuli Village',
        state: 'Maharashtra',
        totalColleges: 1,
        totalStudents: 156,
        totalIdeas: 25,
        avgSuccessRate: 65,
        avgRating: 4.2,
        establishedYear: 1990,
        description: 'Bhatkuli represents rural educational excellence with innovative approaches to learning.',
        keyHighlights: [
          'Rural education pioneer',
          'Innovative teaching methodologies',
          'Community-based learning',
          'Sustainable development focus'
        ],
        colleges: [
          {
            id: 5,
            name: 'Biyani College',
            fullName: 'Biyani College of Rural Development',
            established: 1990,
            totalStudents: 156,
            totalIdeas: 25,
            pendingIdeas: 3,
            endorsedIdeas: 14,
            acceptedIdeas: 7,
            successRate: 65,
            avgRating: 4.2,
            departments: ['Rural Development', 'Agriculture', 'Social Work', 'Environmental Science', 'Management'],
            recentAchievements: [
              'Rural Innovation Excellence 2024',
              'Best Community Engagement Award'
            ]
          }
        ]
      },
      'Paratwada': {
        name: 'Paratwada',
        fullName: 'Paratwada Tehsil',
        state: 'Maharashtra',
        totalColleges: 1,
        totalStudents: 134,
        totalIdeas: 22,
        avgSuccessRate: 62,
        avgRating: 3.8,
        establishedYear: 1995,
        description: 'Paratwada is an emerging educational hub with focus on holistic development.',
        keyHighlights: [
          'Holistic education approach',
          'Cultural preservation initiatives',
          'Environmental consciousness',
          'Youth development programs'
        ],
        colleges: [
          {
            id: 6,
            name: 'Ekvira College',
            fullName: 'Ekvira College of Arts and Commerce',
            established: 1995,
            totalStudents: 134,
            totalIdeas: 22,
            pendingIdeas: 4,
            endorsedIdeas: 12,
            acceptedIdeas: 6,
            successRate: 62,
            avgRating: 3.8,
            departments: ['Arts', 'Commerce', 'Social Sciences', 'Languages', 'Cultural Studies'],
            recentAchievements: [
              'Cultural Innovation Award 2024',
              'Best Arts College Recognition'
            ]
          }
        ]
      },
      'Badnera': {
        name: 'Badnera',
        fullName: 'Badnera Railway Town',
        state: 'Maharashtra',
        totalColleges: 1,
        totalStudents: 98,
        totalIdeas: 18,
        avgSuccessRate: 60,
        avgRating: 4.0,
        establishedYear: 2000,
        description: 'Badnera is a railway town developing its educational infrastructure with modern approaches.',
        keyHighlights: [
          'Modern educational infrastructure',
          'Transportation and logistics focus',
          'Industrial collaboration',
          'Technical skill development'
        ],
        colleges: [
          {
            id: 12,
            name: 'Railway Technical Institute',
            fullName: 'Badnera Railway Technical Institute',
            established: 2000,
            totalStudents: 98,
            totalIdeas: 18,
            pendingIdeas: 3,
            endorsedIdeas: 10,
            acceptedIdeas: 5,
            successRate: 60,
            avgRating: 4.0,
            departments: ['Mechanical Engineering', 'Electrical Engineering', 'Transportation Technology', 'Industrial Management'],
            recentAchievements: [
              'Technical Innovation in Transportation 2024',
              'Best Industry Partnership Award'
            ]
          }
        ]
      }
    };

    const currentArea = areaDatabase[areaName] || areaDatabase['Amravati'];
    setAreaData(currentArea);
    setColleges(currentArea.colleges);
    setFilteredColleges(currentArea.colleges);
    setLoading(false);
  }, [areaName]);

  useEffect(() => {
    let filtered = colleges;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort colleges
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'successRate':
          return b.successRate - a.successRate;
        case 'totalIdeas':
          return b.totalIdeas - a.totalIdeas;
        case 'totalStudents':
          return b.totalStudents - a.totalStudents;
        case 'avgRating':
          return b.avgRating - a.avgRating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.successRate - a.successRate;
      }
    });

    setFilteredColleges(filtered);
  }, [colleges, searchTerm, sortBy]);

  const exportAreaData = () => {
    const csvContent = [
      ['College Name', 'Students', 'Ideas', 'Endorsed', 'Accepted', 'Success Rate', 'Rating'],
      ...filteredColleges.map(college => [
        college.name,
        college.totalStudents,
        college.totalIdeas,
        college.endorsedIdeas,
        college.acceptedIdeas,
        `${college.successRate}%`,
        college.avgRating
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${areaData.name}_colleges_performance.csv`;
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

  if (!areaData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
          Area Not Found
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          The area you're looking for doesn't exist or has been removed.
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
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            {areaData.name} Region
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            {areaData.fullName} • {areaData.state}
          </p>
        </div>
        <button
          onClick={exportAreaData}
          className="btn-outline"
        >
          <FiDownload className="mr-2" size={16} />
          Export Data
        </button>
      </div>

      {/* Area Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Information */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                <FiMapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                  {areaData.name}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Est. {areaData.establishedYear}
                </p>
              </div>
            </div>

            <p className="text-secondary-700 dark:text-secondary-300 mb-6">
              {areaData.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-semibold text-secondary-900 dark:text-white">
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {areaData.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Area Statistics */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Colleges
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {areaData.totalColleges}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FiMapPin className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Students
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {areaData.totalStudents}
                  </p>
                </div>
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <FiUsers className="text-green-600 dark:text-green-400" size={20} />
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
                    {areaData.totalIdeas}
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
                    Avg Success Rate
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {areaData.avgSuccessRate}%
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

      {/* Colleges in Area */}
      <div className="card">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
              Colleges in {areaData.name} ({filteredColleges.length})
            </h2>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="h-5 w-5 text-secondary-400" />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field pl-10"
                >
                  <option value="successRate">Success Rate</option>
                  <option value="totalIdeas">Total Ideas</option>
                  <option value="totalStudents">Total Students</option>
                  <option value="avgRating">Average Rating</option>
                  <option value="name">College Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Colleges List */}
        <div className="p-6">
          {filteredColleges.length === 0 ? (
            <div className="text-center py-12">
              <FiMapPin className="mx-auto text-secondary-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
                No colleges found
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {searchTerm 
                  ? 'Try adjusting your search criteria'
                  : 'No colleges are registered in this area yet'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredColleges.map((college) => (
                <Link
                  key={college.id}
                  to={`/colleges/${college.id}`}
                  className="block p-6 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {college.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {college.name}
                        </h3>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                          Est. {college.established}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-semibold text-secondary-900 dark:text-white">
                        {college.avgRating}
                      </span>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(college.avgRating) 
                                ? 'bg-yellow-400' 
                                : 'bg-secondary-300 dark:bg-secondary-600'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
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

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
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

                  <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-secondary-600 dark:text-secondary-400">
                        Success Rate
                      </span>
                      <span className="font-semibold text-secondary-900 dark:text-white">
                        {college.successRate}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${college.successRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {college.departments.slice(0, 2).map((dept, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded">
                          {dept}
                        </span>
                      ))}
                      {college.departments.length > 2 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded">
                          +{college.departments.length - 2} more
                        </span>
                      )}
                    </div>
                    <FiEye className="text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" size={16} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaDetail;
