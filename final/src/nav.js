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
import {authContext} from './contexts/auth.js'
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
import { withRouter } from "react-router";

import QA from './pages/QA';
import Favs from './pages/Favs';
import Resources from './pages/Resources';

function Nav(props) {
    const classes = useStyles();

    const [modalStyle] = React.useState(modalStyles);
    const [formValues, setFormValue] = React.useState({
      username: '',
      email: '',
      password: '',
    });
    const authCtx2 = React.useContext(authContext)
    const [authCtx, login, logout] = authCtx2 // eslint-disable-line no-unused-vars
    const [open, setOpen] = React.useState(props.loginFormOpen);

    function btnClicked(){
        if (authCtx.isLoggedIn){
            logout()
        } else {
            setOpen(true)
        }
    }

    React.useEffect(() => {
        setOpen(!authCtx.isLoggedIn)
    }, [authCtx.isLoggedIn])


  return (
    <nav className={classes.root}>
        <Router>
            <AppBar position="static">
              <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {/* <MenuIcon /> */}
                </IconButton>

                <div className={classes.left}>
                    <Typography variant="h1" className={classes.title}>
                      WordPress Q&A
                    </Typography>


                        <nav id='mainNav'>
                          <ul>
                            <li><Link to="/">All Q&As</Link></li>
                            <li><Link to="/favs">Favorites</Link></li>
                            <li><Link to="/resources">More Resources</Link></li>
                          </ul>
                        </nav>
                </div>

                <Button color="inherit" onClick={btnClicked}>{authCtx.isLoggedIn ? 'Logout' : 'Login/Signup'}</Button>
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
        <Switch>
          <Route exact  path="/resources" component={withRouter(Resources)} />
          <Route exact  path="/favs" component={withRouter(Favs)} />
          <Route exact  path="/" component={withRouter(QA)} />
        </Switch>
    </Router>
    </nav>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  left: {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
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

export default Nav;
