import React from 'react';

const AdminNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">Admin Panel</div>
      <ul className="flex-1">
        <NavItem
          isActive={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          label="Dashboard"
        />
        <NavItem
          isActive={activeTab === 'books'}
          onClick={() => setActiveTab('books')}
          label="Book Management"
        />
        <NavItem
          isActive={activeTab === 'logs'}
          onClick={() => setActiveTab('logs')}
          label="Admin Logs"
        />
      </ul>
    </nav>
  );
};

const NavItem = ({ isActive, onClick, label }) => (
  <li className="border-b border-gray-700">
    <button
      onClick={onClick}
      className={`block p-4 hover:bg-gray-700 transition-colors ${isActive ? 'bg-gray-600' : ''}`}
    >
      {label}
    </button>
  </li>
);

export default AdminNav;
