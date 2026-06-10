import React, { useState } from 'react';
import EventList from '../components/EventList';
import UserList from '../components/UserList';
import CategoryList from '../components/CategoryList';
import '../styles/admin.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="admin-dashboard-wrapper">
      <header className="admin-dashboard-header">
        <h1 className="special-heading">
          <span>Admin</span> Hub
        </h1>
        <div className="admin-tabs">
          <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Categories</button>
        </div>
      </header>

      <main className="admin-content-card">
        {activeTab === 'events' && <EventList />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'categories' && <CategoryList />}
      </main>
    </div>
  );
}

export default AdminDashboard;