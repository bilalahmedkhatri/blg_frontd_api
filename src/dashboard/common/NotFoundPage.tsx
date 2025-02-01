import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h1" gutterBottom>404</Typography>
      <Typography variant="h4" gutterBottom>Page Not Found</Typography>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ mt: 3 }}
        onClick={() => navigate('/')}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};