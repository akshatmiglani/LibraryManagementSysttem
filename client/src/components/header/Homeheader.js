import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 shadow p-4 flex justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="book-library.ico" alt="Library Logo" className="h-10" />
          <h1 className="text-xl font-bold text-white">Book Space</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default HomeHeader;
