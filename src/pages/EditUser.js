import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userService from '../services/userService';
import '../styles/form.css';

const EditUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (location.state?.user) {
          setFormData(location.state.user);
        } else {
          const user = await userService.getUserById(id);
          console.log("API Response:", user);
          setFormData(user);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Could not load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a clean object matching exactly what RegisterRequest expects
    const updatePayload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password || "defaultPassword123" // Must match what RegisterRequest expects
    };

    try {
      await userService.updateUser(id, updatePayload);
      navigate('/admin-dashboard');
    } catch (err) {
      console.error("Full Error Object:", err);
    }
  };

  if (loading) return <div className="loading">Loading user details...</div>;

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Edit User</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <label htmlFor="role">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role || 'USER'}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="ADMIN">Admin</option>
        <option value="USER">Organizer</option>
        <option value="USER">User</option>
      </select>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password || ''}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Leave blank to keep current"
      />

      <button type="submit" className="submit-btn">Update User</button>
      <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};

export default EditUser;