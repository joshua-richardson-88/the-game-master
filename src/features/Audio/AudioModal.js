import React, { useState } from 'react';

// import redux libraries
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../game/GameSlice';

// import material-ui libraries
import { Modal, Tab, Tabs } from '@material-ui/core';

// import project files
import useStyles from './Style';
import UploadFile from './UploadFile';
import TabPanel from '../../common/TabPanel';
import MusicPlayer from './MusicPlayer';
import AudioScape from './Soundscapes';

export default function DiceModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const audioModal = useSelector(
    (state) => state.game.modals.filter((el) => el.title === 'audioShow')[0]
  );
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const body = (
    <div className={classes.container}>
      <Tabs value={currentTab} variant='fullWidth'>
        <Tab label='Music Player' onClick={(e) => handleTabChange(e, 0)} />
        <Tab label='AudioScape' onClick={(e) => handleTabChange(e, 1)} />
        <Tab label='Sound Board' onClick={(e) => handleTabChange(e, 2)} />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <MusicPlayer />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <AudioScape />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        Sound board
      </TabPanel>
      <UploadFile tab={currentTab} />
    </div>
  );

  return (
    <div>
      <Modal open={audioModal.value} onClose={() => dispatch(hideModal('audioShow'))}>
        {body}
      </Modal>
    </div>
  );
}
