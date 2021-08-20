import React, { useState } from 'react';

// import redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../game/GameSlice';

// import material-ui libraries
import { Button, Grid, Modal, TextField, Typography } from '@material-ui/core';

// import project files
import useStyles from './Style';

export default function DiceModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const diceModal = useSelector(
    (state) => state.game.modals.filter((el) => el.title === 'diceShow')[0]
  );

  // state
  const [display, setDisplay] = useState('0');
  const [didCalculation, setDidCalculation] = useState(false);
  const [allRolls, setAllRolls] = useState('$');

  // assign value to display
  function assign(value) {
    let newValue = display + value;
    if (display === '0' || didCalculation === true) {
      setDisplay(value);
      setDidCalculation(false);
      setAllRolls('$');
    } else {
      setDisplay(newValue);
    }
  }

  // clear display
  function clear() {
    setDisplay('0');
  }

  function roll(dice) {
    let quantity = dice.split('d')[0];
    let faces = dice.split('d')[1];
    let result = { dice: 0, str: '[' };

    for (let i = 0; i < quantity; i++) {
      if (i > 0) result.str += ' + ';
      let value = Math.floor(Math.random() * faces) + 1;
      result.dice += value;
      result.str += `(${value})`;
    }
    result.str += ']';

    return result;
  }

  function isDieRoll(str) {
    return str.includes('d');
  }

  function isNumber(str) {
    return !isNaN(str);
  }

  function isOperation(str) {
    return str.includes('+') || str.includes('-');
  }

  function calculate() {
    // set that we've done a calculation so it auto-resets when we type again
    setDidCalculation(true);
    setAllRolls('');

    // set up variables
    const rolls = []; // stores all of the segments of the calculation
    let result = 0; // stores the final result of the roll
    let nextOperation = null; // stores what operation will occur next
    let startOfRoll = 0; // stores an index position of where the segment begins
    let lock = false; // if we hit an error, we set the lock
    let calcString = ''; // sets the sub-string to display all the results

    // go through the display value and break it up into chuncks
    for (let i = 0; i < display.length; i++) {
      // check if character is an operation
      if (isOperation(display[i])) {
        // collect everything up to the operation, and add it to the rolls array
        rolls.push(display.substring(startOfRoll, i));
        // then push the operation
        rolls.push(display[i]);
        // then update the starting position of the next roll
        startOfRoll = i + 1;
      }
      if (i === display.length - 1) {
        // if we're at the end of the string add the rest to the rolls array
        rolls.push(display.substring(startOfRoll, i + 1));
      }
    }
    // perform the calculation
    rolls.forEach((el) => {
      // fist check the lock
      if (lock) {
        setDisplay('Bad calculation, try again');
      } else {
        // if the roll is a number
        if (isNumber(el)) {
          calcString += el;
          if (nextOperation === null || nextOperation === '+') {
            result += parseInt(el);
            nextOperation = null;
          } else if (nextOperation === '-') {
            result -= parseInt(el);
            nextOperation = null;
          }
        } else if (isOperation(el)) {
          calcString += ` ${el} `;
          if (nextOperation === null) {
            nextOperation = el;
          } else {
            lock = true;
          }
        } else if (isDieRoll(el)) {
          calcString += el;
          if (nextOperation === null || nextOperation === '+') {
            let value = roll(el);
            result += value.dice;
            calcString += value.str;
            nextOperation = null;
          } else if (nextOperation === '-') {
            let value = roll(el);
            result -= value.dice;
            calcString += ` ${value.str}`;
            nextOperation = null;
          }
        }
      }
    });
    setAllRolls(calcString);
    setDisplay(result);
  }

  const body = (
    <div className={classes.container}>
      <TextField
        fullWidth
        variant='filled'
        dir='rtl'
        value={display}
        onChange={(e) => setDisplay(e.target.value)}
      />
      <Typography variant='subtitle1' align='right'>
        {allRolls !== '$' ? allRolls : ''}
      </Typography>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Button className={classes.button} variant='contained' onClick={() => assign('7')}>
          7
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('8')}>
          8
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('9')}>
          9
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d2')}
        >
          d2
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d4')}
        >
          d4
        </Button>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          onClick={() => clear()}
        >
          C
        </Button>
      </Grid>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Button className={classes.button} variant='contained' onClick={() => assign('4')}>
          4
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('5')}>
          5
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('6')}>
          6
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d6')}
        >
          d6
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d8')}
        >
          d8
        </Button>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          onClick={() => assign('+')}
        >
          +
        </Button>
      </Grid>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Button className={classes.button} variant='contained' onClick={() => assign('1')}>
          1
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('2')}>
          2
        </Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('3')}>
          3
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d10')}
        >
          d10
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d12')}
        >
          d12
        </Button>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          onClick={() => assign('-')}
        >
          -
        </Button>
      </Grid>
      <Grid
        className={classes.row}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Button className={classes.button} variant='contained' disabled></Button>
        <Button className={classes.button} variant='contained' onClick={() => assign('0')}>
          0
        </Button>
        <Button className={classes.button} variant='contained' disabled></Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d20')}
        >
          d20
        </Button>
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          onClick={() => assign('d100')}
        >
          d100
        </Button>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          onClick={() => calculate()}
        >
          =
        </Button>
      </Grid>
    </div>
  );

  return (
    <div>
      <Modal open={diceModal.value} onClose={() => dispatch(hideModal('diceShow'))}>
        {body}
      </Modal>
    </div>
  );
}
