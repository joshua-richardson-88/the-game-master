import React, { useEffect, useState } from 'react';

// import redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, setTimerFlag } from '../game/GameSlice';

// import material-ui libraries
import { Button, Grid, Modal, Typography } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

// import project files
import useStyles from './Style';

export default function DiceModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const diceModal = useSelector(
    (state) => state.game.modals.filter((el) => el.title === 'timerShow')[0]
  );

  const [type, setType] = useState('');
  const [isSet, setIsSet] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  function handleClick(value) {
    if (value === 'session') {
      setType('Session');
      setHours('02');
      setMinutes('00');
      setSeconds('00');
    } else {
      setType('Break');
      setHours('00');
      setMinutes('15');
      setSeconds('00');
    }
    setIsSet(true);
  }

  function handleFlow(value) {
    switch (value) {
      case 'play':
        setIsActive(true);
        setIsRunning(true);
        break;
      case 'pause':
        setIsRunning(false);
        break;
      default:
        clearTimer();
        dispatch(setTimerFlag('done'));
        break;
    }
  }

  function clearTimer() {
    setIsSet(false);
    setIsActive(false);
    setIsRunning(false);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  }

  useEffect(() => {
    const breakWarn = 600;
    const breakDanger = 90;
    const sessionWarn = 1800;
    const sessionDanger = 600;
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        let s = parseInt(seconds, 10);
        let m = parseInt(minutes, 10);
        let h = parseInt(hours, 10);
        let time = h * 3600 + m * 60 + s;

        // deal with the redux state
        if (type === 'session') {
          if (isRunning && time > sessionWarn) dispatch(setTimerFlag('isGood'));
          if (isRunning && time > sessionDanger && time < sessionWarn)
            dispatch(setTimerFlag('isWarn'));
          if (isRunning && time > 0 && time < sessionDanger) dispatch(setTimerFlag('isDanger'));
          if (time === 0) dispatch(setTimerFlag('done'));
        } else {
          console.log(`time: ${h}:${m}:${s}`);
          if (isRunning && time > breakWarn) dispatch(setTimerFlag('isGood'));
          if (isRunning && time > breakDanger && time < breakWarn) dispatch(setTimerFlag('isWarn'));
          if (isRunning && time > 0 && time < breakDanger) dispatch(setTimerFlag('isDanger'));
          if (time === 0) dispatch(setTimerFlag('done'));
        }

        // deal with countdown
        if (time === 0) {
          setIsRunning(false);
          clearInterval(interval);
        } else if (s === 0 && m === 0 && h > 0) {
          setSeconds(59 + '');
          setMinutes(59 + '');
          setHours(h > 10 ? h - 1 + '' : '0' + (h - 1));
        } else if (s === 0 && m > 0) {
          setSeconds(59 + '');
          setMinutes(m > 10 ? m - 1 + '' : '0' + (m - 1));
        } else if (s > 0) setSeconds(s > 10 ? s - 1 + '' : '0' + (s - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    isRunning,
    setIsRunning,
    seconds,
    minutes,
    hours,
    setSeconds,
    setMinutes,
    setHours,
    dispatch,
    type,
  ]);

  const body = (
    <div className={classes.container}>
      <Typography variant='body1'>{type} Timer</Typography>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='h2'>
            {hours} : {minutes} : {seconds}
          </Typography>
        </Grid>
        <Grid item>
          {isRunning ? (
            <Button disabled={!isSet} onClick={() => handleFlow('pause')}>
              <PauseIcon />
            </Button>
          ) : (
            <Button disabled={!isSet} onClick={() => handleFlow('play')}>
              <PlayArrowIcon />
            </Button>
          )}
        </Grid>
        <Grid item>
          <Button disabled={!isSet} onClick={() => handleFlow('stop')}>
            <StopIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        align='center'
      >
        <Grid item>
          <Button variant='contained' disabled={isActive} onClick={() => handleClick('session')}>
            Session
          </Button>
        </Grid>
        <Grid item>
          <Button variant='contained' disabled={isActive} onClick={() => handleClick('break')}>
            Break
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal open={diceModal.value} onClose={() => dispatch(hideModal('timerShow'))}>
        {body}
      </Modal>
    </div>
  );
}
