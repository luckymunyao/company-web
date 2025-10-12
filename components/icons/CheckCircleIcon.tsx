import React from 'react';

const CheckCircleIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-12 w-12 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default CheckCircleIcon;
