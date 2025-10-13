import React from 'react';

const MapPinIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
        aria-hidden="true"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M17.657 16.657l-5.657 5.657-5.657-5.657a8 8 0 1111.314 0z" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
        />
    </svg>
);

export default MapPinIcon;