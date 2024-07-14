import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Total Books" value="1,234" to="/books" />
      <DashboardCard title="Active Users" value="567" to="/users" />
      <DashboardCard title="Books Due Today" value="12" to="/reports/due-today" />
    </div>
  );
};

const DashboardCard = ({ title, value, to }) => (
  <Link to={to} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  </Link>
);

export default Dashboard;