import React, { useEffect, useState } from 'react';
import API from '../services/api';
import "../styles/admin.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    API.get('/api/contact/all')
      .then(res => {
        console.log("Data received:", res.data);
        setContacts(res.data);
      })
      .catch(err => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="admin-page">
      <h2>Contact Submissions</h2>
      <table className="brutalist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;