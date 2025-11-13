import React from 'react';

const Services = () => {
  return (
    <div>
      <h1>Our Services</h1>
      <div className="services-container">
        <div className="service-item">
          <h2>Import/Export Services</h2>
          <p><strong>Comprehensive International Trade Solutions</strong></p>
          <p>Velora Global delivers end-to-end import and export solutions connecting India with global markets. Our integrated logistics network ensures seamless cargo movement across international borders with complete supply chain visibility.</p>
          <p><strong>Core Service Offerings:</strong></p>
          <ul>
            <li>Full-container load (FCL) and less-than-container load (LCL) shipping</li>
            <li>Air freight and ocean freight consolidation</li>
            <li>Customs brokerage and documentation management</li>
            <li>Multi-modal transportation solutions</li>
            <li>Warehousing and distribution services</li>
            <li>Cargo insurance and risk management</li>
            <li>Real-time shipment tracking and visibility</li>
          </ul>
          <p><strong>Industry Expertise:</strong></p>
          <p>With extensive experience in international trade compliance and logistics management, we navigate complex regulatory requirements to ensure timely and cost-effective cargo delivery. Our dedicated operations team provides 24/7 support, managing every aspect of your shipment from origin to final destination. We leverage advanced technology platforms to optimize routing, minimize transit times, and provide complete transparency throughout the shipping process.</p>
        </div>
        <div className="service-item">
          <h2>Student Relocation Services</h2>
          <p>We offer specialized services for students moving abroad for their studies. We can help you ship your belongings, including books, clothes, and other personal items.</p>
        </div>
        <div className="service-item">
          <h2>Quote Generation</h2>
          <p>Our online quote generation tool makes it easy to get a customized quote for your shipment. Simply provide us with the details of your move, and we will give you a competitive price.</p>
        </div>
        <div className="service-item">
          <h2>Shipment Labeling</h2>
          <p>We provide proper labeling for all your shipments to ensure they are handled correctly and reach their destination safely. We also provide all necessary documentation for customs.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;