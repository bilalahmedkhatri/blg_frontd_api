import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

interface ErrorMessageProps {
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  confirmPasswordErrorMessage: string;
}

export default function ErrorMessage({
  emailError,
  passwordError,
  confirmPasswordError,
  emailErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
}: ErrorMessageProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {(emailError || passwordError) && (
        <Alert severity="error">
          {emailError && emailErrorMessage}
          {passwordError && !emailError && passwordErrorMessage}
        </Alert>
      )}
      {confirmPasswordError && (
        <Alert severity="error">
          {confirmPasswordErrorMessage}
        </Alert>
      )}
    </Stack>
  );
}