import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Phone, MapPin, Calendar, Briefcase, User as UserIcon } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p className="text-secondary">Manage your personal information</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar glass-panel">
          <div className="profile-avatar-container">
            <img 
              src={user.image || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="profile-avatar-large" 
            />
          </div>
          <h2 className="profile-name text-center mt-4">{user.firstName} {user.lastName}</h2>
          <p className="profile-username text-center text-secondary">@{user.username}</p>
          
          <div className="divider"></div>
          
          <div className="profile-quick-stats">
            <div className="stat-item">
              <span className="stat-value">{user.age || '--'}</span>
              <span className="stat-label">Age</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.gender || '--'}</span>
              <span className="stat-label">Gender</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{user.bloodGroup || '--'}</span>
              <span className="stat-label">Blood</span>
            </div>
          </div>
        </div>

        <div className="profile-details-main">
          <div className="glass-panel profile-section">
            <h3 className="section-title">
              <UserIcon size={20} className="text-primary mr-2" />
              Contact Information
            </h3>
            <div className="info-grid">
              <div className="info-group">
                <span className="info-icon"><Mail size={16} /></span>
                <div className="info-content">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
              <div className="info-group">
                <span className="info-icon"><Phone size={16} /></span>
                <div className="info-content">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{user.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel profile-section mt-6">
            <h3 className="section-title">
              <MapPin size={20} className="text-primary mr-2" />
              Address Details
            </h3>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">Street</span>
                  <span className="info-value">{user.address?.address || 'N/A'}</span>
                </div>
              </div>
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">City</span>
                  <span className="info-value">{user.address?.city || 'N/A'}</span>
                </div>
              </div>
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">State / Province</span>
                  <span className="info-value">{user.address?.state || 'N/A'}</span>
                </div>
              </div>
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">Postal Code</span>
                  <span className="info-value">{user.address?.postalCode || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel profile-section mt-6">
            <h3 className="section-title">
              <Briefcase size={20} className="text-primary mr-2" />
              Company Information
            </h3>
            <div className="info-grid">
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">Company Name</span>
                  <span className="info-value">{user.company?.name || 'N/A'}</span>
                </div>
              </div>
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">Department</span>
                  <span className="info-value">{user.company?.department || 'N/A'}</span>
                </div>
              </div>
              <div className="info-group">
                <div className="info-content">
                  <span className="info-label">Job Title</span>
                  <span className="info-value">{user.company?.title || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
