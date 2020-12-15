import React, { useState, useEffect, useContext } from 'react';
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
import {validateName, validateEmail, validatePassword} from './authFormValidators.js';
import {hashPassword} from './auth';

const useStyles = makeStyles((theme) => ({
  btnRight: {
      float: 'right',
  }
}));



function SignupForm() {
    const classes = useStyles();
    const [ctx, ctxUpdate] = useContext(authFormContext)

    const [errorStates, setErrorState] = useState({
      username_has_err: false,
      email_has_err: false,
      password_has_err: false,
    });

    const [errorMsgs, setErrorMsg] = useState({
      username_msg: '',
      email_msg: '',
      password_msg: '',
    });

    const [showPasswd, setShowPassed] = useState(false);

    useEffect(() => {
        const newErrorState = {
          username_has_err: false,
          email_has_err: false,
          password_has_err: false,
        }
        const newErrorMsg = {
          username_msg: '',
          email_msg: '',
          password_msg: '',
        }
        if (! validateName(ctx.username)){
            newErrorState.username_has_err = true
            newErrorMsg.username_msg = 'Username cannot contain spaces'
        }
        if (! validateEmail(ctx.email) && ctx.email !== ''){
            newErrorState.email_has_err = true
            newErrorMsg.email_msg = 'Invalid email'
        }
        if (! validatePassword(ctx.password)){
            if (ctx.password !== '')
                newErrorState.password_has_err = true
            newErrorMsg.password_msg = 'Password must contain at least 5 characters'
        }
        setErrorState(newErrorState)
        setErrorMsg(newErrorMsg)
    }, [ctx]);

    const fieldChange = (field) => (ev) => {
      ctxUpdate({ ...ctx, [field]: ev.target.value });
    };

    function formSubmit(ev){
        ev.preventDefault()
        if ( ! validateName(ctx.username) || ! validateEmail(ctx.email) || ! validatePassword(ctx.password) ){
            console.log('form validation failed')
            alert('Some fields were not filled out correctly')
            return false
        }
        hashPassword(ctx.username, ctx.password).then( (hashed_passwd) => {
            localStorage.setItem( 'auth', JSON.stringify({'u':ctx.username, 'e':ctx.email, 'p':hashed_passwd}) )
            alert('User added. You may login as this user now.')
        } )
    }

  return (
      <form className={classes.root} noValidate autoComplete="off" onSubmit={formSubmit}>

        <TextField fullWidth margin='normal' id="username" label="Username" variant="filled" required
            helperText={errorMsgs.username_msg} error={errorStates.username_has_err} value={ctx.username}
            onChange={fieldChange('username')} />

        <TextField fullWidth margin='normal' id="email" label="Email" type='email' variant="filled" required
            helperText={errorMsgs.email_msg} error={errorStates.email_has_err} value={ctx.email}
            onChange={fieldChange('email')} />
        <FormControl fullWidth={true} variant="filled" margin='normal'>
            <InputLabel htmlFor="password" required>Password</InputLabel>
            <FilledInput fullWidth={true} id="password" label="password" type={showPasswd ? 'text' : 'password'} required
                endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => setShowPassed(!showPasswd)}>
                          {showPasswd ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                value={ctx.password}
                onChange={fieldChange('password')}
            />
            <FormHelperText id="outlined-weight-helper-text" error={errorStates.password_has_err}>{errorStates.password_has_err && errorMsgs.password_msg}</FormHelperText>
        </FormControl>
        <Button className={classes.btnRight} variant="contained" color="primary" type="submit">Submit</Button>
      </form>
  );
}

export default SignupForm;
