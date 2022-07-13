import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent, Grid, Typography,
  Button
} from '@material-ui/core';
import clsx from 'clsx';
import styled from 'styled-components';

import { HeaderStyle } from '../styles/header';

import Header from '../components/header.component';

const MobileGrid = styled(Grid)`
  @media(max-width: 980px){
    width: 100%;
    position: fixed;
    z-index: 1000;
  }
`;

export default function PersistentDrawerLeft({ children }) {
  const classes = HeaderStyle();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <div className={`${classes.root} main-background`}>
          <Header
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
          <main
            className={`${clsx(classes.content, {
              [classes.contentShift]: open,
            })} main-background`}
            style={{ minHeight: '100vh' }}
          >
            <div>
              <div className={classes.drawerHeader} />
              <Grid container>
                <Grid item lg={12} xs={12}>
                  <div className={classes.drawerWrapper}>
                    {children}
                  </div>
                </Grid>
              </Grid>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
