import React  from "react";
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to '/'
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <h1>Welcome to User Dashboard</h1>
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md">
          Logout
        </button>
      </div>
    </div>
    
  );
};

export default UserDashboard;
