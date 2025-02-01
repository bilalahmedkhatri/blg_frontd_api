import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NotificationText } from '../components/NotificationPopUp';
import ColorModeSelect from '../theme/DarkMode';
import Alert from '@mui/material/Alert';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'; 

// APIs call
import { authService } from './authService'
import { AxiosError } from 'axios';

// FormTextField Component
interface FormTextFieldProps {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  error?: boolean; 
  helperText?: string;
  autoFocus?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  name,
  type,
  error = false, 
  helperText = '', 
  autoFocus = false,
  required = true,
  ...props
}) => (
  <FormControl>
    <TextField
      margin="normal"
      label={label}
      error={error}
      helperText={helperText}
      id={name}
      type={type}
      name={name}
      placeholder={label}
      autoComplete={name}
      autoFocus={autoFocus}
      required={required}
      fullWidth
      variant="outlined"
      color={error ? 'error' : 'primary'}
      {...props}
    />
  </FormControl>
);

// ErrorAlert Component
interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <Alert severity="error" sx={{ mt: 1 }}>
    {message}
  </Alert>
);

// SocialLoginButtons Component
const SocialLoginButtons = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Button
      fullWidth
      variant="outlined"
      onClick={() => alert('Sign in with Google')}
      startIcon={<GoogleIcon />}
    >
      Sign in with Google
    </Button>
    <Button
      fullWidth
      variant="outlined"
      onClick={() => alert('Sign in with Facebook')}
      startIcon={<FacebookIcon />}
    >
      Sign in with Facebook
    </Button>
    <Typography sx={{ textAlign: 'center' }}>
      Have an account?{' '}
      <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
        Login
      </Link>
    </Typography>
  </Box>
);

// SignUpForm Component
interface SignUpFormProps {
  setDataSent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormErrors {
  email?: string;
  password?: string;
  password2?: string;
  general?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ setDataSent }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      try {
        const data = new FormData(event.currentTarget);

        const res = await authService.register(
          data.get('email') as string,
          data.get('password') as string,
          data.get('password2') as string,
        );

        setDataSent(true); // Show notification on success

        // Store tokens (consider more secure options for production)
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        // Reset form and errors
        event.currentTarget.reset();
        setFormErrors({});
      } catch (err) {
        const error = err as AxiosError;
        if (error.response && error.response.data) {
          setFormErrors(error.response.data); // Set all errors from response
        }
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById('password2') as HTMLInputElement;

    let isValid = true;
    const newFormErrors: FormErrors = {};

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      newFormErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password.value || password.value.length < 6) {
      newFormErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (password.value !== confirmPassword.value) {
      newFormErrors.password2 = 'Passwords do not match.';
      isValid = false;
    }

    setFormErrors(newFormErrors);
    return isValid;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >

      {/* Display form errors */}
      {Object.keys(formErrors).map((key) => (
        <ErrorAlert key={key} message={formErrors[key]} />
      ))}

      <FormTextField
        label="your@email.com"
        name="email"
        type="email"
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      <FormTextField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        error={!!formErrors.password}
        helperText={formErrors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <FormTextField
        label="Confirm Password"
        name="password2"
        type={showPassword ? 'text' : 'password'}
        error={!!formErrors.password2}
        helperText={formErrors.password2}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button size="large" type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 1, pt: 1 }}>
        Sign Up
      </Button>
    </Box>
  );
};

// SignUpPage Component
interface SignUpPageProps {
  disableCustomTheme?: boolean;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ disableCustomTheme }) => {
  const [dataSent, setDataSent] = React.useState(false);
  const navigate = useNavigate(); 

  const handleClose = () => {
    setDataSent(false);
  };

  React.useEffect(() => {
    if (dataSent) {
      const timer = setTimeout(() => {
        setDataSent(false);
        navigate('/'); 
      }, 10000); // Hide after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [dataSent, navigate]);

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid container spacing={2}>
        <Grid
          size={12}
          sx={{
            p: 4,
            mt: 3,
            mb: 4,
            borderRadius: 7,
            boxShadow: 24,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <SitemarkIcon />
            {!disableCustomTheme && <ColorModeSelect />}
          </Stack>
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', my: 1 }}>
            Sign Up
          </Typography>
          <SignUpForm setDataSent={setDataSent} />

          {/* Show notification when dataSent is true */}
          {dataSent && (
            <NotificationText
              openText={dataSent}
              handleCloseText={handleClose}
              title="Account Submission Successful"
              description={
                <>
                  <Typography variant="body1" component="div">
                    ✓ Your account is under review
                    <br />
                    ✓ Expect approval confirmation within 24 hours
                    <br />
                    ✓ Check your email (including spam folder)
                  </Typography>
                </>
              }
              icon={<CheckCircleOutline fontSize="large" color="success" />}
            />
          )}

          <Divider sx={{ my: 2, width: '100%' }}>or</Divider>

          <SocialLoginButtons />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPage;