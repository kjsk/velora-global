import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api.config';

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState('international');
  const [selectedFromCountry, setSelectedFromCountry] = useState('India');
  const [selectedToCountry, setSelectedToCountry] = useState('USA');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    INR: 74.5,
    AED: 3.67,
    CAD: 1.25,
    AUD: 1.35,
    SGD: 1.35,
    JPY: 110.0,
    CNY: 6.45
  });
  const [loadingRates, setLoadingRates] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' }
  ];

  const countries = [
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'US', name: 'USA', flag: '🇺🇸' },
    { code: 'GB', name: 'UK', flag: '🇬🇧' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' }
  ];

  const internationalPricing = {
    'India': {
      'USA': { standard: 8.50, express: 12.75, priority: 17.00, days: '5-7' },
      'UK': { standard: 9.20, express: 13.80, priority: 18.40, days: '4-6' },
      'UAE': { standard: 4.80, express: 7.20, priority: 9.60, days: '2-3' },
      'Canada': { standard: 9.10, express: 13.65, priority: 18.20, days: '6-8' },
      'Australia': { standard: 12.30, express: 18.45, priority: 24.60, days: '7-9' },
      'Singapore': { standard: 6.50, express: 9.75, priority: 13.00, days: '3-4' },
      'Germany': { standard: 10.20, express: 15.30, priority: 20.40, days: '5-7' },
      'France': { standard: 10.80, express: 16.20, priority: 21.60, days: '5-7' },
      'Japan': { standard: 11.90, express: 17.85, priority: 23.80, days: '6-8' }
    },
    'USA': {
      'India': { standard: 8.50, express: 12.75, priority: 17.00, days: '5-7' },
      'UK': { standard: 7.20, express: 10.80, priority: 14.40, days: '4-5' },
      'UAE': { standard: 9.80, express: 14.70, priority: 19.60, days: '6-8' },
      'Canada': { standard: 5.50, express: 8.25, priority: 11.00, days: '2-3' },
      'Australia': { standard: 13.40, express: 20.10, priority: 26.80, days: '8-10' },
      'Singapore': { standard: 11.20, express: 16.80, priority: 22.40, days: '7-8' },
      'Germany': { standard: 8.90, express: 13.35, priority: 17.80, days: '5-6' },
      'France': { standard: 9.30, express: 13.95, priority: 18.60, days: '5-6' },
      'Japan': { standard: 12.60, express: 18.90, priority: 25.20, days: '7-9' }
    },
    'UK': {
      'India': { standard: 9.20, express: 13.80, priority: 18.40, days: '4-6' },
      'USA': { standard: 7.20, express: 10.80, priority: 14.40, days: '4-5' },
      'UAE': { standard: 8.50, express: 12.75, priority: 17.00, days: '5-6' },
      'Canada': { standard: 8.80, express: 13.20, priority: 17.60, days: '5-7' },
      'Australia': { standard: 14.20, express: 21.30, priority: 28.40, days: '8-10' },
      'Singapore': { standard: 10.40, express: 15.60, priority: 20.80, days: '6-7' },
      'Germany': { standard: 6.20, express: 9.30, priority: 12.40, days: '3-4' },
      'France': { standard: 6.80, express: 10.20, priority: 13.60, days: '3-4' },
      'Japan': { standard: 13.80, express: 20.70, priority: 27.60, days: '8-9' }
    },
    'UAE': {
      'India': { standard: 4.80, express: 7.20, priority: 9.60, days: '2-3' },
      'USA': { standard: 9.80, express: 14.70, priority: 19.60, days: '6-8' },
      'UK': { standard: 8.50, express: 12.75, priority: 17.00, days: '5-6' },
      'Canada': { standard: 10.20, express: 15.30, priority: 20.40, days: '7-8' },
      'Australia': { standard: 11.80, express: 17.70, priority: 23.60, days: '6-8' },
      'Singapore': { standard: 7.90, express: 11.85, priority: 15.80, days: '4-5' },
      'Germany': { standard: 9.40, express: 14.10, priority: 18.80, days: '5-7' },
      'France': { standard: 9.90, express: 14.85, priority: 19.80, days: '5-7' },
      'Japan': { standard: 10.70, express: 16.05, priority: 21.40, days: '6-7' }
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      setLoadingRates(true);
      const response = await fetch(`${API_BASE_URL}/api/exchange-rates`);
      const data = await response.json();
      
      if (data.success) {
        setExchangeRates(data.rates);
        setLastUpdated(new Date(data.lastUpdated));
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Keep using default rates if API fails
    } finally {
      setLoadingRates(false);
    }
  };

  const domesticPricing = {
    'India': {
      'Delhi': { standard: 2.50, express: 3.75, priority: 5.00, days: '1-2' },
      'Mumbai': { standard: 2.80, express: 4.20, priority: 5.60, days: '1-2' },
      'Bangalore': { standard: 3.20, express: 4.80, priority: 6.40, days: '2-3' },
      'Chennai': { standard: 3.50, express: 5.25, priority: 7.00, days: '2-3' },
      'Kolkata': { standard: 3.80, express: 5.70, priority: 7.60, days: '2-3' },
      'Hyderabad': { standard: 3.10, express: 4.65, priority: 6.20, days: '2-3' },
      'Pune': { standard: 2.90, express: 4.35, priority: 5.80, days: '1-2' },
      'Ahmedabad': { standard: 3.40, express: 5.10, priority: 6.80, days: '2-3' }
    },
    'USA': {
      'New York': { standard: 3.20, express: 4.80, priority: 6.40, days: '1-2' },
      'California': { standard: 4.50, express: 6.75, priority: 9.00, days: '2-3' },
      'Texas': { standard: 3.80, express: 5.70, priority: 7.60, days: '2-3' },
      'Florida': { standard: 4.20, express: 6.30, priority: 8.40, days: '2-3' },
      'Illinois': { standard: 3.60, express: 5.40, priority: 7.20, days: '2-3' },
      'Pennsylvania': { standard: 3.40, express: 5.10, priority: 6.80, days: '1-2' },
      'Ohio': { standard: 3.30, express: 4.95, priority: 6.60, days: '2-3' },
      'Georgia': { standard: 3.90, express: 5.85, priority: 7.80, days: '2-3' }
    },
    'UK': {
      'London': { standard: 2.80, express: 4.20, priority: 5.60, days: '1-2' },
      'Manchester': { standard: 3.20, express: 4.80, priority: 6.40, days: '1-2' },
      'Birmingham': { standard: 3.10, express: 4.65, priority: 6.20, days: '1-2' },
      'Leeds': { standard: 3.40, express: 5.10, priority: 6.80, days: '2-3' },
      'Glasgow': { standard: 3.80, express: 5.70, priority: 7.60, days: '2-3' },
      'Liverpool': { standard: 3.30, express: 4.95, priority: 6.60, days: '1-2' },
      'Newcastle': { standard: 3.60, express: 5.40, priority: 7.20, days: '2-3' },
      'Sheffield': { standard: 3.25, express: 4.88, priority: 6.50, days: '2-3' }
    },
    'UAE': {
      'Dubai': { standard: 2.20, express: 3.30, priority: 4.40, days: '1-2' },
      'Abu Dhabi': { standard: 2.50, express: 3.75, priority: 5.00, days: '1-2' },
      'Sharjah': { standard: 2.40, express: 3.60, priority: 4.80, days: '1-2' },
      'Ajman': { standard: 2.60, express: 3.90, priority: 5.20, days: '1-2' },
      'Ras Al Khaimah': { standard: 2.90, express: 4.35, priority: 5.80, days: '2-3' },
      'Fujairah': { standard: 3.10, express: 4.65, priority: 6.20, days: '2-3' },
      'Umm Al Quwain': { standard: 2.70, express: 4.05, priority: 5.40, days: '2-3' },
      'Al Ain': { standard: 2.80, express: 4.20, priority: 5.60, days: '2-3' }
    }
  };

  const additionalServices = [
    { name: 'Insurance', description: 'Coverage up to $1000', price: '2% of shipment value' },
    { name: 'Signature Required', description: 'Adult signature on delivery', price: '$5.00' },
    { name: 'Fragile Handling', description: 'Special care for delicate items', price: '5% of base price' },
    { name: 'Customs Clearance', description: 'Assistance with customs procedures', price: '$25.00' },
    { name: 'Saturday Delivery', description: 'Delivery on Saturdays', price: '$15.00' },
    { name: 'Hold for Pickup', description: 'Hold at facility for customer pickup', price: '$8.00' }
  ];

  const getCurrentPricing = () => {
    if (selectedCategory === 'international') {
      return internationalPricing[selectedFromCountry] || {};
    } else {
      return domesticPricing[selectedFromCountry] || {};
    }
  };

  const formatPrice = (price, currencyCode = selectedCurrency) => {
    const currency = currencies.find(c => c.code === currencyCode);
    const convertedPrice = convertPrice(price, 'USD', currencyCode);
    
    if (currencyCode === 'JPY' || currencyCode === 'INR') {
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString()}`;
    }
    
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return price;
    
    // Convert to USD first, then to target currency
    const priceInUSD = price / exchangeRates[fromCurrency];
    const priceInTargetCurrency = priceInUSD * exchangeRates[toCurrency];
    
    return priceInTargetCurrency;
  };

  const getExchangeRate = (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return 1;
    return exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  };

  return (
    <div className="pricing-container">
      <div className="pricing-hero">
        <h1>Shipping Rates & Pricing</h1>
        <p>Transparent pricing for all your shipping needs. Get instant quotes with no hidden fees.</p>
      </div>

      <div className="pricing-categories">
        <button 
          className={`category-btn ${selectedCategory === 'international' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('international')}
        >
          🌍 International Shipping
        </button>
        <button 
          className={`category-btn ${selectedCategory === 'domestic' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('domestic')}
        >
          🏠 Domestic Shipping
        </button>
      </div>

      <div className="currency-selector">
        <div className="selector-group">
          <label>Currency:</label>
          <select 
            value={selectedCurrency} 
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="currency-select"
            disabled={loadingRates}
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
          {loadingRates && <div className="loading-indicator">Updating rates...</div>}
        </div>
        <div className="exchange-rate-info">
          <small>Exchange rate: 1 USD = {formatPrice(1, selectedCurrency).replace(/[0-9.,]/g, '')}{getExchangeRate('USD', selectedCurrency).toFixed(2)}</small>
          {lastUpdated && (
            <small className="last-updated">Last updated: {lastUpdated.toLocaleTimeString()}</small>
          )}
        </div>
      </div>

      <div className="country-selector">
        <div className="selector-group">
          <label>From:</label>
          <select 
            value={selectedFromCountry} 
            onChange={(e) => setSelectedFromCountry(e.target.value)}
            className="country-select"
          >
            {countries.map(country => (
              <option key={country.code} value={country.name}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedCategory === 'international' && (
          <div className="selector-group">
            <label>To:</label>
            <select 
              value={selectedToCountry} 
              onChange={(e) => setSelectedToCountry(e.target.value)}
              className="country-select"
            >
              {countries.filter(c => c.name !== selectedFromCountry).map(country => (
                <option key={country.code} value={country.name}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="pricing-table-container">
        <h2>
          {selectedCategory === 'international' 
            ? `Shipping from ${selectedFromCountry} to ${selectedToCountry}`
            : `Domestic Shipping within ${selectedFromCountry}`
          }
        </h2>
        <p className="pricing-note">Prices per kg in {currencies.find(c => c.code === selectedCurrency)?.name}. Minimum charge applies.</p>
        
        <div className="pricing-grid">
          {Object.entries(getCurrentPricing()).map(([destination, rates]) => (
            <div key={destination} className="pricing-card">
              <h3>{destination}</h3>
              <div className="rate-options">
                <div className="rate-option standard">
                  <span className="service-name">Standard</span>
                  <span className="price">{formatPrice(rates.standard)}</span>
                  <span className="days">{rates.days} days</span>
                </div>
                <div className="rate-option express">
                  <span className="service-name">Express</span>
                  <span className="price">{formatPrice(rates.express)}</span>
                  <span className="days">{rates.days} days</span>
                </div>
                <div className="rate-option priority">
                  <span className="service-name">Priority</span>
                  <span className="price">{formatPrice(rates.priority)}</span>
                  <span className="days">{rates.days} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-services-section">
        <h2>Additional Services</h2>
        <div className="services-grid">
          {additionalServices.map((service, index) => (
            <div key={index} className="service-card">
              <h4>{service.name}</h4>
              <p className="description">{service.description}</p>
              <p className="price">{service.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pricing-notes">
        <h3>Important Notes</h3>
        <ul>
          <li>All prices are in USD per kilogram</li>
          <li>Minimum charge: $15.00 per shipment</li>
          <li>Dimensional weight may apply for large, light packages</li>
          <li>Fuel surcharge may apply based on current rates</li>
          <li>Customs duties and taxes are not included</li>
          <li>Prices subject to change without notice</li>
          <li>Volume discounts available for regular shippers</li>
        </ul>
      </div>

      <div className="cta-section">
        <h2>Get Your Custom Quote</h2>
        <p>Use our shipping calculator for accurate pricing based on your specific requirements</p>
        <a href="/quote" className="cta-button">Calculate My Shipping Cost</a>
      </div>
    </div>
  );
};

export default Pricing;