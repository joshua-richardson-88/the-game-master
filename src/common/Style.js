import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw',
    padding: '0 1rem',
  },
  buttonGroup: {
    marginRight: '4rem',
  },
  good: {
    color: 'green',
    animation: '$pulse 2s infinite',
  },
  warn: {
    color: 'orange',
    animation: '$pulse 2s infinite',
  },
  danger: {
    color: 'red',
    animation: '$pulse 2s infinite',
  },
  btn: {
    color: theme.palette.text.primary,
    animation: '$pulse 0.1s 1',
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0px rgba(0, 0, 0, 0.2)',
    },
    '100%': {
      boxShadow: '0 0 0 20px rgba(0, 0, 0, 0)',
    },
  },
}));

export default useStyles;
