// import react libraries
import React, { useState } from 'react';

// import material libraries
import { Button, Drawer } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// import project files
import theme from '../app/Theme';
import Header from './Header';
import Popup from '../features/game/Popup';
import DiceModal from '../features/Dice/DiceModal';
import AudioModal from '../features/Audio/AudioModal';
import ScreenModal from '../features/DMScreen/ScreenModal';
import TimerModal from '../features/timer/TimerModal';

const useStyles = makeStyles({
  page: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  drawer: {
    left: '10%',
    right: '10%',
    borderRadius: '10px 10px 0 0',
    padding: '1rem',
    overflow: 'hidden',
    height: '20vh',
  },
  drawerUp: {
    position: 'absolute',
    bottom: '24vh',
    left: '48vw',
  },
  drawerDown: {
    position: 'absolute',
    bottom: '1rem',
    left: '48vw',
  },
});

export default function LandingPage() {
  const classes = useStyles();
  const [open, toggleOpen] = useState(false);

  const toggleDrawerOpen = (value) => toggleOpen(value);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.page}>
        <Header />
        <Button
          className={open ? classes.drawerUp : classes.drawerDown}
          onClick={() => toggleDrawerOpen(true)}
          variant='outlined'
        >
          <MenuIcon />
        </Button>
        <Drawer
          classes={{ paperAnchorBottom: classes.drawer }}
          open={open}
          onClose={() => toggleDrawerOpen(false)}
          anchor='bottom'
        >
          <Popup />
        </Drawer>
        <DiceModal />
        <AudioModal />
        <ScreenModal />
        <TimerModal />
      </div>
    </ThemeProvider>
  );
}
