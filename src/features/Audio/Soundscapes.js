// import react libraries
import React, { useEffect, useState } from 'react';

// import firebase
import useFirestore from '../../firebase/useFirestore';

// import material-ui libraries
import { Slider, useMediaQuery } from '@material-ui/core';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useTheme } from '@material-ui/core/styles';

// import project files
import useStyles from './Style';

export default function Soundscapes() {
  const classes = useStyles();
  const theme = useTheme();
  const { docs } = useFirestore('audio');
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [volume, setVolume] = useState([]);

  const handleVolumeChange = (e, volumeLevel, volumeId) => {
    let newVolumeArr = volume.slice();
    newVolumeArr.forEach((el) => {
      if (el.id === volumeId) {
        el.value = volumeLevel;
      }
    });
    setVolume(newVolumeArr);
    let audio = document.getElementById(volumeId);
    audio.volume = volumeLevel / 100;
    if (!audio.duration > 0 || audio.paused) audio.play();
    if (volumeLevel === 0) audio.pause();
  };

  const getVolume = (volumeId, scale) => {
    let output;
    if (volume.length > 0) {
      let audio = volume.filter((el) => el.id === volumeId)[0];
      output = audio ? audio.value : 0;
    } else {
      output = 0;
    }

    return scale === 1 ? output / 100 : output;
  };

  useEffect(() => {
    docs
      .filter((el) => el.type === 'AudioScape')
      .forEach((doc) => {
        if (!volume.some((volume) => volume.id === doc.id)) {
          setVolume((prevArr) => [...prevArr, { id: doc.id, value: 0 }]);
        }
      });
  }, [docs, volume]);

  return (
    <div className={classes.musicContainer}>
      <div className={classes.trackList}>
        {docs &&
          docs
            .filter((doc) => doc.type === 'AudioScape')
            .map((doc) => (
              <div key={doc.id}>
                <span>{doc.name}</span>
                {!matches ? (
                  <>
                    <div>
                      <VolumeDown />
                      <Slider
                        value={getVolume(doc.id, 100)}
                        onChange={(e, val) => handleVolumeChange(e, val, doc.id)}
                        min={0}
                        max={100}
                        className={classes.volumeSlider}
                      />
                      <VolumeUp />
                    </div>
                    <audio id={doc.id} loop src={doc.url} />
                  </>
                ) : (
                  <audio id={doc.id} loop src={doc.url} controls />
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
