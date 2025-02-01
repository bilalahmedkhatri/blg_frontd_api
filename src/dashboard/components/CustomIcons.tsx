import React from 'react';

// Define the types for your custom icons
interface CustomIconProps {
  size?: number;
  color?: string;
  className?: string;
  // You can add other props like onClick, style, etc. as needed
}

// Google Icon Component
export const GoogleIcon: React.FC<CustomIconProps> = ({ size = 24, color = '#4285F4', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    style={{ fill: color }}
  >
    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
  </svg>
);

// Facebook Icon Component
export const FacebookIcon: React.FC<CustomIconProps> = ({ size = 24, color = '#3b5998', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    style={{ fill: color }}
  >
    <path d="M42 37c0 2.76-2.24 5-5 5H11c-2.76 0-5-2.24-5-5V11c0-2.76 2.24-5 5-5h26c2.76 0 5 2.24 5 5v26z" />
    <path
      d="M34.368 25H31v13h-5V25h-3v-4h3v-2.41c0-3.503 2.498-5.59 6-5.59H35v4h-2.287c-1.043 0-1.713.67-1.713 1.71V21h4.713l-.632 4z"
      style={{ fill: '#fff' }}
    />
  </svg>
);

// Placeholder for Sitemark Icon - Replace with your actual SVG
export const SitemarkIcon: React.FC<CustomIconProps> = ({ size = 24, color = '#000', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    style={{ fill: color }}
  >
    {/* Example: A simple bookmark icon - Replace this with your actual SVG content */}
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    {/* End of example */}
  </svg>
);