import React from 'react';
import Alert from '@mui/material/Alert';

interface ErrorDisplayProps {
  errors: { [key: string]: string[] }; // An object where keys are field names and values are arrays of error messages
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  return (
    <div>
      {Object.keys(errors).map((key) => (
        <Alert key={key} severity="error" sx={{ mt: 1 }}>
          {errors[key].map((errorMessage, index) => (
            <div key={index}>{errorMessage}</div>
          ))}
        </Alert>
      ))}
    </div>
  );
};

export default ErrorDisplay;