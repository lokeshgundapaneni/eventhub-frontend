import React, { useEffect, useState } from 'react';
import userService from "../services/userService";
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response || []);
      } catch (err) { console.error("Error fetching users:", err); }
    };
    fetchUsers();
  }, []);

  // Filter users based on name or email
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id) => {
    navigate(`/admin/editUser/${id}`);
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(u => u.id !== id)); // Update list locally
    } catch (err) { 
      console.error("Delete error:", err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="table-container">
      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="🔍 Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
        />
        <button className="btn-primary" onClick={() => navigate("/register")}>
          + Create New User
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role?.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>
              <td className="text-right">
                <div className="action-group">
                  <button className="btn-action edit-btn" onClick={() => handleUpdate(user.id)}>
                    Edit
                  </button>
                  <button className="btn-action delete-btn" onClick={() => handleRemove(user.id)}>
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;