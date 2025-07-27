import React, { useEffect, useState } from 'react';
import {
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiCheckCircle,
  FiMapPin,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    // Mock analytics data - in real app, fetch from API
    const mockAnalytics = {
      overview: {
        totalIdeas: 156,
        totalStudents: 1250,
        totalColleges: 25,
        successRate: 68.5,
        avgRating: 4.2,
        totalFunding: '$2.5M'
      },
      ideasByCategory: [
        { category: 'Education Technology', count: 35, percentage: 22.4 },
        { category: 'Green Technology', count: 28, percentage: 17.9 },
        { category: 'Healthcare', count: 22, percentage: 14.1 },
        { category: 'Fintech', count: 18, percentage: 11.5 },
        { category: 'E-commerce', count: 15, percentage: 9.6 },
        { category: 'Mobile App', count: 12, percentage: 7.7 },
        { category: 'AI/ML', count: 10, percentage: 6.4 },
        { category: 'IoT', count: 8, percentage: 5.1 },
        { category: 'Other', count: 8, percentage: 5.1 }
      ],
      ideasByStatus: [
        { status: 'Pending', count: 45, percentage: 28.8 },
        { status: 'Endorsed', count: 78, percentage: 50.0 },
        { status: 'Accepted', count: 23, percentage: 14.7 },
        { status: 'Rejected', count: 10, percentage: 6.4 }
      ],
      monthlyTrends: [
        { month: 'Jan', submissions: 25, endorsements: 18, acceptances: 8 },
        { month: 'Feb', submissions: 32, endorsements: 22, acceptances: 12 },
        { month: 'Mar', submissions: 28, endorsements: 19, acceptances: 9 },
        { month: 'Apr', submissions: 35, endorsements: 28, acceptances: 15 },
        { month: 'May', submissions: 30, endorsements: 24, acceptances: 11 },
        { month: 'Jun', submissions: 38, endorsements: 31, acceptances: 18 }
      ],
      topColleges: [
        { name: 'Shivaji College', ideas: 45, endorsements: 38, region: 'Amravati' },
        { name: 'Jotiba Fule College', ideas: 38, endorsements: 32, region: 'Daryapur' },
        { name: 'Tukdoji Maharaj College', ideas: 32, endorsements: 28, region: 'Achalpur' },
        { name: 'J D Patil College', ideas: 28, endorsements: 22, region: 'Murtizapur' },
        { name: 'Biyani College', ideas: 25, endorsements: 20, region: 'Bhatkuli' },
        { name: 'Ekvira College', ideas: 22, endorsements: 18, region: 'Paratwada' }
      ],
      regionalStats: [
        { region: 'Amravati', ideas: 45, colleges: 3, avgRating: 4.3 },
        { region: 'Daryapur', ideas: 38, colleges: 2, avgRating: 4.1 },
        { region: 'Achalpur', ideas: 32, colleges: 2, avgRating: 4.0 },
        { region: 'Murtizapur', ideas: 28, colleges: 2, avgRating: 3.9 },
        { region: 'Bhatkuli', ideas: 25, colleges: 1, avgRating: 4.2 },
        { region: 'Paratwada', ideas: 22, colleges: 1, avgRating: 3.8 },
        { region: 'Badnera', ideas: 18, colleges: 1, avgRating: 4.0 }
      ]
    };
    
    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const exportData = () => {
    // Mock export functionality
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Ideas', analytics.overview.totalIdeas],
      ['Total Students', analytics.overview.totalStudents],
      ['Total Colleges', analytics.overview.totalColleges],
      ['Success Rate', `${analytics.overview.successRate}%`],
      ['Average Rating', analytics.overview.avgRating],
      ['Total Funding', analytics.overview.totalFunding]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics.csv';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Comprehensive insights into innovation platform performance
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="btn-outline"
          >
            <FiRefreshCw className="mr-2" size={16} />
            Refresh
          </button>
          <button
            onClick={exportData}
            className="btn-primary"
          >
            <FiDownload className="mr-2" size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Ideas
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.totalIdeas}
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
                Total Students
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.totalStudents.toLocaleString()}
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
                Total Colleges
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.totalColleges}
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
                Success Rate
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.successRate}%
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiTrendingUp className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Avg Rating
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.avgRating}/5
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FiCheckCircle className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Funding
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {analytics.overview.totalFunding}
              </p>
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
              <FiTrendingUp className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ideas by Category */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Ideas by Category
          </h3>
          <div className="space-y-3">
            {analytics.ideasByCategory.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                  <span className="text-sm font-medium text-secondary-900 dark:text-white">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">
                    {item.count}
                  </span>
                  <div className="w-16 bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-secondary-500 dark:text-secondary-400 w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ideas by Status */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Ideas by Status
          </h3>
          <div className="space-y-4">
            {analytics.ideasByStatus.map((item, index) => {
              const colors = {
                'Pending': 'bg-yellow-500',
                'Endorsed': 'bg-blue-500',
                'Accepted': 'bg-green-500',
                'Rejected': 'bg-red-500'
              };
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[item.status]}`}></div>
                    <span className="text-sm font-medium text-secondary-900 dark:text-white">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      {item.count}
                    </span>
                    <div className="w-16 bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${colors[item.status]}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-secondary-500 dark:text-secondary-400 w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
          Monthly Trends
        </h3>
        <div className="overflow-x-auto">
          <div className="flex space-x-8 min-w-max">
            {analytics.monthlyTrends.map((month, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div className="flex items-end space-x-1 h-32">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-blue-500 rounded-t"
                        style={{ height: `${(month.submissions / 40) * 100}%` }}
                      ></div>
                      <span className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        {month.submissions}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-green-500 rounded-t"
                        style={{ height: `${(month.endorsements / 40) * 100}%` }}
                      ></div>
                      <span className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        {month.endorsements}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-purple-500 rounded-t"
                        style={{ height: `${(month.acceptances / 40) * 100}%` }}
                      ></div>
                      <span className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        {month.acceptances}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-secondary-900 dark:text-white">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Submissions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Endorsements</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">Acceptances</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Colleges */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Top Performing Colleges
          </h3>
          <div className="space-y-4">
            {analytics.topColleges.map((college, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {college.name}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {college.region}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {college.ideas}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {college.endorsements} endorsed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
            Regional Statistics
          </h3>
          <div className="space-y-4">
            {analytics.regionalStats.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
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
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      {region.avgRating}/5
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
