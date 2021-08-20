import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '30vw',
    height: '30vh',
    top: '35vh',
    left: '35vw',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
