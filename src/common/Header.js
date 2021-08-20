// import react libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

// import redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../features/game/GameSlice';

// import material-ui libraries
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';

// import icons
import MenuIcon from '@material-ui/icons/Menu';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import CasinoIcon from '@material-ui/icons/Casino';
import TimerIcon from '@material-ui/icons/Timer';
import Screen from '../assets/dm-screen.svg';

// import project files
import { useAuth } from '../contexts/AuthContext';
import useStyles from './Style';

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const timeStatus = useSelector(
    (state) => state.game.modals.filter((el) => el.title === 'timerShow')[0]
  );

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar position='static'>
      <Toolbar className={classes.container}>
        <Button edge='start' color='inherit' aria-label='open drawer'>
          <MenuIcon />
        </Button>
        <Typography variant='h6' align='center' noWrap>
          Game Master
        </Typography>
        <div className={classes.buttonGroup}>
          <Button color='inherit' onClick={() => dispatch(showModal('screenShow'))}>
            <img src={Screen} alt='dm screen' />
          </Button>
          <Button color='inherit' onClick={() => dispatch(showModal('audioShow'))}>
            <LibraryMusicIcon />
          </Button>
          <Button color='inherit' onClick={() => dispatch(showModal('diceShow'))}>
            <CasinoIcon />
          </Button>
          <Button color='inherit' onClick={() => dispatch(showModal('timerShow'))}>
            <TimerIcon
              className={
                timeStatus.isGood
                  ? classes.good
                  : timeStatus.isWarn
                  ? classes.warn
                  : timeStatus.isDanger
                  ? classes.danger
                  : classes.btn
              }
            />
          </Button>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
