import React from 'react'
import './Home.css'
import Product from '../Product/Product'

const Home = () => {
  return (
    <>
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to Your Sweet Escape</h1>
        <p>The Lila's Cake Shop: Sweetness Redefined</p>
        {/* <button className="hero-button">Get Started</button> */}
      </div>
    </div>
    <Product/>
   
    </>
  );
}

export default Home