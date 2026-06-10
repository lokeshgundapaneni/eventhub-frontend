import React, { useEffect, useState } from 'react';
import userService from "../services/userService";
import '../styles/admin.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response || []);
      } catch (err) { console.error(err); }
    };
    fetchUsers();
  }, []);


  const handleUpdate=async ()=>{

  }

  const handleRemove=async ()=>{

  }

  return (
    <div className="table-container">
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
          {users.map((user) => (
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
                  <button className="btn-action edit-btn" onClick={()=>{handleUpdate()}}>Edit</button>
                  <button className="btn-action delete-btn" onSubmit={()=>{handleRemove()}}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;