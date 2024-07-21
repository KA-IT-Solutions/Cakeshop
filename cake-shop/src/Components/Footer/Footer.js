import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3>Company Info</h3>
          <p>Cake Shop Inc.</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Bakery Street, Sweet City</p>
          <p><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> info@cakeshop.com</p>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://linkedin.com"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Cake Shop Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
