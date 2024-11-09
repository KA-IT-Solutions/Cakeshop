// import React, { useState, useEffect } from "react";
// import { FaShoppingBasket } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./CustomizeCake.css";
// import cakesData1 from "../CustomizeCake.json"; // Assuming CustomizeCake.json is in the same directory
// import { generateWhatsAppLink } from "../whatsapplink/utils";

// const CustomizeCake = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     category: "",
//   });
//   const [filteredCakes, setFilteredCakes] = useState(cakesData1);
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   // State to manage modal visibility and selected image
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const menuIcon = document.querySelector(".menu-icon");
//     const handleMenuClick = () => {
//       setIsMenuOpen((prev) => !prev);
//     };

//     const handleClickOutside = (event) => {
//       if (!menuIcon.contains(event.target) && isMenuOpen) {
//         setIsMenuOpen(false);
//       }
//     };

//     menuIcon.addEventListener("click", handleMenuClick);
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       menuIcon.removeEventListener("click", handleMenuClick);
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const category = query.get("category") || "";
//     setFilters({ ...filters, category });
//   }, [location.search]);

//   useEffect(() => {
//     let filtered = cakesData1;

//     // Normalize filters
//     const normalizedFilters = {
//       name: filters.name.trim().toLowerCase(),
//       price: filters.price.trim(),
//       quantity: filters.quantity.trim(),
//       category: filters.category.trim().toLowerCase(),
//     };

//     // Apply filters
//     if (normalizedFilters.name) {
//       filtered = filtered.filter((cake) =>
//         cake.name.toLowerCase().includes(normalizedFilters.name)
//       );
//     }
//     if (normalizedFilters.price) {
//       if (normalizedFilters.price === "100-500") {
//         filtered = filtered.filter(
//           (cake) => cake.price >= 100 && cake.price <= 500
//         );
//       } else if (normalizedFilters.price === "below-1000") {
//         filtered = filtered.filter((cake) => cake.price <= 1000);
//       } else if (normalizedFilters.price === "above-1000") {
//         filtered = filtered.filter((cake) => cake.price > 1000);
//       }
//     }
//     if (normalizedFilters.quantity) {
//       filtered = filtered.filter(
//         (cake) => cake.quantity.trim() === normalizedFilters.quantity
//       );
//     }
//     if (normalizedFilters.category) {
//       filtered = filtered.filter((cake) =>
//         cake.category.toLowerCase().includes(normalizedFilters.category)
//       );
//     }

//     setFilteredCakes(filtered);
//   }, [filters]);

//   // Function to open the image in a modal
//   const openModal = (image) => {
//     setSelectedImage(image);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <>
//       <div className="regular-cake-hero">
//         <div
//           className={`regular-cake-hero-content ${isMenuOpen ? "hidden" : ""}`}
//         >
//           <h1 className="regular-cake-hero-h1">Taste the Magic of Our Cakes</h1>
//           <p className="regular-cake-hero-p">
//             The Perfect Cake for Every Occasion
//           </p>
//         </div>
//       </div>
//       <div className="cake-shop">
//         <div className="filters">
//           <select
//             onChange={(e) => setFilters({ ...filters, price: e.target.value })}
//           >
//             <option value="">Select Price Range</option>
//             <option value="100-500">100 - 500</option>
//             <option value="below-1000">Below 1000</option>
//             <option value="above-1000">Above 1000</option>
//           </select>
//           <select
//             onChange={(e) =>
//               setFilters({ ...filters, quantity: e.target.value })
//             }
//           >
//             <option value="">Select Quantity</option>
//             <option value="1 kg">1 kg</option>
//             <option value="1.5 kg">1.5 kg</option>
//             <option value="2 kg">2 kg</option>
//             <option value="2.5 kg">2.5 kg</option>
//             <option value="3 kg">3 kg</option>
//             <option value="4 kg">4 kg</option>
//             <option value="5 kg">5 kg</option>
//             <option value="7 kg">7 kg</option>
//           </select>
//           <select
//             onChange={(e) =>
//               setFilters({ ...filters, category: e.target.value })
//             }
//           >
//             <option value="">Select Category</option>
//             <option value="Anniversary">Anniversary</option>
//             <option value="Customized">Customized Cake</option>
//             <option value="Boys">Boys Cake</option>
//             <option value="Girls">Girls Cake</option>
//             <option value="baby">Baby Cake</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//         <div className="regular-cake-cards">
//           {filteredCakes.map((cake) => (
//             <div key={cake.id} className="regular-cake-card">
//               <img
//                 src={process.env.PUBLIC_URL + cake.image}
//                 //alt={cake.name}
//                 alt={`Image of ${cake.name}`}
//                 className="regular-cake-image"
//                 onError={(e) => e.target.src = 'fallback-image-url'}
//                 onClick={() => openModal(process.env.PUBLIC_URL + cake.image)}
//               />
//               <div className="regular-cake-details">
//                 <h3>{cake.name}</h3>
//                 <p> (Mini) {cake.quantity}</p>
//                 <p className="regular-price">
//                   <span className="regular-original-price">
//                     ₹{cake.price * 1.2}
//                   </span>{" "}
//                   {/* Assuming original price is 20% higher */}
//                   <span className="regular-discounted-price">
//                     ₹{cake.price} Per kg
//                   </span>
//                 </p>
//                 <button className="regular-whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
//                    <a
//                     href={generateWhatsAppLink(cake)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                      <FaShoppingBasket /> Buy on WhatsApp
//                    </a>
//                  </button>
//             </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {selectedImage && (
//         <div className="image-modal" onClick={closeModal}>
//           <span className="image-modal-close">&times;</span>
//           <img
//             src={selectedImage}
//             alt="Full size"
//             className="image-modal-content"
//             onClick={(e) => e.stopPropagation()}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomizeCake;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import './RegularCake.css';
// import { FaShoppingBasket } from "react-icons/fa";
// import { generateWhatsAppLink } from "../whatsapplink/utils";

// const CustomizeCake = () => {
//   const [cakes, setCakes] = useState([]);
//   const [filteredCakes, setFilteredCakes] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/custom_cakes')
//       .then((res) => {
//         setCakes(res.data);
//         setFilteredCakes(res.data); // Initial setting
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const filterCakes = () => {
//     let filtered = cakes;

//     if (selectedPrice) {
//       filtered = filtered.filter(cake => cake.price <= selectedPrice);
//     }

//     if (selectedQuantity) {
//       filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter(cake => cake.category === selectedCategory);
//     }

//     setFilteredCakes(filtered);
//   };

//   useEffect(() => {
//     filterCakes();
//   }, [selectedPrice, selectedQuantity, selectedCategory]);

//   return (
//     <div className="cake-shop">
//       {/* Banner */}
//       <div className="regular-cake-hero1">
//         <div className="regular-cake-hero1-content">
//           <h1 className="regular-cake-hero1-h1">Regular Cakes</h1>
//           <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedPrice(e.target.value)} value={selectedPrice}>
//           <option value="">Select Price</option>
//           <option value="500">Up to ₹500</option>
//           <option value="1000">Up to ₹1000</option>
//           <option value="2000">Up to ₹2000</option>
//         </select>

//         <select onChange={(e) => setSelectedQuantity(e.target.value)} value={selectedQuantity}>
//           <option value="">Select Quantity</option>
//           <option value="1kg">1kg</option>
//           <option value="500g">500g</option>
//         </select>

//         <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//           <option value="">Select Category</option>
//           <option value="birthday">Birthday</option>
//           <option value="wedding">Wedding</option>
//           <option value="anniversary">Anniversary</option>
//         </select>
//       </div>

//       {/* Cake Cards */}
//       <div className="regular-cake-cards">
//         {filteredCakes.map((cake) => (
//           <div key={cake.id} className="regular-cake-card">
//             <img
//               src={`http://localhost:5000${cake.image}`}
//               alt={`Image of ${cake.name}`}
//               className="regular-cake-image"
//             />
//             <h3>{cake.name}</h3>
         
//             <p>(mini){cake.quantity}</p>
//             <p className="price">
//                   <span className="original-price">₹{cake.price * 1.2}</span>
//                   <span className="discounted-price">₹{cake.price}</span>
//                 </p>
//             {/* WhatsApp Button */}
//             <button className="regular-whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
//                    <a
//                     href={generateWhatsAppLink(cake)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                      <FaShoppingBasket /> Buy on WhatsApp
//                    </a>
//                  </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomizeCake;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingBasket } from "react-icons/fa";
// import { generateWhatsAppLink } from "../whatsapplink/utils";
// import './CustomizeCake.css';

// const CustomizeCake = () => {
//   const [cakes, setCakes] = useState([]);
//   const [filteredCakes, setFilteredCakes] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
  
//   // State for Modal
//   const [modalImage, setModalImage] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/custom_cakes')
//       .then((res) => {
//         setCakes(res.data);
//         setFilteredCakes(res.data); // Initial setting
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const filterCakes = () => {
//     let filtered = cakes;

//     if (selectedPrice) {
//       filtered = filtered.filter(cake => cake.price <= selectedPrice);
//     }

//     if (selectedQuantity) {
//       filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
//     }

//     if (selectedCategory) {
//       filtered = filtered.filter(cake => cake.category === selectedCategory);
//     }

//     setFilteredCakes(filtered);
//   };

//   useEffect(() => {
//     filterCakes();
//   }, [selectedPrice, selectedQuantity, selectedCategory]);

//   // Function to handle image click and open modal
//   const handleImageClick = (image) => {
//     setModalImage(image);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalImage(null);
//   };

//   return (
//     <div className="cake-shop">
//       {/* Banner */}
//       <div className="regular-cake-hero1">
//         <div className="regular-cake-hero1-content">
//           <h1 className="regular-cake-hero1-h1">Taste the Magic of Our Cakes</h1>
//           <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedPrice(e.target.value)} value={selectedPrice}>
//           <option value="">Select Price</option>
//           <option value="500">Up to ₹500</option>
//           <option value="1000">Up to ₹1000</option>
//           <option value="2000">Up to ₹2000</option>
//         </select>

//         <select onChange={(e) => setSelectedQuantity(e.target.value)} value={selectedQuantity}>
//           <option value="">Select Quantity</option>
//           <option value="1kg">1kg</option>
//           <option value="500g">500g</option>
//         </select>

//         <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//           <option value="">Select Category</option>
//           <option value="birthday">Birthday</option>
//           <option value="wedding">Wedding</option>
//           <option value="anniversary">Anniversary</option>
//         </select>
//       </div>

//       {/* Cake Cards */}
//       <div className="regular-cake-cards">
//         {filteredCakes.map((cake) => (
//           <div key={cake.id} className="regular-cake-card">
//             <img
//               src={`http://localhost:5000${cake.image}`}
//               alt={`Image of ${cake.name}`}
//               className="regular-cake-image"
//               onClick={() => handleImageClick(`http://localhost:5000${cake.image}`)}
//             />
//             <h3>{cake.name}</h3>
//             <p>(mini) {cake.quantity}</p>
//             <p className="price">
//               <span className="original-price">₹{cake.price * 1.2}</span>
//               <span className="discounted-price">₹{cake.price}</span>
//             </p>
//             {/* WhatsApp Button */}
//             <button  aria-label={`Buy ${cake.name} on WhatsApp`}>
//               <a
//                 href={generateWhatsAppLink(cake)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="regular-whatsapp-button"
//               >
//                 <FaShoppingBasket /> Buy on WhatsApp
//               </a>
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Full-Size Image */}
//       {modalImage && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img src={modalImage} alt="Full Size Cake" className="modal-image" />
//             <span className="close-icon" onClick={closeModal}>&times;</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizeCake;




















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingBasket } from "react-icons/fa";
// import { generateWhatsAppLink } from "../whatsapplink/utils";
// import { useLocation } from 'react-router-dom'; // For accessing the query parameter
// import './CustomizeCake.css';

// const CustomizeCake = () => {
//   const [cakes, setCakes] = useState([]);
//   const [filteredCakes, setFilteredCakes] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
  
//   // State for Modal
//   const [modalImage, setModalImage] = useState(null);

//   // Get the query parameters from the URL (category query)
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const categoryFromUrl = searchParams.get('category'); // Extract category from URL query

//   useEffect(() => {
//     // Fetch all cakes
//     axios.get('http://localhost:5000/custom_cakes')
//       .then((res) => {
//         setCakes(res.data);
//         setFilteredCakes(res.data); // Initial setting
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // useEffect(() => {
//   //   if (categoryFromUrl) {
//   //     setSelectedCategory(categoryFromUrl); // Set the category from URL if it exists
//   //   }
//   // }, [categoryFromUrl]);

//   // const filterCakes = () => {
//   //   let filtered = cakes;

//   //   // Filter by price
//   //   if (selectedPrice) {
//   //     filtered = filtered.filter(cake => cake.price <= selectedPrice);
//   //   }

//   //   // Filter by quantity
//   //   if (selectedQuantity) {
//   //     filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
//   //   }

//   //   // Filter by category
//   //   if (selectedCategory) {
//   //     filtered = filtered.filter(cake => cake.category === selectedCategory);
//   //   }

//   //   setFilteredCakes(filtered); // Update the filtered cakes state
//   // };

//   // useEffect(() => {
//   //   filterCakes(); // Re-filter when filters change
//   // }, [selectedPrice, selectedQuantity, selectedCategory]);




//   useEffect(() => {
//     if (categoryFromUrl) {
//       setSelectedCategory(categoryFromUrl); // Set the category from URL if it exists
//     }
//   }, [categoryFromUrl]);
  
//   useEffect(() => {
//     filterCakes(); // Re-filter when filters change
//   }, [selectedPrice, selectedQuantity, selectedCategory]);
  
//   // Filtering function
//   const filterCakes = () => {
//     let filtered = cakes;
  
//     // Filter by price
//     if (selectedPrice) {
//       filtered = filtered.filter(cake => cake.price <= selectedPrice);
//     }
  
//     // Filter by quantity
//     if (selectedQuantity) {
//       filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
//     }
  
//     // Filter by category
//     if (selectedCategory) {
//       filtered = filtered.filter(cake => cake.category === selectedCategory);
//     }
  
//     setFilteredCakes(filtered); // Update the filtered cakes state
//   };
  
//   // Function to handle image click and open modal
//   const handleImageClick = (image) => {
//     setModalImage(image);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalImage(null);
//   };

//   return (
//     <div className="cake-shop">
//       {/* Banner */}
//       <div className="regular-cake-hero1">
//         <div className="regular-cake-hero1-content">
//           <h1 className="regular-cake-hero1-h1">Taste the Magic of Our Cakes</h1>
//           <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedPrice(e.target.value)} value={selectedPrice}>
//           <option value="">Select Price</option>
//           <option value="500">Up to ₹500</option>
//           <option value="1000">Up to ₹1000</option>
//           <option value="2000">Up to ₹2000</option>
//         </select>

//         <select onChange={(e) => setSelectedQuantity(e.target.value)} value={selectedQuantity}>
//           <option value="">Select Quantity</option>
//           <option value="1kg">1kg</option>
//           <option value="500g">500g</option>
//         </select>

//         <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
//           <option value="">Select Category</option>
//           <option value="birthday">Birthday</option>
//           <option value="wedding">Wedding</option>
//           <option value="anniversary">Anniversary</option>
//           <option value="boys">Boys</option>
//           <option value="girls">Girls</option>
//         </select>
//       </div>

//       {/* Cake Cards */}
//       <div className="regular-cake-cards">
//         {filteredCakes.length === 0 ? (
//           <p>No cakes available for this category.</p>
//         ) : (
//           filteredCakes.map((cake) => (
//             <div key={cake.id} className="regular-cake-card">
//               <img
//                 src={`http://localhost:5000${cake.image}`}
//                 alt={`Image of ${cake.name}`}
//                 className="regular-cake-image"
//                 onClick={() => handleImageClick(`http://localhost:5000${cake.image}`)}
//               />
//               <h3>{cake.name}</h3>
//               <p>(mini) {cake.quantity}</p>
//               <p className="price">
//                 <span className="original-price">₹{cake.price * 1.2}</span>
//                 <span className="discounted-price">₹{cake.price}</span>
//               </p>
//               {/* WhatsApp Button */}
//               <button aria-label={`Buy ${cake.name} on WhatsApp`}>
//                 <a
//                   href={generateWhatsAppLink(cake)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="regular-whatsapp-button"
//                 >
//                   <FaShoppingBasket /> Buy on WhatsApp
//                 </a>
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal for Full-Size Image */}
//       {modalImage && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img src={modalImage} alt="Full Size Cake" className="modal-image" />
//             <span className="close-icon" onClick={closeModal}>&times;</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizeCake;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaShoppingBasket } from "react-icons/fa";
// import { generateWhatsAppLink } from "../whatsapplink/utils";
// import { useLocation } from 'react-router-dom';
// import './CustomizeCake.css';

// const CustomizeCake = () => {
//   const [cakes, setCakes] = useState([]);
//   const [filteredCakes, setFilteredCakes] = useState([]);
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const [selectedQuantity, setSelectedQuantity] = useState('');


//   // State for Modal
//   const [modalImage, setModalImage] = useState(null);

//   // Get the query parameters from the URL (category query)
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const categoryFromUrl = searchParams.get('category'); // Extract category from URL query

//   // Fetching all cakes data
//   useEffect(() => {
//     axios.get('http://localhost:5000/custom_cakes')
//       .then((res) => {
//         setCakes(res.data);
//       })
//       .catch((err) => console.error('Error fetching custom cakes:', err));
//   }, []);

//   // Filter cakes based on the selected category and other filters
//   useEffect(() => {
//     let filtered = cakes;

//     // Filter by category from URL
//     if (categoryFromUrl) {
//       filtered = filtered.filter(cake => cake.category.toLowerCase() === categoryFromUrl.toLowerCase());
//     }

//     // Additional filters by price and quantity
//     if (selectedPrice) {
//       filtered = filtered.filter(cake => cake.price <= selectedPrice);
//     }

//     if (selectedQuantity) {
//       filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
//     }

//     setFilteredCakes(filtered);
//   }, [cakes, categoryFromUrl, selectedPrice, selectedQuantity]);

//   // Function to handle image click and open modal
//   const handleImageClick = (image) => {
//     setModalImage(image);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalImage(null);
//   };

//   return (
//     <div className="cake-shop">
//       {/* Banner */}
//       <div className="regular-cake-hero1">
//         <div className="regular-cake-hero1-content">
//           <h1 className="regular-cake-hero1-h1">Taste the Magic of Our Cakes</h1>
//           <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters">
//         <select onChange={(e) => setSelectedPrice(e.target.value)} value={selectedPrice}>
//           <option value="">Select Price</option>
//           <option value="500">Up to ₹500</option>
//           <option value="1000">Up to ₹1000</option>
//           <option value="2000">Up to ₹2000</option>
//         </select>

//         <select onChange={(e) => setSelectedQuantity(e.target.value)} value={selectedQuantity}>
//           <option value="">Select Quantity</option>
//           <option value="1kg">1kg</option>
//           <option value="500g">500g</option>
//         </select>
//       </div>

//       {/* Cake Cards */}
//       <div className="regular-cake-cards">
//         {filteredCakes.length === 0 ? (
//           <p>No cakes available for this category.</p>
//         ) : (
//           filteredCakes.map(cake => (
//             <div key={cake.id} className="cake-card">
//               <img
//                 src={`http://localhost:5000${cake.image}`}
//                 alt={cake.name}
//                 className="cake-image"
//                 onClick={() => handleImageClick(`http://localhost:5000${cake.image}`)}
//               />
//               <div className="cake-details">
//                 <h3>{cake.name}</h3>
//                 <p>(mini) {cake.quantity}kg</p>
//                 <p className="price">
//                   <span className="original-price">₹{cake.price * 1.2}</span>
//                   <span className="discounted-price">₹{cake.price}</span>
//                 </p>
//                 <a href={generateWhatsAppLink(cake)} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
//                   <FaShoppingBasket /> Buy on WhatsApp
//                 </a>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal for Full-Size Image */}
//       {modalImage && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img src={modalImage} alt="Full Size" className="full-size-image" />
//             <span className="close-icon" onClick={closeModal}>&times;</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizeCake;
















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingBasket } from 'react-icons/fa';
import { generateWhatsAppLink } from '../whatsapplink/utils';
import { useLocation } from 'react-router-dom';
import './CustomizeCake.css';

const CustomizeCake = () => {
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  // State for Modal
  const [modalImage, setModalImage] = useState(null);

  // Get the query parameters from the URL (category query)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category'); // Extract category from URL query

  // Fetching all cakes data
  useEffect(() => {
    axios
      .get('http://localhost:5000/custom_cakes')
      .then((res) => {
        setCakes(res.data);
      })
      .catch((err) => console.error('Error fetching custom cakes:', err));
  }, []);

  // Filter cakes based on the selected category and other filters
  useEffect(() => {
    let filtered = [...cakes];

    // Filter by category from URL
    if (categoryFromUrl) {
      filtered = filtered.filter((cake) =>
        cake.category.toLowerCase() === categoryFromUrl.toLowerCase()
      );
    }

    // Filter by price
    if (selectedPrice) {
      const priceLimit = parseInt(selectedPrice, 10);
      filtered = filtered.filter((cake) => cake.price <= priceLimit);
    }

    // Filter by quantity
    if (selectedQuantity) {
      filtered = filtered.filter(cake => cake.quantity === selectedQuantity);
    }

    setFilteredCakes(filtered);
  }, [cakes, categoryFromUrl, selectedPrice, selectedQuantity]);

  // Function to handle image click and open modal
  const handleImageClick = (image) => {
    setModalImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="cake-shop">
      {/* Banner */}
      <div className="regular-cake-hero1">
        <div className="regular-cake-hero1-content">
          <h1 className="regular-cake-hero1-h1">Taste the Magic of Our Cakes</h1>
          <p className="regular-cake-hero1-p">Delicious cakes for every occasion!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          onChange={(e) => setSelectedPrice(e.target.value)}
          value={selectedPrice}
        >
          <option value="">Select Price</option>
          <option value="500">Up to ₹500</option>
          <option value="1000">Up to ₹1000</option>
          <option value="2000">Up to ₹2000</option>
        </select>

        <select
          onChange={(e) => setSelectedQuantity(e.target.value)}
          value={selectedQuantity}
        >
          <option value="">Select Quantity</option>
          <option value="1kg">1kg</option>
          <option value="500g">500g</option>
        </select>
      </div>

      {/* Cake Cards */}
      <div className="regular-cake-cards">
        {filteredCakes.length === 0 ? (
          <p>No cakes available for this category.</p>
        ) : (
          filteredCakes.map((cake) => (
            <div key={cake.id} className="cake-card">
              <img
                src={`http://localhost:5000${cake.image}`}
                alt={cake.name}
                className="cake-image"
                onClick={() => handleImageClick(`http://localhost:5000${cake.image}`)}
              />
              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p> (mini){cake.quantity}kg</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span>
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                <a
                  href={generateWhatsAppLink(cake)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <FaShoppingBasket /> Buy on WhatsApp
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Full-Size Image */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full Size" className="full-size-image" />
            <span className="close-icon" onClick={closeModal}>
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeCake;
