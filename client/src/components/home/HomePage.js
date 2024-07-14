// src/components/home/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to the Portal</h1>
        <div>
          <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded mr-4">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
