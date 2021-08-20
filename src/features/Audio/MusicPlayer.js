// import react libraries
import React, { useState } from 'react';

// import firebase
import useFirestore from '../../firebase/useFirestore';

// import material-ui
import { Grid, IconButton, Typography } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';

// import project files
import useStyles from './Style';

export default function MusicPlayer() {
  const classes = useStyles();
  const { docs } = useFirestore('audio');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackInd, setCurrentTrackInd] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeatAll, setRepeatAll] = useState(false);
  const [repeatToggle, setRepeatToggle] = useState(0);
  const [repeatOne, setRepeatOne] = useState(false);
  const [playOrder, setPlayOrder] = useState([]);

  // event listener for when a track is selected from the playlist
  const handleTrackSelect = (e, track) => {
    setCurrentTrack(track);
    // if shuffle is selected, shuffle the order
    if (shuffle) shuffleTracks();
    else {
      let order = [];
      for (let i = 0; i < docs.length; i++) {
        order.push(i);
      }
      setPlayOrder(order);
      setCurrentTrackInd(0);
    }
  };

  // event listener for the shuffle button
  const handleShuffleClick = (e) => {
    setShuffle(!shuffle);
    shuffleTracks();
  };

  // event listener for the repeat button
  const handleRepeatClick = (e) => {
    switch (repeatToggle) {
      case 0:
        setRepeatToggle(1);
        setRepeatAll(true);
        setRepeatOne(false);
        break;
      case 1:
        setRepeatToggle(2);
        setRepeatAll(false);
        setRepeatOne(true);
        break;
      default:
        setRepeatToggle(0);
        setRepeatAll(false);
        setRepeatOne(false);
    }
  };

  // event listener for the next button
  const handleNextClick = (e) => {
    let nextTrack = currentTrackInd + 1;

    if (currentTrackInd === playOrder.length - 1 && repeatAll) {
      nextTrack = 0;
    } else if (repeatOne) {
      nextTrack = currentTrackInd;
    }

    setCurrentTrackInd(nextTrack);
    setCurrentTrack(docs[playOrder[nextTrack]]);
  };

  // event listener for the next button
  const handlePrevClick = (e) => {
    let prevTrack = currentTrackInd - 1;

    if (currentTrackInd === 0 && repeatAll) {
      console.log('repeatall is on, jumping to the end');
      prevTrack = playOrder.length - 1;
    } else if (repeatOne) {
      prevTrack = currentTrackInd;
    }

    setCurrentTrackInd(prevTrack);
    setCurrentTrack(docs[playOrder[prevTrack]]);
  };

  // does the shuffling and setting of state
  const shuffleTracks = () => {
    console.log('shuffle is set to: ', shuffle);
    let order = [];
    for (let i = 0; i < docs.length; i++) {
      order.push(i);
    }

    if (!shuffle) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    }

    setPlayOrder(order);
    setCurrentTrack(docs[order[0]]);
    setCurrentTrackInd(0);
  };

  return (
    <Grid
      container
      direction='row'
      justify='space-between'
      alignItems='stretch'
      spacing={3}
      className={classes.musicContainer}
    >
      <Grid item xs={12} sm={4}>
        {currentTrack && (
          <>
            <Typography variant='body1' align='center'>
              {currentTrack.name.split('.')[0]}
            </Typography>
            <audio src={currentTrack.url} controls onEnded={handleNextClick} />
          </>
        )}
        <div>
          <IconButton
            aria-label='shuffle'
            onClick={handleShuffleClick}
            className={shuffle ? classes.light : classes.dark}
          >
            <ShuffleIcon />
          </IconButton>
          <IconButton aria-label='Previous' disabled={!currentTrack} onClick={handlePrevClick}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label='Next' disabled={!currentTrack} onClick={handleNextClick}>
            <SkipNextIcon />
          </IconButton>
          <IconButton
            aria-label='Repeat'
            onClick={handleRepeatClick}
            className={repeatToggle === 0 ? classes.dark : classes.light}
          >
            {repeatOne ? <RepeatOneIcon /> : <RepeatIcon />}
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} className={classes.trackList}>
        {docs &&
          playOrder.length === 0 &&
          docs
            .filter((doc) => doc.type === 'Music')
            .map((doc) => (
              <Typography
                variant='body1'
                key={doc.id}
                onClick={(e) => handleTrackSelect(e, doc)}
                className={classes.track}
              >
                {doc.name.split('.')[0]}
              </Typography>
            ))}
        {docs &&
          playOrder.length > 1 &&
          playOrder.map((el) =>
            docs[el].type === 'Music' ? (
              <Typography
                variant='body1'
                key={docs[el].id}
                onClick={(e) => handleTrackSelect(e, docs[el])}
                className={classes.track}
              >
                {docs[el].name.split('.')[0]}
              </Typography>
            ) : null
          )}
      </Grid>
    </Grid>
  );
}
