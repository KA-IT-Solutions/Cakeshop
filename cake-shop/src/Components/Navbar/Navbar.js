import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import cakeImage from './cake1.webp'; // Replace with your image path

const cakes = [
  { name: 'Chocolate Cake', price: 25, image: cakeImage },
  { name: 'Vanilla Cake', price: 20, image: cakeImage },
  { name: 'Strawberry Cake', price: 30, image: cakeImage },
  { name: 'Red Velvet Cake', price: 35, image: cakeImage },
  { name: 'Lemon Cake', price: 22, image: cakeImage },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCakes, setFilteredCakes] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = cakes.filter(cake => 
      cake.name.toLowerCase().includes(lowercasedTerm) ||
      cake.price.toString().includes(lowercasedTerm)
    );
    setFilteredCakes(results);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            MyWebsite
          </Link>
          <div className="menu-icon" onClick={toggleMenu}>
            <FaBars />
          </div>
          <div className={isOpen ? 'nav-menu active' : 'nav-menu'}>
            <Link to="/" className="nav-item" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="nav-item" onClick={toggleMenu}>About</Link>
            <Link to="/services" className="nav-item" onClick={toggleMenu}>Services</Link>
            <Link to="/contact" className="nav-item" onClick={toggleMenu}>Contact</Link>
            <div className="search-bar-mobile">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}><FaSearch /></button>
            </div>
          </div>
          <div className="search-bar-desktop">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}><FaSearch /></button>
          </div>
        </div>
      </nav>

      <div className="search-results">
        {filteredCakes.length > 0 ? (
          filteredCakes.map((cake, index) => (
            <div key={index} className="search-result">
              <img src={cake.image} alt={cake.name} />
              <div className="search-result-info">
                <h3>{cake.name}</h3>
                <p>${cake.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          searchTerm && <p>No results found</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
