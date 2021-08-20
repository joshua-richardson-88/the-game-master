import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  container: {
    position: 'absolute',
    width: '80vw',
    height: '60vh',
    top: '20vh',
    left: '10vw',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  dark: {
    color: 'grey',
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  light: {
    color: '#EAEAEA',
  },
  musicContainer: {
    overflow: 'hidden',
    margin: '1rem',
    height: '53vh',
    width: 'calc(100% - 2rem)',
  },
  volumeSlider: {
    width: '200px',
  },
  trackList: {
    height: '100%',
    overflowY: 'auto',
  },
  track: {
    cursor: 'pointer',
    margin: '0.5rem 0',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.1)',
    },
  },
  upload: {
    position: 'absolute',
    bottom: '2rem',
    right: '4rem',
    width: '4.5rem',
    height: '4rem',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

export default useStyles;
