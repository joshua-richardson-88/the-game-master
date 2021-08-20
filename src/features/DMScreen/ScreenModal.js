import React from 'react';

// import redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../game/GameSlice';

// import material-ui libraries
import { Modal } from '@material-ui/core';

// import project files
import useStyles from './Style';

export default function DiceModal() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const diceModal = useSelector(
    (state) => state.game.modals.filter((el) => el.title === 'screenShow')[0]
  );

  const body = <div className={classes.container}>A DM Screen Modal</div>;

  return (
    <div>
      <Modal open={diceModal.value} onClose={() => dispatch(hideModal('screenShow'))}>
        {body}
      </Modal>
    </div>
  );
}
