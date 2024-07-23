
import React, { useRef } from 'react';
import './Product.css'
import Regular from './Regular.jpg'
import Anivarsary from './Anivarsary.jpg'
import Brithday from './Brithday.jpg'
import cakesData from '../RegularData.json';
import { FaShoppingBasket } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// import cakesData from './Regular.json';





const Product = () => {

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };


  const cards = [
    {
      image: Regular,
      title: 'Regular',
      category: "Birthday Party",
      price: 150,
      quantity: "1 kg"
    },
    {
      image: Anivarsary,
      title: 'Anivarsary'
    },
    {
      image: Brithday,
      title: 'Brithday'
    },
    {
      image: Brithday,
      title: 'customise'
    },
  ]

  return (
    <>


      <div className='product'>
        <h1>
          Popular Categories</h1>
      </div>
      <div className='categries' >
        <div className="card-container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>

            </div>
          ))}
        </div>
      </div>
      <div className='product'>
        <h1>
          Best Seller Of The Day</h1>
      </div>

      {/* <div className="cake-shop">
        <div className="cake-cards">
          {cakesData.map(cake => (
            <div key={cake.id} className="cake-card">
              <img src={cake.image} alt={cake.name} className="cake-image" />
              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span> 
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                <button className="whatsapp-button">
                  <FaWhatsapp /> Buy on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>  */}

      {/* -------------------------------- */}

      <div className="slider-wrapper">
        <button className="scroll-button" onClick={scrollLeft}>‹</button>
        <div className="slider-container" ref={sliderRef}>
          {cakesData.map(cake => (
            <div key={cake.id} className="cake-card">
              <img src={cake.image} alt={cake.name} className="cake-image" />
              <div className="cake-details">
                <h3>{cake.name}</h3>
                <p>{cake.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{cake.price * 1.2}</span>
                  <span className="discounted-price">₹{cake.price}</span>
                </p>
                <button className="whatsapp-button">
                <FaShoppingBasket /> Buy on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={scrollRight}>›</button>
      </div>

      {/* ----------------------------------------- */}




      {/* <div className="reviews-section">
        <h2 className="reviews-heading">Customer Reviews</h2>
        <div className="reviews-scroller">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <img src={review.image} alt={review.tittle} className="review-image" />
              <h3 className="review-name">{review. category}</h3>
              <p className="review-message">{review. category}</p>
              <div className="review-stars">
                {'★'.repeat(review. category)}{'☆'.repeat(5 - review. category)}
              </div>
            </div>
          ))}
        </div>
      </div> */}




      {/* <div className='categries' >
        <div className="card-container">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>
              <div className="cake-details">
                <h3>{card.name}</h3>
                <p>{card.quantity}</p>
                <p className="price">
                  <span className="original-price">₹{card.price * 1.2}</span> 
                  <span className="discounted-price">₹{card.price}</span>
                </p>
                <button className="whatsapp-button">
                  <FaWhatsapp /> Buy on WhatsApp
                </button>
              </div>

            </div>
          ))}
        </div>
      </div> */}
      <div className='product'>
        <h1>
          Best Selling Cakes</h1>
      </div>
      <div className='product'>
        <h1>
          Contact Us</h1>
      </div>
      <div className='contact-us'>
        <div className='map-section'>
          <div className='gmap-frame'>
            <iframe width="520" height="400" title='lilas company' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=The%20Lila's%20Cake%20Shop%20-%200%20Dining%20Ratings%20-%200%20Delivery%20Ratings%20Bakery%20Kharadi,%20Pune+(Lila's%20Cake%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe>
          </div>
        </div>
        <div className='contact-icon-info'>
          <h2 className='lilas'>The Lila's Cake Shop</h2><br />
          <div className='contact-us-info'>
            <p className='contact-icon'><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</p><br />
          </div>
          <div className='contact-us-info'>
            <p className='contact-icon'><FontAwesomeIcon icon={faEnvelope} className='e' /> email@example.com</p><br />
          </div>
          <div className='contact-us-info'>
            <p className='contact-icon'> <FontAwesomeIcon icon={faMapMarkerAlt} /> 1234 Street Name, City, State</p><br />
          </div>
        </div>
      </div>


    </>
  )
}

export default Product
