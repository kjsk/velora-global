# Velora Global

A comprehensive shipping and logistics web application with real-time pricing, currency conversion, and shipping calculator functionality.

## 🚀 Features

- **Real-time Shipping Calculator**: Calculate shipping costs based on weight, dimensions, and destinations
- **Multi-currency Support**: Live currency conversion with real-time exchange rates
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional UI**: Modern, clean interface with gradient backgrounds and smooth animations

## 🛠️ Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Responsive design principles
- Modern React hooks and state management

### Backend
- Node.js with Express.js
- Real-time currency conversion API
- Shipping rate calculation algorithms
- RESTful API architecture

## 📦 Deployment

This project consists of two parts that need separate deployment:

### Frontend (Client)
- Static React application
- Deploy to any static hosting (GoDaddy, Netlify, Vercel, etc.)
- Build command: `npm run build`

### Backend (Server)
- Node.js API server
- Requires Node.js hosting (Railway, Render, Heroku, etc.)
- Start command: `npm start`

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/velora-global.git
   cd velora-global
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start backend server**
   ```bash
   npm start
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Start frontend development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🌐 API Endpoints

- `GET /api/exchange-rates` - Get current exchange rates
- `POST /api/calculate-rates` - Calculate shipping rates
- `POST /api/convert-currency` - Convert between currencies
- `GET /api/countries` - Get available countries

## 📱 Features Breakdown

### Shipping Calculator
- Weight-based pricing
- Dimensional weight calculations
- Multiple service types (Standard, Express, Priority)
- Additional services (insurance, signature, fragile handling)

### Currency Converter
- Real-time exchange rates
- 10+ major currencies supported
- Automatic rate updates every hour
- Fallback rates for offline functionality

### Pricing Display
- Country-specific pricing
- Service tier comparisons
- Currency selection dropdown
- Responsive pricing tables

## 🎨 UI Components

- **Navbar**: Navigation with smooth scrolling
- **Hero Section**: Eye-catching gradient background
- **Services**: Feature cards with hover effects
- **Pricing**: Interactive pricing calculator
- **Shipping Calculator**: Real-time rate calculation
- **Footer**: Professional footer with links

## 🔗 Deployment Links

- **Live Website**: https://veloraglobal.co.in
- **Backend API**: [Your Railway/Render URL]

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

## 📄 License

This project is licensed under the MIT License.