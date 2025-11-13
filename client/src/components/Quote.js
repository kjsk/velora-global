import React, { useState } from 'react';
import ShippingCalculator from './ShippingCalculator';

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    description: '',
    weight: '',
    dimensions: '',
    serviceType: 'standard',
    additionalServices: ''
  });
  const [calculatedRates, setCalculatedRates] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatesCalculated = (rates) => {
    setCalculatedRates(rates);
    setFormData(prev => ({
      ...prev,
      weight: rates.weight || prev.weight,
      serviceType: rates.serviceType || prev.serviceType,
      additionalServices: JSON.stringify(rates.breakdown) || prev.additionalServices
    }));
  };

  const handleOriginDestinationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if ((formData.origin && formData.destination) && (name === 'origin' || name === 'destination')) {
      setShowCalculator(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quoteData = {
        ...formData,
        calculatedRates: calculatedRates
      };
      
      const response = await fetch('http://localhost:3001/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });
      if (response.ok) {
        alert('Thank you for your quote request! We will get back to you shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          origin: '',
          destination: '',
          description: '',
          weight: '',
          dimensions: '',
          serviceType: 'standard',
          additionalServices: ''
        });
        setCalculatedRates(null);
        setShowCalculator(false);
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <div>
      <h1>Get a Quote</h1>
      <p>Fill out the form below to get a customized quote for your shipment.</p>
      <form className="quote-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <select name="origin" value={formData.origin} onChange={handleOriginDestinationChange} required>
          <option value="" disabled>Select Origin Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="UAE">UAE</option>
        </select>
        <select name="destination" value={formData.destination} onChange={handleOriginDestinationChange} required>
          <option value="" disabled>Select Destination Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="UAE">UAE</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe the items you want to ship"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Get My Quote</button>
      </form>
      
      {showCalculator && formData.origin && formData.destination && (
        <div className="calculator-section">
          <ShippingCalculator
            origin={formData.origin}
            destination={formData.destination}
            onRatesCalculated={handleRatesCalculated}
          />
        </div>
      )}
    </div>
  );
};

export default Quote;