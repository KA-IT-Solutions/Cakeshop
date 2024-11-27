import React, { useState, useEffect } from 'react';
import './Home.css';
import Product from '../Product/Product';

const Home = () => {
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

  return (
    <>
      <div className="hero">
        <div className={`hero-content ${isMenuOpen ? 'hidden' : ''}`}>
          <h1 className='hero-h1'>Welcome to You The Lila's Cakes</h1>
          <p className='hero-p'>Made with Love..!!</p>
          {/* <button className="hero-button">Get Started</button> */}
        </div>
      </div>
      <Product />
    </>
  );
};

export default Home;
