import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ColorModeSelect from '../theme/DarkMode';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import { authService } from './authService';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import ErrorDisplay from '../components/ErrorDisplay';

interface SignInProps {
  disableCustomTheme?: boolean;
}

export default function SignIn({ disableCustomTheme = false }: SignInProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string[] }>({}); 
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (validateInputs()) {
      try {
        const response = await authService.login(email, password);

        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        navigate('/dashboard');
      } catch (err) {
        const error = err as AxiosError;
        setFormErrors(error.response.data)
        if (error.response && error.response.data) {
          const errorData = error.response.data;

          // Assuming your API returns error messages in this format
          if (errorData.error) {
            // Handle specific error message from the backend
            if (errorData.error.includes('email')) {
              setEmailError(true);
              setEmailErrorMessage(errorData.error);
            } else if (errorData.error.includes('password')) {
              setPasswordError(true);
              setPasswordErrorMessage(errorData.error);
            } else {
              // Generic error message
              alert('Login failed: ' + errorData.error);
            }
          } else {
            // Handle other errors
            alert('Login failed. Please check your credentials.');
          }
        } else {
          // Handle network errors or other issues
          alert('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid container spacing={2}>
        <Grid
          size={12}
          sx={{
            p: 4,
            my: 4,
            borderRadius: 7,
            boxShadow: 24,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <SitemarkIcon />
            {!disableCustomTheme && <ColorModeSelect />}
          </Stack>
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', my: 1 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <TextField
                margin="normal"
                label="your@email.com"
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <TextField
                margin="normal"
                label="Password"
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button size="large" type="submit" fullWidth variant="contained" sx={{ my: 1, pt: 1 }}>
              Sign in
            </Button>
            <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'center' }}>
              Forgot your password?
            </Link>
          </Box>
          <Divider sx={{ my: 2, width: '100%' }}>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Facebook')} startIcon={<FacebookIcon />}>
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link href="/sign-up" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}