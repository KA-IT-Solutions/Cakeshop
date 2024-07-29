import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useLocation,  useNavigate } from 'react-router-dom';
import './RegularCake.css';
import cakesData from '../RegularData.json';
import { generateWhatsAppLink } from '../whatsapplink/utils';

const RegularCake = ({ cake }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ name: '', price: '', quantity: '', category: '' });
  const [filteredCakes, setFilteredCakes] = useState(cakesData);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const menuIcon = document.querySelector('.menu-icon');
    const handleMenuClick = () => {
      setIsMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
      if (!menuIcon.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    menuIcon.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleClickOutside);

    return () => {
      menuIcon.removeEventListener('click', handleMenuClick);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);




  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get('category') || '';
    setFilters({ ...filters, category });
  }, [location.search]);




  useEffect(() => {
    let filtered = cakesData;

    if (filters.name) {
      filtered = filtered.filter(cake => cake.name.toLowerCase().includes(filters.name.toLowerCase()));
    }
    if (filters.price) {
      if (filters.price === '100-250') {
        filtered = filtered.filter(cake => cake.price >= 100 && cake.price <= 250);
      } else if (filters.price === 'below-500') {
        filtered = filtered.filter(cake => cake.price < 500);
      } else if (filters.price === 'above-500') {
        filtered = filtered.filter(cake => cake.price > 500);
      }
    }
    if (filters.quantity) {
      filtered = filtered.filter(cake => cake.quantity === filters.quantity);
    }
    if (filters.category) {
      filtered = filtered.filter(cake => cake.category.toLowerCase().includes(filters.category.toLowerCase()));
    }

    setFilteredCakes(filtered);
  }, [filters]);

  return (

    <>
      <div className="regular-cake-hero1">
        <div className={`regular-cake-hero1-content ${isMenuOpen ? 'hidden' : ''}`}>
          <h1 className="regular-cake-hero1-h1">Taste the Magic of Our Cakes</h1>
          <p className="regular-cake-hero1-p">The Perfect Cake for Every Occasion</p>
        </div>
      </div>
      <div className="cake-shop">
        <div className="filters">
          <select onChange={(e) => setFilters({ ...filters, name: e.target.value })}>
            <option value="">Select Cake Name</option>
            <option value="White Forrest">White Forrest</option>
            <option value="Black Velvet">Black Velvet</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Rose Gulkand">Rose Gulkand</option>
            <option value="Pineapple Cake">Pineapple Cake</option>
            <option value="Butter Scoth">Butter Scoth</option>
            <option value="Rus Malai">Rus Malai</option>
            <option value="Chocolate Crunch">Chocolate Crunch</option>
            <option value="Chocolate Truffle Cake">Chocolate Truffle Cake</option>
            <option value="Black Forrest">Black Forrest</option>
            <option value="Chocolate Chips">Chocolate Chips</option>
            <option value="Kitkat Chocolate">Kitkat Chocolate</option>
            <option value="Miled Chocalate">Miled Chocalate</option>
            <option value="Chocolate Cake">Chocolate Cake</option>
            <option value="Strawberry Chocolate">Strawberry Chocolate</option>
            <option value="Kaju Malai">Kaju Malai</option>
            <option value="Rich Coffee Chocalate">Rich Coffee Chocalate</option>
            <option value="Chocolate Mocca">Chocolate Mocca</option>
            <option value="Almond Trffle">Almond Trffle</option>
            <option value="Rus Malai">Rus Malai</option>
            {/* Add more options as needed */}
          </select>
          <select onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
            <option value="">Select Price Range</option>
            <option value="100-250">100 - 250</option>
            <option value="below-500">Below 500</option>
            <option value="above-500">Above 500</option>
          </select>
          <select onChange={(e) => setFilters({ ...filters, quantity: e.target.value })}>
            <option value="">Select Quantity</option>
            <option value="1 kg">1 kg</option>
            <option value="2 kg">2 kg</option>
            <option value="3 kg">3 kg</option>
          </select>
          <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
            <option value="">Select Category</option>
            <option value="aniversary">Anniversary</option>
            <option value="birthday party">Birthday Party</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="regular-cake-cards">
          {filteredCakes.map(cake => (
            <div key={cake.id} className="regular-cake-card">

        <img  src={process.env.PUBLIC_URL + cake.image} alt={cake.name} className="regular-cake-image" />


               
              <div className="regular-cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="regular-price">
                  <span className="regular-original-price">₹{cake.price * 1.2}</span> {/* Assuming original price is 20% higher */}
                  <span className="regular-discounted-price">₹{cake.price}</span>
                </p>
                <button className="regular-whatsapp-button">
                <a
                href={generateWhatsAppLink(cake)}
                target="_blank"
                rel="noopener noreferrer"
            >
                  <FaShoppingBasket /> Buy on WhatsApp
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RegularCake;
