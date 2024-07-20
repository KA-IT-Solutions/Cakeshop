import React from 'react'
import './Home.css'
import Product from '../Product/Product'

const Home = () => {
  return (
    <>
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Website</h1>
        <p>Your journey begins here</p>
        <button className="hero-button">Get Started</button>
      </div>
    </div>
    <Product/>
    <div className='PopularCategories'> 
    <h1>Popular Categories</h1>
    </div>
    </>
  );
}

export default Home