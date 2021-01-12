import React, { useState } from 'react';

import { AES, enc } from 'crypto-js';
import { connect } from 'react-redux';
import { toggleAuth } from '../../../store/actions/actions';

import { Dialog, DialogContent, IconButton, Snackbar, useMediaQuery, useTheme } from '@material-ui/core';
import { Close, EmailTwoTone, LockTwoTone, VisibilityOffTwoTone, VisibilityTwoTone } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Spin } from 'antd';

import { LoginContainer, LoginForm } from './styles';

const Login = ({ users, dispatch }) => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState('password');

  const [snackbarVerifyEmail, setSnackbarVerifyEmail] = useState(false);
  const [snackbarVerifyPassword, setSnackbarVerifyPassword] = useState(false);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeDialogLogin = e => {
    setLogin(false);
  }

  const closeSnackbarVerifyEmail = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarVerifyEmail(false);
  }

  const closeSnackbarVerifyPassword = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarVerifyPassword(false);
  }

  const onLogin = async e => {
    e.preventDefault();
    var dataProcess = {

    }
    if (users.length !== 0) {
      users.map(user => {
        if (user.email === email) {
          dataProcess = user;
          return '';
        } else {
          return '';
        }
      });
      if (dataProcess.email === undefined) {
        setSnackbarVerifyEmail(true);
      } else {
        if (AES.decrypt(dataProcess.password, process.env.REACT_APP_HASH).toString(enc.Utf8) === password) {
          setLoading(true);
          await dispatch(toggleAuth({
            user: dataProcess,
            logged: true,
          }))
          setLoading(false);
          setLogin(false);
        } else {
          setSnackbarVerifyPassword(true);
        }
      }
    } else {
      setSnackbarVerifyEmail(true);
    }
  }

  return (
    <LoginContainer>
      <span onClick={e => setLogin(true)}>Sign in</span>
      <Dialog fullScreen={fullScreen} open={login} onClose={closeDialogLogin}>
        <DialogContent>
          <Spin spinning={loading}>
            <LoginForm onSubmit={onLogin}>
              <header>
                <IconButton onClick={closeDialogLogin}>
                  <Close />
                </IconButton>
                <div>
                  <h2>Hello !</h2>
                  <p>Sign into your account here.</p>
                </div>
              </header>
              <section >
                <div>
                  <EmailTwoTone />
                  <input type='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} name='email' placeholder='Email' required />
                </div>
                <div>
                  <LockTwoTone />
                  <input type={passwordVisibility} value={password} onChange={e => setPassword(e.target.value)} autoComplete='off' name='password' placeholder='Password' required />
                  {
                    (password !== '')
                      ?
                      (passwordVisibility === 'password')
                        ?
                        <VisibilityTwoTone onClick={e => { setPasswordVisibility('text') }} />
                        :
                        <VisibilityOffTwoTone onClick={e => { setPasswordVisibility('password') }} />
                      :
                      <></>
                  }
                </div>
                <button>Sign in</button>
              </section>
            </LoginForm>
          </Spin>
        </DialogContent>

        {/* Snackbars */}

        <Snackbar open={snackbarVerifyEmail} autoHideDuration={3000} onClose={closeSnackbarVerifyEmail}>
          <Alert onClose={closeSnackbarVerifyEmail} severity='warning'>
            Email is not registered
        </Alert>
        </Snackbar>
        <Snackbar open={snackbarVerifyPassword} autoHideDuration={3000} onClose={closeSnackbarVerifyPassword}>
          <Alert onClose={closeSnackbarVerifyPassword} severity='warning'>
            The password is incorrect
        </Alert>
        </Snackbar>
      </Dialog>
    </LoginContainer>
  );
};

export default connect(state => ({ users: state.users }))(Login);