import React, { useState, useEffect } from 'react';
import {
  FiUsers,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiUpload
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockUsers = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@shivajicollegeamravati.edu.in',
        phone: '+91 9876543210',
        role: 'student',
        status: 'active',
        college: 'Shivaji College',
        area: 'Amravati',
        joinedDate: '2024-01-15T10:00:00Z',
        lastLogin: '2024-01-25T14:30:00Z',
        ideasCount: 3,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      {
        id: 2,
        name: 'Dr. Priya Patil',
        email: 'priya.patil@jotibafulecollegedaryapur.edu.in',
        phone: '+91 9876543211',
        role: 'college',
        status: 'active',
        college: 'Jotiba Fule College',
        area: 'Daryapur',
        joinedDate: '2024-01-10T10:00:00Z',
        lastLogin: '2024-01-25T09:15:00Z',
        managedStudents: 198,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      {
        id: 3,
        name: 'Arjun Deshmukh',
        email: 'arjun.deshmukh@techinnovate.com',
        phone: '+91 9876543212',
        role: 'incubator',
        status: 'active',
        organization: 'TechInnovate Hub',
        area: 'Amravati',
        joinedDate: '2024-01-08T10:00:00Z',
        lastLogin: '2024-01-25T16:45:00Z',
        managedColleges: 12,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      {
        id: 4,
        name: 'Sneha Joshi',
        email: 'sneha.joshi@shivajicollegeamravati.edu.in',
        phone: '+91 9876543213',
        role: 'student',
        status: 'pending',
        college: 'Shivaji College',
        area: 'Amravati',
        joinedDate: '2024-01-20T10:00:00Z',
        lastLogin: '2024-01-20T10:00:00Z',
        ideasCount: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      {
        id: 5,
        name: 'Prof. Vikram Kulkarni',
        email: 'vikram.kulkarni@tukdojimaharajcollege.edu.in',
        phone: '+91 9876543214',
        role: 'college',
        status: 'suspended',
        college: 'Tukdoji Maharaj College',
        area: 'Achalpur',
        joinedDate: '2024-01-12T10:00:00Z',
        lastLogin: '2024-01-23T11:20:00Z',
        managedStudents: 167,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.organization?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleUserAction = (action, userId) => {
    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: 'active' } : user
        ));
        toast.success('User activated successfully');
        break;
      case 'suspend':
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: 'suspended' } : user
        ));
        toast.success('User suspended successfully');
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this user?')) {
          setUsers(prev => prev.filter(user => user.id !== userId));
          toast.success('User deleted successfully');
        }
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first');
      return;
    }

    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
        ));
        toast.success(`${selectedUsers.length} users activated`);
        break;
      case 'suspend':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'suspended' } : user
        ));
        toast.success(`${selectedUsers.length} users suspended`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
          setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
          toast.success(`${selectedUsers.length} users deleted`);
        }
        break;
      default:
        break;
    }
    setSelectedUsers([]);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'suspended': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-secondary-600 bg-secondary-100 dark:bg-secondary-900/20';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'college': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'incubator': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'admin': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
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

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'College/Organization', 'Area', 'Joined Date'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.college || user.organization || '',
        user.area,
        formatDate(user.joinedDate)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Users exported successfully');
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
            User Management
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage all users across the platform
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportUsers}
            className="btn-outline"
          >
            <FiDownload className="mr-2" size={16} />
            Export
          </button>
          <button className="btn-outline">
            <FiUpload className="mr-2" size={16} />
            Import
          </button>
          <button className="btn-primary">
            <FiPlus className="mr-2" size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="college">College Admins</option>
                <option value="incubator">Incubator Managers</option>
                <option value="admin">Super Admins</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  {selectedUsers.length} user(s) selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="btn-sm bg-green-600 text-white hover:bg-green-700"
                  >
                    <FiCheckCircle className="mr-1" size={14} />
                    Activate
                  </button>
                  <button
                    onClick={() => handleBulkAction('suspend')}
                    className="btn-sm bg-yellow-600 text-white hover:bg-yellow-700"
                  >
                    <FiClock className="mr-1" size={14} />
                    Suspend
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="btn-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    <FiTrash2 className="mr-1" size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-secondary-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900 dark:text-white">
                      {user.college || user.organization}
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">
                      {user.area}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500 dark:text-secondary-400">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-700 dark:text-green-400"
                        title="Edit User"
                      >
                        <FiEdit size={16} />
                      </button>
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleUserAction('suspend', user.id)}
                          className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400"
                          title="Suspend User"
                        >
                          <FiClock size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction('activate', user.id)}
                          className="text-green-600 hover:text-green-700 dark:text-green-400"
                          title="Activate User"
                        >
                          <FiCheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleUserAction('delete', user.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400"
                        title="Delete User"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="mx-auto text-secondary-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No users have been added yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
