import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api.config';

const ShippingCalculator = ({ origin, destination, onRatesCalculated }) => {
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  });
  const [serviceType, setServiceType] = useState('standard');
  const [additionalServices, setAdditionalServices] = useState({
    insurance: false,
    signatureRequired: false,
    fragileHandling: false,
    customsClearance: false
  });
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (origin && destination && weight) {
      calculateRates();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination, weight, dimensions, serviceType, additionalServices]);

  const calculateRates = async () => {
    if (!weight || !origin || !destination) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate-rates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin,
          destination,
          weight: parseFloat(weight),
          dimensions: {
            length: parseFloat(dimensions.length) || 0,
            width: parseFloat(dimensions.width) || 0,
            height: parseFloat(dimensions.height) || 0
          },
          serviceType,
          additionalServices
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRates(data);
        if (onRatesCalculated) {
          onRatesCalculated(data);
        }
      } else {
        setError('Failed to calculate shipping rates');
      }
    } catch (error) {
      console.error('Error calculating rates:', error);
      setError('Error calculating shipping rates');
    } finally {
      setLoading(false);
    }
  };

  const handleDimensionChange = (dimension, value) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }));
  };

  const handleServiceChange = (service) => {
    setServiceType(service);
  };

  const handleAdditionalServiceChange = (service) => {
    setAdditionalServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(price);
  };

  return (
    <div className="shipping-calculator">
      <h3>Shipping Calculator</h3>
      
      <div className="calculator-form">
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Dimensions (cm):</label>
          <div className="dimensions-inputs">
            <input
              type="number"
              placeholder="Length"
              value={dimensions.length}
              onChange={(e) => handleDimensionChange('length', e.target.value)}
              min="1"
            />
            <input
              type="number"
              placeholder="Width"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              min="1"
            />
            <input
              type="number"
              placeholder="Height"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Service Type:</label>
          <div className="service-types">
            {['standard', 'express', 'priority'].map((service) => (
              <button
                key={service}
                className={`service-btn ${serviceType === service ? 'active' : ''}`}
                onClick={() => handleServiceChange(service)}
              >
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Additional Services:</label>
          <div className="additional-services">
            {Object.entries(additionalServices).map(([service, checked]) => (
              <label key={service} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAdditionalServiceChange(service)}
                />
                {service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading">Calculating rates...</div>}

      {rates && !loading && (
        <div className="rates-results">
          <h4>Shipping Rates</h4>
          
          <div className="selected-rate">
            <h5>{rates.service}</h5>
            <div className="price">{formatPrice(rates.totalPrice, rates.currency)}</div>
            <div className="details">
              <p>Estimated delivery: {rates.estimatedDays} days</p>
              <p>Base price: {formatPrice(rates.basePrice, rates.currency)}</p>
              {rates.additionalCost > 0 && (
                <p>Additional services: {formatPrice(rates.additionalCost, rates.currency)}</p>
              )}
            </div>
          </div>

          {rates.breakdown && (
            <div className="price-breakdown">
              <h6>Price Breakdown:</h6>
              <ul>
                {Object.entries(rates.breakdown).map(([key, value]) => (
                  value > 0 && (
                    <li key={key}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: 
                      {formatPrice(value, rates.currency)}
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}

          <div className="all-rates">
            <h6>Compare All Rates:</h6>
            {rates.allRates && Object.entries(rates.allRates).map(([service, rate]) => (
              <div key={service} className="rate-comparison">
                <span>{rate.service}</span>
                <span>{formatPrice(rate.price, rate.currency)}</span>
                <span>{rate.estimatedDays} days</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;