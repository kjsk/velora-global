import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div className="hero">
        <h1>Welcome to Velora Global</h1>
        <p>Your trusted partner for import and export services.</p>
        <Link to="/quote" className="cta-button">Get a Quote</Link>
      </div>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Reliable Services</h3>
            <p>We offer reliable and timely shipping services to ensure your goods arrive safely.</p>
          </div>
          <div className="card">
            <h3>Competitive Pricing</h3>
            <p>Get the best rates for your shipments with our competitive pricing options.</p>
          </div>
          <div className="card">
            <h3>Global Reach</h3>
            <p>We ship to and from major destinations including India, USA, UK, and UAE.</p>
          </div>
        </div>
      </section>

      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="service-links">
          <Link to="/services#import-export" className="service-link">Import/Export for Families</Link>
          <Link to="/services#student-relocation" className="service-link">Student Relocation</Link>
          <Link to="/services#quote-generation" className="service-link">Quote Generation</Link>
          <Link to="/services#labeling" className="service-link">Shipment Labeling</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;