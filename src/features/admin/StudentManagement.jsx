import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiEye,
  FiMail,
  FiPhone,
  FiZap,
  FiDownload,
  FiUserPlus
} from 'react-icons/fi';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockStudents = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@mit.edu',
        phone: '+1234567890',
        department: 'Computer Science',
        year: 3,
        registeredAt: '2024-01-15T10:00:00Z',
        ideasCount: 3,
        endorsedIdeas: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        isActive: true,
        lastLogin: '2024-01-25T14:30:00Z'
      },
      {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@mit.edu',
        phone: '+1234567891',
        department: 'Mechanical Engineering',
        year: 4,
        registeredAt: '2024-01-10T10:00:00Z',
        ideasCount: 2,
        endorsedIdeas: 2,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        isActive: true,
        lastLogin: '2024-01-24T09:15:00Z'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@mit.edu',
        phone: '+1234567892',
        department: 'Electrical Engineering',
        year: 2,
        registeredAt: '2024-01-08T10:00:00Z',
        ideasCount: 1,
        endorsedIdeas: 0,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        isActive: true,
        lastLogin: '2024-01-23T16:45:00Z'
      },
      {
        id: 4,
        name: 'Emily Chen',
        email: 'emily.chen@mit.edu',
        phone: '+1234567893',
        department: 'Computer Science',
        year: 1,
        registeredAt: '2024-01-20T10:00:00Z',
        ideasCount: 0,
        endorsedIdeas: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        isActive: false,
        lastLogin: '2024-01-20T10:00:00Z'
      }
    ];
    
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
    setLoading(false);
  }, []);

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

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  const departments = [...new Set(students.map(student => student.department))];
  const years = [...new Set(students.map(student => student.year))].sort();

  const exportStudents = () => {
    // Mock export functionality
    const csvContent = [
      ['Name', 'Email', 'Department', 'Year', 'Ideas Count', 'Endorsed Ideas', 'Status'],
      ...filteredStudents.map(student => [
        student.name,
        student.email,
        student.department,
        student.year,
        student.ideasCount,
        student.endorsedIdeas,
        student.isActive ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
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
            Student Management
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-2">
            Manage and monitor student activities and submissions
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={exportStudents}
            className="btn-outline"
          >
            <FiDownload className="mr-2" size={16} />
            Export
          </button>
          <button className="btn-primary">
            <FiUserPlus className="mr-2" size={16} />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                Total Students
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {students.length}
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
                Active Students
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {students.filter(s => s.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiUsers className="text-green-600 dark:text-green-400" size={24} />
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
                {students.reduce((sum, s) => sum + s.ideasCount, 0)}
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
                Endorsed Ideas
              </p>
              <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                {students.reduce((sum, s) => sum + s.endorsedIdeas, 0)}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiZap className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
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

      {/* Students Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Academic Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Ideas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900 dark:text-white">
                          {student.name}
                        </div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400">
                          Joined {formatDate(student.registeredAt)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-secondary-900 dark:text-white">
                        <FiMail size={14} className="mr-2 text-secondary-400" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                        <FiPhone size={14} className="mr-2 text-secondary-400" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900 dark:text-white">
                      {student.department}
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">
                      Year {student.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900 dark:text-white">
                      {student.ideasCount} submitted
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">
                      {student.endorsedIdeas} endorsed
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-xs text-secondary-500 dark:text-secondary-400">
                        Last login: {formatLastLogin(student.lastLogin)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/students/${student.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        <FiEye size={16} />
                      </Link>
                      <a
                        href={`mailto:${student.email}`}
                        className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-300"
                      >
                        <FiMail size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="mx-auto text-secondary-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              No students found
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              {searchTerm || departmentFilter !== 'all' || yearFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No students have registered yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
