const axios = require('axios');

class CurrencyService {
  constructor() {
    this.exchangeRates = {
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
    };
    this.lastUpdated = new Date();
    this.init();
  }

  async init() {
    // Update rates every hour
    const cron = require('node-cron');
    cron.schedule('0 * * * *', () => {
      this.updateExchangeRates();
    });
    
    // Initial update
    await this.updateExchangeRates();
  }

  async updateExchangeRates() {
    try {
      // Using a free exchange rate API (you can replace with your preferred service)
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      
      if (response.data && response.data.rates) {
        this.exchangeRates = {
          USD: 1.0,
          EUR: response.data.rates.EUR || 0.85,
          GBP: response.data.rates.GBP || 0.73,
          INR: response.data.rates.INR || 74.5,
          AED: response.data.rates.AED || 3.67,
          CAD: response.data.rates.CAD || 1.25,
          AUD: response.data.rates.AUD || 1.35,
          SGD: response.data.rates.SGD || 1.35,
          JPY: response.data.rates.JPY || 110.0,
          CNY: response.data.rates.CNY || 6.45
        };
        this.lastUpdated = new Date();
        console.log('Exchange rates updated successfully');
      }
    } catch (error) {
      console.error('Error updating exchange rates:', error.message);
      // Keep using existing rates if API fails
    }
  }

  getExchangeRates() {
    return {
      rates: this.exchangeRates,
      lastUpdated: this.lastUpdated,
      baseCurrency: 'USD'
    };
  }

  convertAmount(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first, then to target currency
    const amountInUSD = amount / this.exchangeRates[fromCurrency];
    const amountInTargetCurrency = amountInUSD * this.exchangeRates[toCurrency];
    
    return amountInTargetCurrency;
  }

  getExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return 1;
    
    // Convert to USD first, then to target currency
    const rate = this.exchangeRates[toCurrency] / this.exchangeRates[fromCurrency];
    return rate;
  }

  formatAmount(amount, currencyCode, locale = 'en-US') {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      AED: 'د.إ',
      CAD: 'C$',
      AUD: 'A$',
      SGD: 'S$',
      JPY: '¥',
      CNY: '¥'
    };

    const symbol = currencySymbols[currencyCode] || '$';
    
    // Special formatting for JPY and INR (no decimals)
    if (currencyCode === 'JPY' || currencyCode === 'INR') {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    }
    
    return `${symbol}${amount.toFixed(2)}`;
  }
}

module.exports = CurrencyService;