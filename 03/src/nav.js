import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';
import AuthForm from './AuthForm';
import './nav.css';
import authFormContext from './contexts/authForm.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const modalStyles = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

function Nav() {
    const classes = useStyles();

    const [modalStyle] = React.useState(modalStyles);
    const [open, setOpen] = React.useState(true);
    const [formValues, setFormValue] = React.useState({
      username: '',
      email: '',
      password: '',
    });

  return (
    <nav className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h1" className={classes.title}>
              The Species of Star Wars
            </Typography>
            <Button color="inherit" onClick={() => setOpen(true)}>Login/Signup</Button>
            <authFormContext.Provider value={[formValues, setFormValue]}>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                <div style={modalStyle} className={classes.paper}>
                  <AuthForm />
                </div>
                </Modal>
            </authFormContext.Provider>
          </Toolbar>
        </AppBar>
    </nav>
  );
}

export default Nav;
