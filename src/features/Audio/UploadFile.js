// import react libraries
import React, { useEffect, useState, useRef } from 'react';

// import style libraries
import clsx from 'clsx';

// import material-ui libraries
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  MenuItem,
  TextField,
  Tooltip,
} from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

//import project files
import useStyles from './Style';
import useStorage from '../../firebase/useStorage';

const soundTypes = ['Music', 'AudioScape', 'Soundbyte'];

export default function UploadFile(props) {
  // gets the current tab
  const { tab } = props;

  const classes = useStyles();
  // this is used to create a refernce to a file input I don't want to see
  const hiddenFileInput = useRef(null);

  // file upload states
  const [file, setFile] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // dialog states
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState(soundTypes[tab]);

  // progress returned from useStorage Hook
  const { progress } = useStorage(file && readyToSubmit ? file : { f: { name: '' } });

  // used to dynamically adjust css in components
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  // passes click on fab button to hidden file input
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // use this to update properties on the file state
  const updateFile = (newValue) => {
    setFile((prevState) => ({ ...prevState, ...newValue }));
  };

  // when file input is updated, sets various state
  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && selected.type.includes('audio/')) {
      setOpen(true);
      setFile({ f: selected });
      setError(null);
      setSuccess(false);
    } else {
      setFile(null);
      setOpen(false);
      setSuccess(false);
      setLoading(false);
      setError('Please select an audio file');
    }
  };

  // useEffect to watch the progress and update state
  useEffect(() => {
    let timer;
    if (progress > 0 && progress < 100) {
      setLoading(true);
      setSuccess(false);
    } else if (progress === 100) {
      setReadyToSubmit(false);
      setLoading(false);
      setSuccess(true);
      setFile(null);
      timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [progress]);

  // handles closing dialog on cancel or other
  const handleDialogClose = () => {
    setOpen(false);
    setFile(null);
  };

  // handles closing dialog on successful form filling
  const handleSuccessClose = () => {
    setOpen(false);
    updateFile({ dbName: fileName, dbType: fileType });
    setReadyToSubmit(true);
  };

  return (
    <form className={classes.upload}>
      <input
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        type='file'
        onChange={changeHandler}
      />
      <div className={classes.wrapper}>
        <Tooltip title='Add new sound' arrow placement='top'>
          <Fab aria-label='save' color='primary' className={buttonClassname} onClick={handleClick}>
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
        </Tooltip>
        {loading && (
          <CircularProgress
            size={68}
            variant='static'
            value={progress}
            className={classes.fabProgress}
          />
        )}
        <Dialog onClose={handleDialogClose} aria-labelledby='upload form' open={open}>
          <DialogTitle>Upload Form</DialogTitle>
          <DialogContent>
            {file && <DialogContentText>Add descriptors to the file {file.name}</DialogContentText>}
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='File Name'
              placeholder='Leave blank to keep original file name'
              type='text'
              fullWidth
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <TextField
              id='filetype'
              fullWidth
              select
              label='File Type'
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              {soundTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSuccessClose} color='primary'>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.output}>
        {error && <div className={classes.error}>{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
}
