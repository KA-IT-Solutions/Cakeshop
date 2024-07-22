import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import RegularCake from './Components/RegularCake/RegularCake';
import CustomizeCake from './Components/CustomizeCake/CustomizeCake';
import Contact from './Components/Contact/Contact';


function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regularcake" element={<RegularCake/>} />
          <Route path="/CustomizeCake" element={<CustomizeCake/>} /> 
          <Route path="/Contact" element={<Contact/>} /> 
        </Routes>
       
      <Footer/>
    </Router>
 
  );
}

export default App;
