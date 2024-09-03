
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import Regular from './RegularCake23.png';
import Anivarsary from './CusCake99.jpeg';
import Brithday from './Birthday.jpeg';
import Customise from './CusCake100.jpeg';
import cakesData from '../RegularData.json';
import customeData from '../CustomizeCake.json';
import baby from './CusCake90.png';
import Girls from './CusCake97.png';
import { FaShoppingBasket } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { generateWhatsAppLink } from '../whatsapplink/utils';

const Product = () => {
  const [modalImage, setModalImage] = useState(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  const handleCategoryClick = (category) => {
    navigate(`/regularcake?category=${encodeURIComponent(category)}`);
  };

  const handleCustomiseClick = (category) => {
    navigate(`/customizecake?category=${encodeURIComponent(category)}`);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };



 

  return (
    <>
      {/* Product Categories */}
      <div className='product'>
        <h1>Popular Categories</h1>
      </div>
      <div className='categories'>
        <div className="card-container">
          <div className="card">
            <img src={Regular} alt="Regular" className="card-image" onClick={() => handleImageClick(Regular)} />
            <button className="card-button" onClick={() => handleCategoryClick('Birthday Party')}>
              Regular Cake
            </button>
          </div>
          <div className="card">
            <img src={Anivarsary} alt="Anniversary" className="card-image" onClick={() => handleImageClick(Anivarsary)} />
            <button className="card-button" onClick={() => handleCustomiseClick('Anniversary')}>
              Anniversary Cake
            </button>
          </div>
          <div className="card">
            <img src={Brithday} alt="Birthday" className="card-image" onClick={() => handleImageClick(Brithday)} />
            <button className="card-button" onClick={() => handleCustomiseClick('boys')}>
              Boys Cake
            </button>
          </div>
          <div className="card">
            <img src={Girls} alt="Customise" className="card-image" onClick={() => handleImageClick(Girls)} />
            <button className="card-button" onClick={() => handleCustomiseClick('girls')}>
              Girls Cake
            </button>
          </div>
          <div className="card">
            <img src={baby} alt="Baby" className="card-image" onClick={() => handleImageClick(baby)} />
            <button className="card-button" onClick={() => handleCustomiseClick('baby')}>
              Baby Cake
            </button>
          </div>
          <div className="card">
            <img src={Customise} alt="Customise" className="card-image" onClick={() => handleImageClick(Customise)} />
            <button className="card-button" onClick={() => handleCustomiseClick('Customized')}>
              Customise Cake
            </button>
          </div>
        </div>
      </div>

      {/* Best Seller Of The Day */}
      <div className='product'>
        <h1>Best Seller Of The Day</h1>
      </div>
      <div className="slider-wrapper">
        <button className="scroll-button" onClick={scrollLeft}>‹</button>
        <div className="slider-container" ref={sliderRef}>
          {cakesData.map(cake => (
            <div key={cake.id} className="cake-card">
  <img
                src={process.env.PUBLIC_URL + cake.image}
                alt={`Image of ${cake.name}`}
                className="cake-image"
                onClick={() => handleCategoryClick(process.env.PUBLIC_URL + cake.image)}
              />              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span>
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                {/* <button className="whatsapp-button" >
                  <FaShoppingBasket /> Buy on WhatsApp
                </button> */}
                <button className="whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
                  <a href={generateWhatsAppLink(cake)} target="_blank" rel="noopener noreferrer">
                    <FaShoppingBasket /> Buy on WhatsApp
                  </a>
                </button>

              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={scrollRight}>›</button>
      </div>

      {/* Best Selling Cakes */}
      <div className='product'>
        <h1>Best Selling Cakes</h1>
      </div>
      <div className="slider-wrapper">
        <button className="scroll-button" onClick={scrollLeft}>‹</button>
        <div className="slider-container" ref={sliderRef}>
          {customeData.map(cake => (
            <div key={cake.id} className="cake-card">
              <img  src={process.env.PUBLIC_URL + cake.image}
                alt={`Image of ${cake.name}`}
                className="cake-image"
                onClick={() => handleImageClick(process.env.PUBLIC_URL + cake.image)} />
              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span>
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                {/* <button className="whatsapp-button">
                  <FaShoppingBasket /> Buy on WhatsApp
                </button> */}
                <button className="whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
                  <a href={generateWhatsAppLink(cake)} target="_blank" rel="noopener noreferrer" className='whatapp-text'>
                    <FaShoppingBasket /> Buy on WhatsApp
                  </a>
                </button>

              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={scrollRight}>›</button>
      </div>

      {/* Contact Us */}
      <div className='product'>
        <h1>Contact Us</h1>
      </div>
      <div className='contact-us'>
        <div className='map-sectio'>
          <div className='gmap-frame'>
            <iframe
              width="350"
              height="350"
              title='lilas company'
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=The%20Lila's%20Cake%20Shop%20-%200%20Dining%20Ratings%20-%200%20Delivery%20Ratings%20Bakery%20Kharadi,%20Pune+(Lila's%20Cake%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
        <div className='contact-icon-info'>
          <h2 className='lilas'>The Lila's Cake Shop</h2><br />
          <div className='contact-us-info'>
            <p className='contact-icon'><FontAwesomeIcon icon={faPhone} /> +91-9096797961</p><br />
          </div>
          <div className='contact-us-info'>
            <p className='contact-icon'><FontAwesomeIcon icon={faEnvelope} className='e' /> lilascakeshop@gmail.com</p><br />
          </div>
          <div className='contact-us-info'>
            <p className='contact-icon'><FontAwesomeIcon icon={faMapMarkerAlt} /> The Lila's cake shop, sadguru plaza, opposite more store, Rakshak Nagar, Kharadi, Pune, Maharashtra 411014, India</p><br />
          </div>
        </div>
      </div>

      {/* Modal for Full-Size Image */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full Size" className="full-size-image" />
            <span className="close-icon" onClick={closeModal}>&times;</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
