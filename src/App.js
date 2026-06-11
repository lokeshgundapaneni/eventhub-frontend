import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyBookings from './pages/MyBookings';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import TicketDetails from './pages/TicketDetails';
import Footer from './components/Footer';
import Events from './pages/Events';
import UpdateEventForm from './pages/UpdateEventForm';
import { Toaster } from 'react-hot-toast';
import EditUser from './pages/EditUser';
import UserList from './components/UserList'
import CategoryList from './components/CategoryList';
import EventList from './components/EventList';
import CreateCategory from './pages/CreateCategory';
import UpdateCategory from './pages/UpdateCategory';
import ContactPage from './pages/ContactPage';
import TestimonialForm from './pages/TestimonialForm';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>

    <Navbar />
    <ScrollToTop/>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/events/:id" element={<EventDetails/>} />
      <Route path="/my-bookings" element={<MyBookings/>}/>
      <Route path="/organizer-dashboard" element={<OrganizerDashboard/>}/>
      <Route path="/update-event/:id" element={<UpdateEventForm />} />
      <Route path="/create-event" element={<CreateEvent/>}/>
      <Route path='/ticket-details/:id' element={<TicketDetails/>}/>
      <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
       <Route path="/admin/eventsList" element={<EventList/>}/>
      <Route path="/admin/categories" element={<CategoryList/>}/>
      <Route path="admin/editUser/:id" element={<EditUser/>}/>
      <Route path="/admin/users" element={<UserList/>}/>
      <Route path="admin/editUser/:id" element={<EditUser/>}/>
      <Route path="/create-category" element={<CreateCategory/>}/>
      <Route path="/update-category/:id" element={<UpdateCategory/>}/>
      <Route path="/contact-form" element={<ContactPage/>}/>
      <Route path="/testimonials" element={<TestimonialForm/>}/>
    </Routes>

    <Footer />

    </BrowserRouter>
  );
}

export default App;
