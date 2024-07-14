import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GenreResults from "./components/Filtergenre/GenreResults";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import HomePage from "./components/home/HomePage";
import LibrarianDashboard from "./components/librarian/LibrarianDashboard";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/signup/SignupPage";
import UserDashboard from "./components/user/UserDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={AdminDashboard} roles={["admin"]} />}
        />
        <Route
          path="/librarian"
          element={
            <PrivateRoute element={LibrarianDashboard} roles={["librarian"]} />
          }
        />
        <Route
          path="/user"
          element={<PrivateRoute element={UserDashboard} roles={["user"]} />}
        />
        <Route exact path="/books/:category" element={<GenreResults />} />
      </Routes>
    </Router>
  );
};

export default App;
