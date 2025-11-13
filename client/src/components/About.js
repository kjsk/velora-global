import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Velora Global</h1>
        <p>Your trusted partner in global logistics and shipping solutions.</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>Velora Global was founded with a simple mission: to make international shipping accessible, reliable, and stress-free for everyone. We started as a small team of logistics experts with a passion for connecting people and businesses across the globe. Today, we have grown into a premier import and export service provider, but our core values remain the same.</p>
        </div>
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>Our mission is to provide reliable, affordable, and efficient import and export services that exceed our clients' expectations. We are committed to leveraging cutting-edge technology and a dedicated team of professionals to deliver seamless shipping experiences. We strive to make the process of moving internationally as simple as possible, so you can focus on what matters most.</p>
        </div>
        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Customer-Centric:</strong> Our clients are at the heart of everything we do. We listen, we understand, and we deliver.</li>
            <li><strong>Integrity:</strong> We believe in transparency and honesty. You can trust us to handle your shipments with the utmost care and professionalism.</li>
            <li><strong>Innovation:</strong> We are constantly seeking new and better ways to serve our clients. From advanced tracking systems to sustainable shipping practices, we are always moving forward.</li>
            <li><strong>Excellence:</strong> We are committed to the highest standards of quality in every aspect of our business. From customer service to on-time delivery, we never settle for second best.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;