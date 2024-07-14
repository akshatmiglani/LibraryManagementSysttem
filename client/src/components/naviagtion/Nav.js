import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center text-2xl font-bold border-b border-blue-700">LMS</div>
      <ul className="flex-1">
        <NavItem to="/librarian" label="Dashboard" />
        <NavItem to="/books" label="Manage Books" />
        <NavItem to="/users" label="Manage Users" />
        <NavItem to="/reports" label="Reports" />
      </ul>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <li className="border-b bg-gray-800">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block p-4 hover:bg-blue-700 transition-colors ${isActive ? 'bg-blue-900' : ''}`
      }
    >
      {label}
    </NavLink>
  </li>
);

export default Nav;
