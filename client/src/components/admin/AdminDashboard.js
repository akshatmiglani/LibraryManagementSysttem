import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../naviagtion/Nav';
import Header from '../header/Header';
import Dashboard from '../librarian/Dashboard';
import BookManagement from '../librarian/BookManagement';
// import Reports from './Reports';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'books' && (
            <BookManagement
              books={books}
              addBook={addBook}
              updateBook={updateBook}
              deleteBook={deleteBook}
            />
          )}
          {/* {activeTab === 'users' && <UserManagement />} */}
          {/* {activeTab === 'reports' && <Reports />} */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;