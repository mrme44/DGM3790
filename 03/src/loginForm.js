import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import authFormContext from './contexts/authForm.js';
import {validateName, validatePassword} from './authFormValidators.js';
import {verifyPasswd} from './auth';
import {authContext} from './contexts/auth.js';

const useStyles = makeStyles((theme) => ({
  btnRight: {
      float: 'right',
  }
}));

function LoginForm() {
    const classes = useStyles();

    const [formErrors, setFormErrors] = React.useState({
      username: {has_error: false, error_msg: ''},
      password: {has_error: false, error_msg: ''},
    });

    const [ctx] = React.useContext(authFormContext)
    React.useEffect(() => {
        setFormErrors({
            username: validateName(ctx.username)
                ? {has_error: false, error_msg: ''}
                : {has_error: true, error_msg: 'Username cannot contain spaces'},
            password: validatePassword(ctx.password) || ctx.password === ''
                ? {has_error: false, error_msg: ''}
                : {has_error: true, error_msg: 'Password must contain at least 5 characters'},
        });
    }, [ctx]);

    const [showPasswd, setShowPassed] = React.useState(false);

    const handleClickShowPassword = () => {
      setShowPassed(!showPasswd);
    };

    let [_, login] = React.useContext(authContext) // eslint-disable-line no-unused-vars

    function formSubmit(ev){
        ev.preventDefault()
        if ( ! validateName(ctx.username) || ! validatePassword(ctx.password) ){
            console.log('incorrect credentials')
            alert('Username or Password was invalid')
            return false
        }
        // We'll just pretend this verification is happening on the server
        let creds = localStorage.getItem('auth')
        if (! creds){
            alert('User does not exist')
            return false
        }
        creds = JSON.parse(creds)
        verifyPasswd(ctx.username, ctx.password, creds['p']).then( (success) => {
            if (success){
                login(creds['u'], creds['e'])
            } else {
                alert('Login failed')
            }
        } )
    }

  return (
      <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit}>

        <authFormContext.Consumer>
            { ([ctx, ctxUpdate]) =>
                <TextField fullWidth margin='normal' id="username" label="Username" variant="filled" required
                    helperText={formErrors.username.error_msg} error={formErrors.username.has_error} value={ctx.username}
                    onChange={(ev) => { ctxUpdate({ ...ctx, 'username': ev.target.value }) }} />
            }
        </authFormContext.Consumer>
        <authFormContext.Consumer>
            { ([ctx, ctxUpdate]) =>
                <FormControl fullWidth={true} variant="filled" margin='normal'>
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <FilledInput fullWidth={true} id="password" label="password" type={showPasswd ? 'text' : 'password'} required
                        endAdornment={
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                  {showPasswd ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                        value={ctx.password}
                        onChange={(ev) => { ctxUpdate({ ...ctx, 'password': ev.target.value }) }}
                    />
                    <FormHelperText id="outlined-weight-helper-text" error={formErrors.password.has_error}>{formErrors.password.has_error && formErrors.password.error_msg}</FormHelperText>
                </FormControl>
            }

        </authFormContext.Consumer>
        <Button className={classes.btnRight} variant="contained" color="primary" type='submit'>Submit</Button>
      </form>
  );
}

export default LoginForm;
