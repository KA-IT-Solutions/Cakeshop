import React from 'react'
import './Product.css'
import Regular from './Regular.jpg'
import Anivarsary from './Anivarsary.jpg'
import Brithday from './Brithday.jpg'
import { FaWhatsapp } from 'react-icons/fa';
// import cakesData from './Regular.json';




const Product = () => {
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
      </div> */}




<div className='categries' >
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
      </div>
      <div className='product'>
        <h1>
        Best Selling Cakes</h1>
      </div>

    </>
  )
}

export default Product
