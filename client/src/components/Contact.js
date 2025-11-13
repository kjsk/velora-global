import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">We're here to help with all your shipping and logistics needs. Reach out to us via phone, email, or the contact form below.</p>
      <div className="contact-content">
        <div className="contact-form-container">
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-details-container">
          <h2>Our Contact Information</h2>
          <div className="contact-details">
            <div className="contact-item">
              <h3>Email Us</h3>
              <p><a href="mailto:support@veloraglobal.co.in">support@veloraglobal.co.in</a></p>
            </div>
            <div className="contact-item">
              <h3>Call Us</h3>
              <p><a href="tel:7396536693">+91 7396536693</a></p>
            </div>
            <div className="contact-item">
              <h3>Our Address</h3>
              <p>Plot No.C2, Ground Floor, Shanthi Classic Building, Huda Trade Centre, Lingampally, Hyderabad, Telangana-500019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;