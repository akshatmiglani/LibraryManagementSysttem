import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/logs', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setLogs(response.data);
    })
    .catch(error => {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch logs');
    });
  }, []);

  return (
    <div>
      <h1>Admin Logs</h1>
      {error && <p>{error}</p>}
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            {new Date(log.timestamp).toLocaleString()}: {log.user.username} ({log.user.email}) - {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLogs;
