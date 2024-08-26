import React, { useState, useEffect } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomizeCake.css";
import cakesData1 from "../CustomizeCake.json"; // Assuming CustomizeCake.json is in the same directory
import { generateWhatsAppLink } from "../whatsapplink/utils";

const CustomizeCake = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [filteredCakes, setFilteredCakes] = useState(cakesData1);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const menuIcon = document.querySelector(".menu-icon");
    const handleMenuClick = () => {
      setIsMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
      if (!menuIcon.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    menuIcon.addEventListener("click", handleMenuClick);
    document.addEventListener("click", handleClickOutside);

    return () => {
      menuIcon.removeEventListener("click", handleMenuClick);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category") || "";
    setFilters({ ...filters, category });
  }, [location.search]);

  useEffect(() => {
    let filtered = cakesData1;

    // Normalize filters
    const normalizedFilters = {
      name: filters.name.trim().toLowerCase(),
      price: filters.price.trim(),
      quantity: filters.quantity.trim(),
      category: filters.category.trim().toLowerCase(),
    };

    // Apply filters
    if (normalizedFilters.name) {
      filtered = filtered.filter((cake) =>
        cake.name.toLowerCase().includes(normalizedFilters.name)
      );
    }
    if (normalizedFilters.price) {
      if (normalizedFilters.price === "100-500") {
        filtered = filtered.filter(
          (cake) => cake.price >= 100 && cake.price <= 500
        );
      } else if (normalizedFilters.price === "below-1000") {
        filtered = filtered.filter((cake) => cake.price < 1000);
      } else if (normalizedFilters.price === "above-1000") {
        filtered = filtered.filter((cake) => cake.price > 1000);
      }
    }
    if (normalizedFilters.quantity) {
      filtered = filtered.filter(
        (cake) => cake.quantity.trim() === normalizedFilters.quantity
      );
    }
    if (normalizedFilters.category) {
      filtered = filtered.filter((cake) =>
        cake.category.toLowerCase().includes(normalizedFilters.category)
      );
    }

    setFilteredCakes(filtered);
  }, [filters]);

  return (
    <>
      <div className="regular-cake-hero">
        <div
          className={`regular-cake-hero-content ${isMenuOpen ? "hidden" : ""}`}
        >
          <h1 className="regular-cake-hero-h1">Taste the Magic of Our Cakes</h1>
          <p className="regular-cake-hero-p">
            The Perfect Cake for Every Occasion
          </p>
        </div>
      </div>
      <div className="cake-shop">
        <div className="filters">
          {/* <select onChange={(e) => setFilters({ ...filters, name: e.target.value })}>
            <option value="">Select Cake Name</option>
            <option value="lemon">Lemon</option>
            <option value="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
          </select> */}
          <select
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Select Price Range</option>
            <option value="100-500">100 - 500</option>
            <option value="below-1000">Below 1000</option>
            <option value="above-1000">Above 1000</option>
          </select>
          <select
            onChange={(e) =>
              setFilters({ ...filters, quantity: e.target.value })
            }
          >
            <option value="">Select Quantity</option>
            <option value="1 kg">1 kg</option>
            <option value="1.5 kg">1.5 kg</option>
            <option value="2 kg">2 kg</option>
            <option value="2.5 kg">2.5 kg</option>
            <option value="3 kg">3 kg</option>
            <option value="4 kg">4 kg</option>
            <option value="5 kg">5 kg</option>
            <option value="7 kg">7 kg</option>
          </select>
          <select
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Customized">Customized Cake</option>
            <option value="Boys">Boys Cake</option>
            <option value="Girls">Girls Cake</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="regular-cake-cards">
          {filteredCakes.map((cake) => (
            <div key={cake.id} className="regular-cake-card">
              <img
                src={process.env.PUBLIC_URL + cake.image}
                //alt={cake.name}
                alt={`Image of ${cake.name}`}
                className="regular-cake-image"
                onError={(e) => e.target.src = 'fallback-image-url'}
              />
              <div className="regular-cake-details">
                <h3>{cake.name}</h3>
                <p> (Mini) {cake.quantity}</p>
                <p className="regular-price">
                  <span className="regular-original-price">
                    ₹{cake.price * 1.2}
                  </span>{" "}
                  {/* Assuming original price is 20% higher */}
                  <span className="regular-discounted-price">
                    ₹{cake.price} Per kg
                  </span>
                </p>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomizeCake;
