import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './CustomizeCake.css';
import cakesData1 from '../CustomizeCake.json';

const CustomizeCake = () => {
  const [filters, setFilters] = useState({ type: '', flavor: '', quantity: '', dietary: '' });
  const [filteredCakes, setFilteredCakes] = useState(cakesData1);

  useEffect(() => {
    let filtered = cakesData1;

    if (filters.type) {
      filtered = filtered.filter(cake => cake.type.toLowerCase().includes(filters.type.toLowerCase()));
    }
    if (filters.flavor) {
      filtered = filtered.filter(cake => cake.flavor.toLowerCase().includes(filters.flavor.toLowerCase()));
    }
    if (filters.quantity) {
      filtered = filtered.filter(cake => cake.quantity === filters.quantity);
    }
    if (filters.dietary) {
      filtered = filtered.filter(cake => cake.dietary && cake.dietary.toLowerCase().includes(filters.dietary.toLowerCase()));
    }

    setFilteredCakes(filtered);
  }, [filters]);

  return (
    <div className="customize-cake-shop">


      <div className="customize-cake-hero">
        <div className="customize-cake-hero-content">
          <h1 className="customize-cake-hero-h1">Taste the Magic of Our Cakes</h1>
          <p className="customize-cake-hero-p">The Perfect Cake for Every Occasion</p>
        </div>
      </div>

      <div className="customize-filters">
        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">Select Cake Type</option>
          <option value="sponge cake">Sponge Cake</option>
          <option value="cheesecake">Cheesecake</option>
          <option value="mousse cake">Mousse Cake</option>
          <option value="ice cream cake">Ice Cream Cake</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, flavor: e.target.value })}>
          <option value="">Select Flavor</option>
          <option value="vanilla">Vanilla</option>
          <option value="chocolate">Chocolate</option>
          <option value="red velvet">Red Velvet</option>
          <option value="lemon">Lemon</option>
          <option value="strawberry">Strawberry</option>
          <option value="coffee">Coffee</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, quantity: e.target.value })}>
          <option value="">Select Quantity</option>
          <option value="1 kg">1 kg</option>
          <option value="2 kg">2 kg</option>
          <option value="3 kg">3 kg</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, dietary: e.target.value })}>
          <option value="">Select Dietary Preference</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="vegan">Vegan</option>
          <option value="sugar-free">Sugar-Free</option>
          <option value="nut-free">Nut-Free</option>
          <option value="dairy-free">Dairy-Free</option>
        </select>
      </div>
      <div className="customize-cake-cards">
        {filteredCakes.map(cake => (
          <div key={cake.id} className="customize-cake-card">
            <img src={cake.image} alt={cake.name} className="customize-cake-image" />
            <div className="customize-cake-details">
              <h3>{cake.name}</h3>
              <p>{cake.quantity}</p>
              <p className="customize-price">
                <span className="customize-original-price">₹{cake.price * 1.2}</span> {/* Assuming original price is 20% higher */}
                <span className="customize-discounted-price">₹{cake.price}</span>
              </p>
              <button className="customize-whatsapp-button">
                <FaWhatsapp /> Buy on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizeCake;
