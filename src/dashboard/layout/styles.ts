import { Theme } from '@mui/material/styles';

export const themeMixins = {
  drawerWidth: 240,
  maxContentWidth: 1440,
};

export const cardStyle = (theme: Theme) => ({
  p: 3,
  borderRadius: 2,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
});