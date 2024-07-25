import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faEmail,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company-info">
          <h3 className="lilas-font"> The Lila's Cake Shop</h3>

          <p className="lilas-font">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> The Lila's cake shop,
            sadguru plaza, opposite more store, Rakshak Nagar, Kharadi, Pune,
            Maharashtra 411014, India
          </p>
          <p className="lilas-font">
            <FontAwesomeIcon icon={faPhone} /> +91-9096797961
          </p>
          <p className="lilas-font">
            <FontAwesomeIcon icon={faEnvelope} /> thelilasscakeshops1@gmail.com

          </p>
        </div>
        {/* <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div> */}
        <div className="footer-section social-media">
          <h3 className="lilas-font">Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/_.the_lilas_cakes._/">
              <FontAwesomeIcon icon={faInstagram} />
    

            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} KAIT Software Solution LLP. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
