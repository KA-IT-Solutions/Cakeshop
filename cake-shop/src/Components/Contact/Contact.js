
import './Contact.css';
import React, { useState } from 'react';
import 'animate.css/animate.min.css';
import axios from 'axios';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:8000/send', formState);
        alert('Message sent successfully');
        setFormState({ name: '', email: '', message: '' });
    } catch (error) {
        console.error('There was an error sending the message!', error);
    }
};

  return (
    <div className="contact-page">
      <h1 className="animate__animated animate__fadeInDown">Contact Us</h1>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            className="animate__animated animate__zoomIn"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formState.email}
            onChange={handleChange}
            className="animate__animated animate__zoomIn"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleChange}
            className="animate__animated animate__zoomIn"
          />
          <button type="submit" className="animate__animated animate__pulse">
            Send Message
          </button>
        </form>
        {/* <div className="map-container">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15130.058628442259!2d73.9394557!3d18.5508221!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3e54eb23f29%3A0xf965a1376d0a2788!2sThe%20Lila&#39;s%20Cake%20Shop!5e0!3m2!1sen!2sin!4v1721626539569!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div> */}
        <div className='map-section'>
        <div className='gmap-frame'>
       <iframe width="520" height="400" title='lilas company' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=The%20Lila's%20Cake%20Shop%20-%200%20Dining%20Ratings%20-%200%20Delivery%20Ratings%20Bakery%20Kharadi,%20Pune+(Lila's%20Cake%20Shop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe>
        </div>
      </div> 
      </div>
    </div>
  );
};

export default Contact;
