import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import './CustomizeCake.css';
import cakesData1 from '../CustomizeCake.json'; // Assuming cakes.json is in the same directory

const CustomizeCake = () => {
  const [filters, setFilters] = useState({ name: '', price: '', quantity: '', category: '' });
  const [filteredCakes, setFilteredCakes] = useState(cakesData1);

  useEffect(() => {
    let filtered = cakesData1;

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
      <div className="regular-cake-hero">
        <div className="regular-cake-hero-content">
          <h1 className="regular-cake-hero-h1">Taste the Magic of Our Cakes</h1>
          <p className="regular-cake-hero-p">The Perfect Cake for Every Occasion</p>
        </div>
      </div>
      <div className="cake-shop">
        <div className="filters">
          <select onChange={(e) => setFilters({ ...filters, name: e.target.value })}>
            <option value="">Select Cake Name</option>
            <option value="lemon">Lemon</option>
            <option value="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
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
            <option value="anniversary">Anniversary</option>
            <option value="birthday party">Birthday Party</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="regular-cake-cards">
          {filteredCakes.map(cake => (
            <div key={cake.id} className="regular-cake-card">
              <img src={cake.image} alt={cake.name} className="regular-cake-image" />
              <div className="regular-cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="regular-price">
                  <span className="regular-original-price">₹{cake.price * 1.2}</span> {/* Assuming original price is 20% higher */}
                  <span className="regular-discounted-price">₹{cake.price}</span>
                </p>
                <button className="regular-whatsapp-button">
                  <FaShoppingBasket /> Buy on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomizeCake;


