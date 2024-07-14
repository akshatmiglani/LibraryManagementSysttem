import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookCard from '../Filtergenre/BookCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/borrowed-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrowed books:', error.response || error);
        setError('Failed to fetch borrowed books');
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <h1>Welcome to User Dashboard</h1>
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md">
          Logout
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Books Borrowed by You</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : borrowedBooks.length === 0 ? (
            <p>No books borrowed</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {borrowedBooks.map((borrowing) => (
                <BookCard key={borrowing._id} book={borrowing.book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
