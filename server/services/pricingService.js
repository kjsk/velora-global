const axios = require('axios');

class PricingService {
  constructor() {
    this.baseRates = {
      'India-USA': { rate: 8.5, currency: 'USD', estimatedDays: 7 },
      'India-UK': { rate: 9.2, currency: 'USD', estimatedDays: 6 },
      'India-UAE': { rate: 4.8, currency: 'USD', estimatedDays: 3 },
      'USA-India': { rate: 8.5, currency: 'USD', estimatedDays: 7 },
      'USA-UK': { rate: 7.2, currency: 'USD', estimatedDays: 5 },
      'USA-UAE': { rate: 9.8, currency: 'USD', estimatedDays: 8 },
      'UK-India': { rate: 9.2, currency: 'USD', estimatedDays: 6 },
      'UK-USA': { rate: 7.2, currency: 'USD', estimatedDays: 5 },
      'UK-UAE': { rate: 8.5, currency: 'USD', estimatedDays: 6 },
      'UAE-India': { rate: 4.8, currency: 'USD', estimatedDays: 3 },
      'UAE-USA': { rate: 9.8, currency: 'USD', estimatedDays: 8 },
      'UAE-UK': { rate: 8.5, currency: 'USD', estimatedDays: 6 }
    };

    this.weightMultipliers = {
      '0-1': 1.0,
      '1-5': 1.2,
      '5-10': 1.5,
      '10-20': 1.8,
      '20-50': 2.2,
      '50+': 2.8
    };

    this.serviceTypes = {
      standard: 1.0,
      express: 1.5,
      priority: 2.0
    };
  }

  async getOnlineShippingRates(origin, destination, weight, dimensions) {
    try {
      const mockOnlineRates = await this.fetchMockOnlineRates(origin, destination, weight, dimensions);
      return mockOnlineRates;
    } catch (error) {
      console.error('Error fetching online rates:', error);
      return this.getFallbackRates(origin, destination, weight);
    }
  }

  async fetchMockOnlineRates(origin, destination, weight, dimensions) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const routeKey = `${origin}-${destination}`;
    const baseRate = this.baseRates[routeKey] || { rate: 10, currency: 'USD', estimatedDays: 10 };
    
    const weightMultiplier = this.getWeightMultiplier(weight);
    const dimensionalWeight = this.calculateDimensionalWeight(dimensions);
    const chargeableWeight = Math.max(weight, dimensionalWeight);
    
    const basePrice = baseRate.rate * chargeableWeight * weightMultiplier;
    
    return {
      standard: {
        price: basePrice,
        currency: baseRate.currency,
        estimatedDays: baseRate.estimatedDays,
        service: 'Standard Shipping'
      },
      express: {
        price: basePrice * this.serviceTypes.express,
        currency: baseRate.currency,
        estimatedDays: Math.max(1, baseRate.estimatedDays - 2),
        service: 'Express Shipping'
      },
      priority: {
        price: basePrice * this.serviceTypes.priority,
        currency: baseRate.currency,
        estimatedDays: Math.max(1, baseRate.estimatedDays - 3),
        service: 'Priority Shipping'
      }
    };
  }

  getWeightMultiplier(weight) {
    if (weight <= 1) return this.weightMultipliers['0-1'];
    if (weight <= 5) return this.weightMultipliers['1-5'];
    if (weight <= 10) return this.weightMultipliers['5-10'];
    if (weight <= 20) return this.weightMultipliers['10-20'];
    if (weight <= 50) return this.weightMultipliers['20-50'];
    return this.weightMultipliers['50+'];
  }

  calculateDimensionalWeight(dimensions) {
    if (!dimensions || !dimensions.length || !dimensions.width || !dimensions.height) {
      return 0;
    }
    
    const { length, width, height } = dimensions;
    const dimensionalWeight = (length * width * height) / 5000;
    return Math.ceil(dimensionalWeight);
  }

  getFallbackRates(origin, destination, weight) {
    const routeKey = `${origin}-${destination}`;
    const baseRate = this.baseRates[routeKey] || { rate: 10, currency: 'USD', estimatedDays: 10 };
    const weightMultiplier = this.getWeightMultiplier(weight);
    
    const basePrice = baseRate.rate * weight * weightMultiplier;
    
    return {
      standard: {
        price: basePrice,
        currency: baseRate.currency,
        estimatedDays: baseRate.estimatedDays,
        service: 'Standard Shipping (Fallback)'
      },
      express: {
        price: basePrice * this.serviceTypes.express,
        currency: baseRate.currency,
        estimatedDays: Math.max(1, baseRate.estimatedDays - 2),
        service: 'Express Shipping (Fallback)'
      },
      priority: {
        price: basePrice * this.serviceTypes.priority,
        currency: baseRate.currency,
        estimatedDays: Math.max(1, baseRate.estimatedDays - 3),
        service: 'Priority Shipping (Fallback)'
      }
    };
  }

  calculateAdditionalServices(basePrice, services) {
    let additionalCost = 0;
    
    if (services.insurance) {
      additionalCost += basePrice * 0.02;
    }
    
    if (services.signatureRequired) {
      additionalCost += 5;
    }
    
    if (services.fragileHandling) {
      additionalCost += basePrice * 0.05;
    }
    
    if (services.customsClearance) {
      additionalCost += 25;
    }
    
    return additionalCost;
  }

  async getDetailedQuote(quoteData) {
    const { origin, destination, weight, dimensions, serviceType, additionalServices } = quoteData;
    
    const rates = await this.getOnlineShippingRates(origin, destination, weight, dimensions);
    const selectedRate = rates[serviceType] || rates.standard;
    
    const additionalCost = this.calculateAdditionalServices(selectedRate.price, additionalServices || {});
    const totalPrice = selectedRate.price + additionalCost;
    
    return {
      basePrice: selectedRate.price,
      additionalCost,
      totalPrice,
      currency: selectedRate.currency,
      estimatedDays: selectedRate.estimatedDays,
      service: selectedRate.service,
      breakdown: {
        shipping: selectedRate.price,
        insurance: additionalServices?.insurance ? selectedRate.price * 0.02 : 0,
        signature: additionalServices?.signatureRequired ? 5 : 0,
        fragileHandling: additionalServices?.fragileHandling ? selectedRate.price * 0.05 : 0,
        customsClearance: additionalServices?.customsClearance ? 25 : 0
      },
      allRates: rates
    };
  }
}

module.exports = PricingService;