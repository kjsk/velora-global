import React, { useState } from 'react';

const Labeling = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderCompany: '',
    senderAddress: '',
    senderCity: '',
    senderState: '',
    senderZip: '',
    senderPhone: '',
    recipientName: '',
    recipientCompany: '',
    recipientAddress: '',
    recipientCity: '',
    recipientState: '',
    recipientZip: '',
    recipientPhone: '',
    serviceType: 'standard',
    packageType: 'package',
    weight: '',
    length: '',
    width: '',
    height: '',
    declaredValue: '',
    description: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [labelGenerated, setLabelGenerated] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateTrackingNumber = () => {
    const prefix = 'VGL';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTrackingNumber = generateTrackingNumber();
      setTrackingNumber(newTrackingNumber);
      
      const response = await fetch('http://localhost:3001/api/label', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
          trackingNumber: newTrackingNumber,
          shipDate: new Date().toISOString().split('T')[0]
        }),
      });
      
      if (response.ok) {
        setLabelGenerated(true);
        // Reset form after successful generation
        setFormData({
          senderName: '',
          senderCompany: '',
          senderAddress: '',
          senderCity: '',
          senderState: '',
          senderZip: '',
          senderPhone: '',
          recipientName: '',
          recipientCompany: '',
          recipientAddress: '',
          recipientCity: '',
          recipientState: '',
          recipientZip: '',
          recipientPhone: '',
          serviceType: 'standard',
          packageType: 'package',
          weight: '',
          length: '',
          width: '',
          height: '',
          declaredValue: '',
          description: ''
        });
      } else {
        alert('There was an error generating the label. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error generating the label. Please try again.');
    }
  };

  const downloadLabel = () => {
    // Create a simple label format
    const labelContent = `
VELORA GLOBAL LOGISTICS
========================
Tracking Number: ${trackingNumber}
Ship Date: ${new Date().toLocaleDateString()}

FROM:
${formData.senderName}
${formData.senderCompany}
${formData.senderAddress}
${formData.senderCity}, ${formData.senderState} ${formData.senderZip}

TO:
${formData.recipientName}
${formData.recipientCompany}
${formData.recipientAddress}
${formData.recipientCity}, ${formData.recipientState} ${formData.recipientZip}

SERVICE: ${formData.serviceType.toUpperCase()}
WEIGHT: ${formData.weight} lbs
DIMENSIONS: ${formData.length}" x ${formData.width}" x ${formData.height}"
PAYMENT: ${paymentMethod.toUpperCase()}

Barcode: [${trackingNumber}]
    `;

    const blob = new Blob([labelContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shipping-label-${trackingNumber}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (labelGenerated) {
    return (
      <div className="label-confirmation">
        <h1>Label Generated Successfully!</h1>
        <div className="tracking-info">
          <h2>Tracking Number: {trackingNumber}</h2>
          <p>Your shipping label has been created and is ready for download.</p>
        </div>
        <div className="label-actions">
          <button onClick={downloadLabel} className="download-btn">
            Download Shipping Label
          </button>
          <button onClick={() => setLabelGenerated(false)} className="new-label-btn">
            Create New Label
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="labeling-container">
      <h1>Create Shipping Label</h1>
      <p className="subtitle">Generate prepaid shipping labels for your domestic and international shipments</p>
      
      <div className="payment-section">
        <h3>Payment Options</h3>
        <div className="payment-methods">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="prepaid"
              checked={paymentMethod === 'prepaid'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">Prepaid (Bill Sender)</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="collect"
              checked={paymentMethod === 'collect'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">Collect (Bill Recipient)</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="thirdparty"
              checked={paymentMethod === 'thirdparty'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">Third Party Billing</span>
          </label>
        </div>
      </div>

      <form className="label-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Sender Information</h3>
          <input
            type="text"
            name="senderName"
            placeholder="Sender Name *"
            value={formData.senderName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="senderCompany"
            placeholder="Company (Optional)"
            value={formData.senderCompany}
            onChange={handleChange}
          />
          <input
            type="text"
            name="senderAddress"
            placeholder="Street Address *"
            value={formData.senderAddress}
            onChange={handleChange}
            required
          />
          <div className="address-row">
            <input
              type="text"
              name="senderCity"
              placeholder="City *"
              value={formData.senderCity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="senderState"
              placeholder="State *"
              value={formData.senderState}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="senderZip"
              placeholder="ZIP Code *"
              value={formData.senderZip}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="tel"
            name="senderPhone"
            placeholder="Phone Number *"
            value={formData.senderPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>Recipient Information</h3>
          <input
            type="text"
            name="recipientName"
            placeholder="Recipient Name *"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="recipientCompany"
            placeholder="Company (Optional)"
            value={formData.recipientCompany}
            onChange={handleChange}
          />
          <input
            type="text"
            name="recipientAddress"
            placeholder="Street Address *"
            value={formData.recipientAddress}
            onChange={handleChange}
            required
          />
          <div className="address-row">
            <input
              type="text"
              name="recipientCity"
              placeholder="City *"
              value={formData.recipientCity}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="recipientState"
              placeholder="State *"
              value={formData.recipientState}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="recipientZip"
              placeholder="ZIP Code *"
              value={formData.recipientZip}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="tel"
            name="recipientPhone"
            placeholder="Phone Number *"
            value={formData.recipientPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>Package Details</h3>
          <div className="service-row">
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="standard">Standard Shipping</option>
              <option value="express">Express Shipping</option>
              <option value="overnight">Overnight</option>
              <option value="international">International</option>
            </select>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              required
            >
              <option value="package">Package</option>
              <option value="envelope">Envelope</option>
              <option value="tube">Tube</option>
              <option value="pallet">Pallet</option>
            </select>
          </div>
          <div className="dimensions-row">
            <input
              type="number"
              name="weight"
              placeholder="Weight (lbs) *"
              value={formData.weight}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
            />
            <input
              type="number"
              name="length"
              placeholder="Length (in) *"
              value={formData.length}
              onChange={handleChange}
              required
              min="1"
            />
            <input
              type="number"
              name="width"
              placeholder="Width (in) *"
              value={formData.width}
              onChange={handleChange}
              required
              min="1"
            />
            <input
              type="number"
              name="height"
              placeholder="Height (in) *"
              value={formData.height}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <input
            type="number"
            name="declaredValue"
            placeholder="Declared Value ($)"
            value={formData.declaredValue}
            onChange={handleChange}
            min="0"
          />
          <textarea
            name="description"
            placeholder="Package Description *"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="generate-label-btn">
          Generate Shipping Label
        </button>
      </form>
    </div>
  );
};

export default Labeling;