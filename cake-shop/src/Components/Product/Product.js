
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css'
import Regular from './CusCake103.jpeg'
import Anivarsary from './CusCake99.jpeg'
import Brithday from './Birthday.jpeg'
import Customise from './CusCake100.jpeg'
import cakesData from '../RegularData.json';
import customeData from '../CustomizeCake.json';
import { FaShoppingBasket } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {generateWhatsAppLink} from '../whatsapplink/utils';



const Product = () => {



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

  return (
    <>


      <div className='product'>
        <h1>Popular Categories</h1>
      </div>


      <div className='categories'>
        <div className="card-container">
          <div className="card">
            <img src={Regular} alt="Regular" className="card-image" />
            {/* <h3 className="card-title">Regular</h3> */}
            <button className="card-button" onClick={() => handleCategoryClick('Birthday Party')}>
              Regular Cake
            </button>
          </div>
          <div className="card">
            <img src={Anivarsary} alt="Anivarsary" className="card-image" />
            {/* <h3 className="card-title">Annivarsary</h3> */}
            <button className="card-button" onClick={() => handleCustomiseClick('Aniversary')}>
              Anniversary Cake
            </button>
          </div>
          <div className="card">
            <img src={Brithday} alt="Birthday" className="card-image" />
            {/* <h3 className="card-title">Brithday</h3> */}
            <button className="card-button" onClick={() => handleCustomiseClick('Birthday')}>
              Birthday Cake
            </button>
          </div>
          <div className="card">
            <img src={Customise} alt="Customise" className="card-image" />
            {/* <h3 className="card-title">Customised</h3> */}
            <button className="card-button" onClick={() => handleCustomiseClick('Customized')}>
              Customise Cake
            </button>
          </div>
        </div>
      </div>



      <div className='product'>
        <h1>
          Best Seller Of The Day</h1>
      </div>


      {/* -------------------------------- */}


      
      <div className="slider-wrapper">
      
        <button className="scroll-button" onClick={scrollLeft}>‹</button>
       
        <div className="slider-container" ref={sliderRef}>
        
          
            {cakesData.map(cake => (
              <div key={cake.id} className="cake-card">
{  /*              <img src={cake.image} alt={cake.name} className="cake-image" />

*/}     
 <img
               src={process.env.PUBLIC_URL + cake.image}
                 alt={`Image of ${cake.name}`}
                 className="cake-image"
                onError={(e) => e.target.src = 'fallback-image-url'} // Add a fallback image URL
              />          

 <div className="cake-details">
                  <h3>{cake.name}</h3>
                  <p>{cake.quantity}</p>
                  <p className="price">
                    <span className="original-price">₹{cake.price * 1.2}</span>
                    <span className="discounted-price">₹{cake.price}</span>
                  </p>
                  <button className= "whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
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
        <button className="scroll-button" onClick={scrollRight}>›</button>
      </div>

      {/* ----------------------------------------- */}




      <div className='cake'>

      </div>

      <div className='product'>
        <h1>
          Best Selling Cakes</h1>
      </div>



      <div className="slider-wrapper">
        <button className="scroll-button" onClick={scrollLeft}>‹</button>
        <div className="slider-container" ref={sliderRef}>
          {customeData.map(cake => (
            <div key={cake.id} className="cake-card">
              <img
                src={process.env.PUBLIC_URL + cake.image}
                //alt={cake.name}
                alt={`Image of ${cake.name}`}
                className="cake-image"
                onError={(e) => e.target.src = 'fallback-image-url'}
              />
              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span>
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                <button className="whatsapp-button" aria-label={`Buy ${cake.name} on WhatsApp`}>
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
        <button className="scroll-button" onClick={scrollRight}>›</button>
      </div>



      <div className='cake1'>

      </div>


      <div className='product'>
        <h1>
          Contact Us</h1>
      </div>
      <div className='contact-us'>
        <div className='map-sectio'>
          <div className='gmap-frame'>
            <iframe width="350" height="350" title='lilas company' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=The%20Lila's%20Cake%20Shop%20-%200%20Dining%20Ratings%20-%200%20Delivery%20Ratings%20Bakery%20Kharadi,%20Pune+(Lila's%20Cake%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe>
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
            <p className='contact-icon'> <FontAwesomeIcon icon={faMapMarkerAlt} />  The Lila's cake shop, sadguru plaza, opposite more store, Rakshak Nagar, Kharadi, Pune, Maharashtra 411014, India</p><br />
          </div>
        </div>
      </div>


    </>
  )
}

export default Product
