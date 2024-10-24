// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './RegularCake.css';

// const RegularCake = () => {
//   const [cakes, setCakes] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/cakes') // Ensure this matches your backend server URL
//       .then((res) => setCakes(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="cake-shop">
//       {cakes.map((cake) => (
//         <div key={cake.id} className="regular-cake-card">
//           <img
//             src={`http://localhost:5000${cake.image}`} // Adjusting the image path to match the server
//             alt={`Image of ${cake.name}`}
//             className="regular-cake-image"
//           />
//           <h3>{cake.name}</h3>
//           <p>{cake.quantity}</p>
//           <p>₹{cake.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RegularCake;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegularCake.css';
import { FaShoppingBasket } from "react-icons/fa";
import { generateWhatsAppLink } from "../whatsapplink/utils";

const RegularCake = () => {
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/cakes')
      .then((res) => {
        setCakes(res.data);
        setFilteredCakes(res.data); // Initial setting
      })
      .catch((err) => console.error(err));
  }, []);

  const filterCakes = () => {
    let filtered = cakes;

    if (selectedPrice) {
      filtered = filtered.filter(cake => cake.price <= selectedPrice);
    }

    if (selectedQuantity) {
      filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
    }

    if (selectedCategory) {
      filtered = filtered.filter(cake => cake.category === selectedCategory);
    }

    setFilteredCakes(filtered);
  };

  useEffect(() => {
    filterCakes();
  }, [selectedPrice, selectedQuantity, selectedCategory]);

  return (
    <div className="cake-shop">
      {/* Banner */}
      <div className="regular-cake-hero1">
        <div className="regular-cake-hero1-content">
          <h1 className="regular-cake-hero1-h1">Regular Cakes</h1>
          <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setSelectedPrice(e.target.value)} value={selectedPrice}>
          <option value="">Select Price</option>
          <option value="500">Up to ₹500</option>
          <option value="1000">Up to ₹1000</option>
          <option value="2000">Up to ₹2000</option>
        </select>

        <select onChange={(e) => setSelectedQuantity(e.target.value)} value={selectedQuantity}>
          <option value="">Select Quantity</option>
          <option value="1kg">1kg</option>
          <option value="500g">500g</option>
        </select>

        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Select Category</option>
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="anniversary">Anniversary</option>
        </select>
      </div>

      {/* Cake Cards */}
      <div className="regular-cake-cards">
        {filteredCakes.map((cake) => (
          <div key={cake.id} className="regular-cake-card">
            <img
              src={`http://localhost:5000${cake.image}`}
              alt={`Image of ${cake.name}`}
              className="regular-cake-image"
            />
            <h3>{cake.name}</h3>
            <p>(mini){cake.quantity}</p>
            <p>₹{cake.price} {' '} Per Kg</p>
            {/* WhatsApp Button */}
            <button className="regular-whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
                   <a
                    href={generateWhatsAppLink(cake)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     <FaShoppingBasket /> Buy on WhatsApp
                   </a>
                 </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegularCake;
