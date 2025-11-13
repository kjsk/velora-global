const express = require('express');
const cors = require('cors');
const PricingService = require('./services/pricingService');
const CurrencyService = require('./services/currencyService');

const app = express();
const port = process.env.PORT || 3001; // Use Railway's PORT or fallback to 3001
const pricingService = new PricingService();
const currencyService = new CurrencyService();
console.log('Currency service initialized:', currencyService ? 'Yes' : 'No');

app.use(cors());
app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'velora-global-api'
  });
});

app.post('/api/quote', (req, res) => {
  console.log('Quote request received:', req.body);
  res.status(200).send({ message: 'Quote request received successfully!' });
});

app.post('/api/label', (req, res) => {
  console.log('Label request received:', req.body);
  res.status(200).send({ message: 'Label request received successfully!' });
});

app.post('/api/calculate-rates', async (req, res) => {
  try {
    const { origin, destination, weight, dimensions, serviceType, additionalServices } = req.body;
    
    if (!origin || !destination || !weight) {
      return res.status(400).json({ 
        error: 'Missing required fields: origin, destination, and weight are required' 
      });
    }

    const quoteData = {
      origin,
      destination,
      weight: parseFloat(weight),
      dimensions: dimensions || {},
      serviceType: serviceType || 'standard',
      additionalServices: additionalServices || {}
    };

    const detailedQuote = await pricingService.getDetailedQuote(quoteData);
    
    res.json({
      success: true,
      ...detailedQuote,
      weight: quoteData.weight,
      serviceType: quoteData.serviceType
    });
  } catch (error) {
    console.error('Error calculating rates:', error);
    res.status(500).json({ 
      error: 'Failed to calculate shipping rates',
      message: error.message 
    });
  }
});

app.get('/api/shipping-rates', async (req, res) => {
  try {
    const { origin, destination, weight, length, width, height } = req.query;
    
    if (!origin || !destination || !weight) {
      return res.status(400).json({ 
        error: 'Missing required parameters: origin, destination, and weight are required' 
      });
    }

    const dimensions = {
      length: parseFloat(length) || 0,
      width: parseFloat(width) || 0,
      height: parseFloat(height) || 0
    };

    const rates = await pricingService.getOnlineShippingRates(
      origin, 
      destination, 
      parseFloat(weight), 
      dimensions
    );
    
    res.json({
      success: true,
      rates,
      origin,
      destination,
      weight: parseFloat(weight),
      dimensions
    });
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    res.status(500).json({ 
      error: 'Failed to fetch shipping rates',
      message: error.message 
    });
  }
});

app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is working' });
});

app.get('/api/countries', (req, res) => {
  const countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'USA' },
    { code: 'GB', name: 'UK' },
    { code: 'AE', name: 'UAE' }
  ];
  
  res.json({
    success: true,
    countries
  });
});

app.get('/api/exchange-rates', (req, res) => {
  console.log('Exchange rates endpoint hit');
  try {
    const rates = currencyService.getExchangeRates();
    res.json({
      success: true,
      ...rates
    });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exchange rates',
      message: error.message
    });
  }
});

app.post('/api/convert-currency', (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;
    
    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: amount, fromCurrency, and toCurrency are required'
      });
    }

    const convertedAmount = currencyService.convertAmount(parseFloat(amount), fromCurrency, toCurrency);
    const exchangeRate = currencyService.getExchangeRate(fromCurrency, toCurrency);
    
    res.json({
      success: true,
      originalAmount: parseFloat(amount),
      originalCurrency: fromCurrency,
      convertedAmount: convertedAmount,
      targetCurrency: toCurrency,
      exchangeRate: exchangeRate
    });
  } catch (error) {
    console.error('Error converting currency:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to convert currency',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});