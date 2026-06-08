import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';
import EventDetails from './pages/EventDetails';
import ManageUsers from './pages/ManageUsers';
import ManageCategories from './pages/ManageCategories';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Events from './pages/Events';

function App() {
  return (
    <BrowserRouter>

    <Navbar />

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/events/:id" element={<EventDetails/>} />
      <Route path="/my-bookings" element={<MyBookings/>}/>
      <Route path="/organizer/dashboard" element={<OrganizerDashboard/>}/>
      <Route path="/organizer/create-event" element={<CreateEvent/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin/users" element={<ManageUsers/>}/>
      <Route path="/admin/categories" element={<ManageCategories/>}/>
    </Routes>

    <Footer />

    </BrowserRouter>
  );
}

export default App;
