import { FC, ReactNode, useState } from 'react';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { TopAppBar } from './TopAppBar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom'; // Add this import


interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  console.log('console childern', children);
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopAppBar sidebarOpen={sidebarOpen} onToggleSidebar={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: { xs: 0, md: `-${theme.mixins.drawerWidth}px` },
          ...(sidebarOpen && {
            marginLeft: 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Box sx={{ mt: { xs: 7, md: 10 } }}>
          <Outlet />
        </Box>
        {/* <Box sx={{ mt: { xs: 7, md: 10 } }}>{children}</Box> */}
      </Box>
    </Box>
  );
};