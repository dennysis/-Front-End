import React, { useEffect, useState } from 'react';
import { getAdmins } from '../../api';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAdmins();
        setAdmins(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch admins');
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Admin List</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} - {admin.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
