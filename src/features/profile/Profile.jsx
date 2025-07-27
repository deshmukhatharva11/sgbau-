import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  FiEdit3,
  FiSave,
  FiX,
  FiCamera,
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiGlobe
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize profile data based on user role
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
        // Student specific fields
        college: user.college || '',
        department: user.department || '',
        year: user.year || '',
        rollNumber: user.rollNumber || '',
        gpa: user.gpa || '',
        // College admin specific fields
        collegeName: user.collegeName || '',
        position: user.position || '',
        experience: user.experience || '',
        // Incubator specific fields
        organizationName: user.organizationName || '',
        designation: user.designation || '',
        expertise: user.expertise || '',
        // Common fields
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        joinedDate: user.joinedDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to update the profile
      console.log('Updating profile:', profileData);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
      college: user.college || '',
      department: user.department || '',
      year: user.year || '',
      rollNumber: user.rollNumber || '',
      gpa: user.gpa || '',
      collegeName: user.collegeName || '',
      position: user.position || '',
      experience: user.experience || '',
      organizationName: user.organizationName || '',
      designation: user.designation || '',
      expertise: user.expertise || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
      linkedin: user.linkedin || '',
      twitter: user.twitter || '',
      joinedDate: user.joinedDate || new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStudentFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            College
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.college}
              onChange={(e) => handleInputChange('college', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.college || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Department
          </label>
          {isEditing ? (
            <select
              value={profileData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="input-field"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics Engineering">Electronics Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
            </select>
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.department || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Year
          </label>
          {isEditing ? (
            <select
              value={profileData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className="input-field"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.year ? `${profileData.year}${profileData.year === '1' ? 'st' : profileData.year === '2' ? 'nd' : profileData.year === '3' ? 'rd' : 'th'} Year` : 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Roll Number
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.rollNumber}
              onChange={(e) => handleInputChange('rollNumber', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.rollNumber || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            GPA
          </label>
          {isEditing ? (
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={profileData.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.gpa || 'Not specified'}</p>
          )}
        </div>
      </div>
    </>
  );

  const renderCollegeFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            College Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.collegeName}
              onChange={(e) => handleInputChange('collegeName', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.collegeName || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Position
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="input-field"
              placeholder="e.g., Innovation Director, Dean, Professor"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.position || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Experience (Years)
          </label>
          {isEditing ? (
            <input
              type="number"
              min="0"
              value={profileData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.experience ? `${profileData.experience} years` : 'Not specified'}</p>
          )}
        </div>
      </div>
    </>
  );

  const renderIncubatorFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Organization Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.organizationName}
              onChange={(e) => handleInputChange('organizationName', e.target.value)}
              className="input-field"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.organizationName || 'Not specified'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Designation
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="input-field"
              placeholder="e.g., Program Manager, Investment Director"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.designation || 'Not specified'}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
            Areas of Expertise
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profileData.expertise}
              onChange={(e) => handleInputChange('expertise', e.target.value)}
              className="input-field"
              placeholder="e.g., Technology, Healthcare, Fintech, AI/ML"
            />
          ) : (
            <p className="text-secondary-900 dark:text-white">{profileData.expertise || 'Not specified'}</p>
          )}
        </div>
      </div>
    </>
  );

  if (!user) {
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
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
          Profile
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            <FiEdit3 className="mr-2" size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="btn-outline"
              disabled={loading}
            >
              <FiX className="mr-2" size={16} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSave className="mr-2" size={16} />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="card">
        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&size=128&background=3b82f6&color=ffffff`}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-secondary-700 shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full cursor-pointer hover:bg-primary-700 transition-colors duration-200">
                    <FiCamera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-center">
                <div className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                  {user.role === 'student' ? 'Student' : user.role === 'college' ? 'College Admin' : 'Incubator Manager'}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-xl font-semibold text-secondary-900 dark:text-white">{profileData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-secondary-900 dark:text-white">{profileData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-secondary-900 dark:text-white">{profileData.phone || 'Not specified'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-secondary-900 dark:text-white">{profileData.location || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-secondary-900 dark:text-white">{profileData.bio || 'No bio added yet.'}</p>
            )}
          </div>

          {/* Role-specific Fields */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
              {user.role === 'student' && <><FiBook className="mr-2" /> Academic Information</>}
              {user.role === 'college' && <><FiBriefcase className="mr-2" /> Professional Information</>}
              {user.role === 'incubator' && <><FiBriefcase className="mr-2" /> Organization Information</>}
            </h3>
            {user.role === 'student' && renderStudentFields()}
            {user.role === 'college' && renderCollegeFields()}
            {user.role === 'incubator' && renderIncubatorFields()}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
              <FiGlobe className="mr-2" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="input-field"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-secondary-900 dark:text-white">
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                        {profileData.website}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  LinkedIn
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="input-field"
                    placeholder="https://linkedin.com/in/username"
                  />
                ) : (
                  <p className="text-secondary-900 dark:text-white">
                    {profileData.linkedin ? (
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                        LinkedIn Profile
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Twitter
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="input-field"
                    placeholder="https://twitter.com/username"
                  />
                ) : (
                  <p className="text-secondary-900 dark:text-white">
                    {profileData.twitter ? (
                      <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                        Twitter Profile
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400">
              <FiCalendar className="mr-2" size={16} />
              Member since {new Date(profileData.joinedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
