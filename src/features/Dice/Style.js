import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '30vw',
    height: '34vh',
    top: '35vh',
    left: '35vw',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  button: {
    width: '1rem',
  },
  row: {
    margin: '1rem 0',
  },
  inputRight: {
    textAlign: 'right',
  },
}));

export default useStyles;
