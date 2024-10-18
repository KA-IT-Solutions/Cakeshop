import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegularCake.css';

const RegularCake = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cakes') // Ensure this matches your backend server URL
      .then((res) => setCakes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="cake-shop">
      {cakes.map((cake) => (
        <div key={cake.id} className="regular-cake-card">
          <img
            src={`http://localhost:5000${cake.image}`} // Adjusting the image path to match the server
            alt={`Image of ${cake.name}`}
            className="regular-cake-image"
          />
          <h3>{cake.name}</h3>
          <p>{cake.quantity}</p>
          <p>₹{cake.price}</p>
        </div>
      ))}
    </div>
  );
};

export default RegularCake;
