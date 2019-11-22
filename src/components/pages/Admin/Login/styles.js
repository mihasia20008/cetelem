import {makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  buttonWrapper: {
    position: 'relative',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  buttonProgress: {
    color: theme.palette.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  snackbar: {
    backgroundColor: theme.palette.error.dark,
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  snackbarClose: {
    fontSize: 20,
  }
}));
