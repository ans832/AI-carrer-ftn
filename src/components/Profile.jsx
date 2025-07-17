import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const navigate = useNavigate();

  let email = 'Guest';
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email || 'Unknown';
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('✅ Token removed, user logged out.');
    navigate('/'); // optional redirect after logout
  };

  return (
    <div className="fixed top-24 right-4 z-50">
      <div className="bg-gray min-w-[300px] max-w-xs shadow-lg border border-gray-200 rounded-lg p-4">
        <li className="p-2 rounded-md bg-gray-400 duration-300 flex items-center gap-2 list-none">
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <div>
            <span className="font-medium block">{email}</span>
            <a
              className="text-yellow-100 hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </a>
          </div>
        </li>
      </div>
    </div>
  );
};

export default Profile;
