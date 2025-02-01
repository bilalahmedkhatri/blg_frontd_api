import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';



// Components
import AppBarDashboard from './AppMenus';
import PostCreate2 from '../components/PostCreate2';

export default function MainContainer() {
  return (
    <React.Fragment>
      <AppBarDashboard />
      {/* <Main open={open}>
        <Outlet />
      </Main> */}
    </React.Fragment>
  );
}
