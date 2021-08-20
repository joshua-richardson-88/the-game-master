import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '25vw',
    height: '19vh',
    borderRadius: 6,
    top: '8vh',
    left: '72vw',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  row: {
    marginTop: '1rem',
  },
}));

export default useStyles;
