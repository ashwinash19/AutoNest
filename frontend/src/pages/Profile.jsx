// src/pages/Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import Admin from './Admin'; // Import Admin component
import '../Styling/Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* User Icon */}
        <div className="profile-icon">
          <FaUserCircle size={80} color="#00796b" />
        </div>

        {/* Profile Info */}
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>

        {/* Conditionally render Admin Dashboard inside Profile if admin */}
        {user?.role === 'admin' && (
          <>
            <hr className="divider" />
            <Admin />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
