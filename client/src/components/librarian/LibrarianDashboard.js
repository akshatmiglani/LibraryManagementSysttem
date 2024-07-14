import React from "react";
import { useNavigate } from 'react-router-dom';


const LibrarianDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
 
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <h1>Welcome to Librarian Dashboard</h1>
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md">
          Logout
        </button>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
