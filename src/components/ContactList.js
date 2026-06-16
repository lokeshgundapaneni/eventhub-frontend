import React, { useEffect, useState } from 'react';
import API from '../services/api';
import "../styles/admin.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    API.get('/api/contact/all')
      .then(res => {
        console.log("Data received:", res.data);
        setContacts(res.data);
      })
      .catch(err => console.error("Error fetching contacts:", err));
  }, []);


  const filteredContacts = contacts.filter(contact =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (

    <div className="admin-page">

      <div className="cat-toolbar">
        <input
          type="text"
          placeholder="🔍 Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="cat-search-input"
        />
      </div>
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
          {filteredContacts.map(c => (
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