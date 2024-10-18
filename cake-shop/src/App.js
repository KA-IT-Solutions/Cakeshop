import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import RegularCake from './Components/RegularCake/RegularCake';
import CustomizeCake from './Components/CustomizeCake/CustomizeCake';
import Contact from './Components/Contact/Contact';
import AdminPanel from './Components/Admin/Shared/AdminPanel';
import RegularAdmin from './Components/Admin/Regularadmin/Regularadmin';
import CustomizeAdmin from './Components/Admin/Customizeadmin/Customizeadmin';
import ContactAdmin from './Components/Admin/Contactadmin/Contactadmin';

function App() {
  const location = useLocation(); // Get the current route location

  // Conditionally render navbar and footer outside of the admin routes
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Conditionally render Navbar and Footer */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/regularcake" element={<RegularCake />} />
        <Route path="/CustomizeCake" element={<CustomizeCake />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="regular" element={<RegularAdmin />} />
          <Route path="customize" element={<CustomizeAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
        </Route>
      </Routes>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
