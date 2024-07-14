import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import AdminDashboard from './components/admin/AdminDashboard';
import LibrarianDashboard from './components/librarian/LibrarianDashboard';
import UserDashboard from './components/user/UserDashboard';
import PrivateRoute from './components/PrivateRoute'; 
import HomePage from './components/home/HomePage';
import BookList from './components/home/BookList';
import BookDetails from './components/home/BookDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={AdminDashboard} roles={['admin']} />}
        />
        <Route
          path="/librarian"
          element={<PrivateRoute element={LibrarianDashboard} roles={['librarian']} />}
        />
        <Route
          path="/user"
          element={<PrivateRoute element={UserDashboard} roles={['user']} />}
        />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
