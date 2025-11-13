import React from 'react';

const VeloraLogo = ({ width = 200, height = 60, className = "" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 200 60" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background globe outline */}
      <circle 
        cx="30" 
        cy="30" 
        r="25" 
        fill="none" 
        stroke="#61dafb" 
        strokeWidth="2"
        opacity="0.3"
      />
      
      {/* Globe grid lines */}
      <path 
        d="M30 5 Q50 30 30 55 Q10 30 30 5" 
        fill="none" 
        stroke="#61dafb" 
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path 
        d="M5 30 Q30 20 55 30 Q30 40 5 30" 
        fill="none" 
        stroke="#61dafb" 
        strokeWidth="1.5"
        opacity="0.5"
      />
      
      {/* Arrow representing logistics/movement */}
      <path 
        d="M20 30 L40 30 M35 25 L40 30 L35 35" 
        stroke="#282c34" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Package/box icon */}
      <rect 
        x="45" 
        y="20" 
        width="15" 
        height="15" 
        fill="none" 
        stroke="#282c34" 
        strokeWidth="2"
        rx="2"
      />
      <path 
        d="M52.5 20 L52.5 35" 
        stroke="#282c34" 
        strokeWidth="1.5"
      />
      
      {/* Speed lines */}
      <path 
        d="M65 25 L75 25 M65 30 L80 30 M65 35 L75 35" 
        stroke="#61dafb" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Text: Velora */}
      <text 
        x="85" 
        y="35" 
        fontFamily="Arial, sans-serif" 
        fontSize="24" 
        fontWeight="bold" 
        fill="#282c34"
        letterSpacing="1"
      >
        VELORA
      </text>
      
      {/* Text: Global */}
      <text 
        x="85" 
        y="50" 
        fontFamily="Arial, sans-serif" 
        fontSize="14" 
        fill="#61dafb" 
        letterSpacing="2"
      >
        GLOBAL
      </text>
      
      {/* Connecting lines */}
      <path 
        d="M70 27 L80 27 M70 32 L85 32 M70 37 L80 37" 
        stroke="#61dafb" 
        strokeWidth="1"
        opacity="0.7"
      />
      
      {/* Subtle shadow effect */}
      <ellipse 
        cx="30" 
        cy="52" 
        rx="20" 
        ry="3" 
        fill="#61dafb" 
        opacity="0.2"
      />
    </svg>
  );
};

export default VeloraLogo;