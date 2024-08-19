import React, { useState } from 'react';
import { createAdmin, updateAdmin } from '../../api';

const AdminForm = ({ admin = {}, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: admin.name || '',
    email: admin.email || '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin.id) {
        await updateAdmin(admin.id, formData);
      } else {
        await createAdmin(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Failed to submit admin:', error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>{admin.id ? 'Update Admin' : 'Create Admin'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{admin.id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default AdminForm;
