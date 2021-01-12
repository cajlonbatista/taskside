import React, { useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import validatorCPF from 'validar-cpf';
import { AES } from 'crypto-js';
import { addUser, toggleAuth } from '../../../store/actions/actions';
import { removeMaskCEP, removeMaskCPF } from '../../../utils/removeMask';

import {
  Close,
  AccountCircleTwoTone,
  EmailTwoTone,
  MyLocationTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
  FingerprintTwoTone,
  LockTwoTone,
  RoomTwoTone,
  DateRangeTwoTone
} from '@material-ui/icons';
import { Dialog, DialogContent, IconButton, Snackbar, Tooltip, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import { Alert } from '@material-ui/lab';
import { Spin } from 'antd';


import { RegisterContainer, RegisterForm } from './styles';

const Notification = props => {
  return <Alert style={{ fontFamily: 'Inter, sans-serif' }} elevation={10} variant='filled' {...props} />;
}

const Register = ({ users, dispatch }) => {
  const [register, setRegister] = useState(false);

  const [snackbarVerifyBirth, setSnackBarVerifyBirth] = useState(false);
  const [snackbarVerifyCep, setSnackBarVerifyCep] = useState(false);
  const [snackbarVerifyEmail, setSnackBarVerifyEmail] = useState(false);
  const [snackbarVerifyCpf, setSnakBarVerifyCpf] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState('password');

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState();
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [birth, setBirth] = useState('');
  const [cpf, setCpf] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const closeDialogRegister = e => {
    setRegister(false);
  }

  const closeSnackbarVerifyBith = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarVerifyBirth(false);
  }
  const closeSnackbarVerifyCep = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarVerifyCep(false);
  }
  const closeSnackbarVerifyEmail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarVerifyEmail(false);
  }
  const closeSnackBarVerifyCpf = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnakBarVerifyCpf(false);
  }

  const getCepAddress = async () => {
    setLoading(true);
    const newCEP = removeMaskCEP(cep);

    if (newCEP.length < 8) {
      setSnackBarVerifyCep(true);
      setLoading(false);
      setAddress('');
    } else {
      axios.get(`https://cep.awesomeapi.com.br/json/${newCEP}`).then(res => {
        const { address, district } = res.data;
        setAddress(`${address}, ${district}`);
        setLoading(false);
        return true;
      }).catch(err => {
        setLoading(false);
        setAddress('');
        setSnackBarVerifyCep(true);
        return false;
      })
    }
  }

  const onRegister = async e => {
    e.preventDefault();
    const birthYear = new Date(birth).getFullYear();
    const nowYear = new Date().getFullYear();
    if (users.length !== 0) {
      for (const user of users) {
        if (user.email !== email || users.length === 0) { // !User already exists?
          if ((nowYear - birthYear) <= 12) { // !User is under 12 years old ?  
            setSnackBarVerifyBirth(true);
          } else if (!validatorCPF(removeMaskCPF(cpf))) { // !Is the CPF valid? 
            setSnakBarVerifyCpf(true);
          } else if (!getCepAddress()) {
            setSnackBarVerifyCep(true);
          } else {
            setLoading(true);
            const user = {
              id: Math.random(),
              name,
              email,
              password: AES.encrypt(password, process.env.REACT_APP_HASH).toString(),
              birth,
              cep,
              cpf,
              address,
              number
            };
            await dispatch(addUser(user));
            await dispatch(toggleAuth({
              user,
              logged: true,
            }))
            setLoading(false);
            setRegister(false);
          }
        } else {
          setSnackBarVerifyEmail(true);
        }
      }
    } else {
      if ((nowYear - birthYear) <= 12) {// !User is under 12 years old ?  
        setSnackBarVerifyBirth(true);
      } else if (!validatorCPF(removeMaskCPF(cpf))) { // !Is the CPF valid? 
        setSnakBarVerifyCpf(true);
      } else if (!getCepAddress()) {
        setSnackBarVerifyCep(true);
      } else {
        setLoading(true);
        const user = {
          id: Math.random(),
          name,
          email,
          password: AES.encrypt(password, process.env.REACT_APP_HASH).toString(),
          birth,
          cep,
          cpf,
          address,
          number
        };
        await dispatch(addUser(user));
        await dispatch(toggleAuth({
          user,
          logged: true,
        }))
        setLoading(false);
        setRegister(false);
      }
    }
  }


  return (
    <RegisterContainer>
      <span onClick={e => setRegister(true)}>Sign up</span>
      <Dialog style={{ zIndex: 11 }} fullScreen={fullScreen} open={register} onClose={closeDialogRegister}>
        <DialogContent>
          <Spin size='large' spinning={loading}>
            <RegisterForm onSubmit={onRegister}>
              <header>
                <IconButton onClick={closeDialogRegister}>
                  <Close />
                </IconButton>
                <h2>Sign up </h2>
              </header>
              <section>
                <div>
                  <AccountCircleTwoTone />
                  <Tooltip title='Name'>
                    <input type='text' autoComplete='off' value={name} onChange={e => setName(e.target.value)} name='name' placeholder='Full Name' required />
                  </Tooltip>
                </div>
                <div>
                  <EmailTwoTone />
                  <Tooltip title='Email' arrow>
                    <input type='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} name='email' placeholder='Email' required />
                  </Tooltip>
                </div>
                <article>
                  <div>
                    <DateRangeTwoTone />
                    <Tooltip title='Date of birth' arrow>
                      <input type='date' autoComplete='off' value={birth} onChange={e => {
                        setBirth(e.target.value);
                      }} name='bith' placeholder='Birthday' required />
                    </Tooltip>
                  </div>
                  <div>
                    <FingerprintTwoTone />
                    <Tooltip title='CPF' arrow>
                      <InputMask type='text' autoComplete='off' value={cpf} onChange={e => setCpf(e.target.value)} name='cpf' placeholder='CPF' mask='999.999.999-99' maskChar=' ' />
                    </Tooltip>
                  </div>
                </article>
                <div>
                  <LockTwoTone />
                  <Tooltip title='Password' arrow>
                    <input type={passwordVisibility} value={password} onChange={e => setPassword(e.target.value)} autoComplete='off' name='password' placeholder='Password' required />
                  </Tooltip>
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
                <article>
                  <div>
                    <MyLocationTwoTone />
                    <Tooltip title='CEP' arrow>
                      <InputMask type='text' autoComplete='off' onBlur={getCepAddress} value={cep} onChange={e => setCep(e.target.value)} name='cep' placeholder='CEP' mask='99999-999' maskChar=' ' />
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title='Number' arrow>
                      <input type='number' autoComplete='off' value={number} onChange={e => setNumber(e.target.value)} placeholder='Number' />
                    </Tooltip>
                  </div>
                </article>
                <div>
                  <RoomTwoTone />
                  <Tooltip title='Address' arrow>
                    <input type='text' autoComplete='off' value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
                  </Tooltip>
                </div>
              </section>
              <button>Create your account</button>
            </RegisterForm>
          </Spin>

          {/* Snackbars */}

          <Snackbar open={snackbarVerifyBirth} autoHideDuration={3000} onClose={closeSnackbarVerifyBith}>
            <Notification onClose={closeSnackbarVerifyBith} severity='warning'>
              Only users over 12 years old can register
            </Notification>
          </Snackbar>
          <Snackbar open={snackbarVerifyEmail} autoHideDuration={3000} onClose={closeSnackbarVerifyEmail}>
            <Notification onClose={closeSnackbarVerifyEmail} severity='warning'>
              Email is already registered
            </Notification>
          </Snackbar>
          <Snackbar open={snackbarVerifyCep} autoHideDuration={3000} onClose={closeSnackbarVerifyCep}>
            <Notification onClose={closeSnackbarVerifyCep} severity='error'>
              Zip Code invalid
            </Notification>
          </Snackbar>
          <Snackbar open={snackbarVerifyCpf} autoHideDuration={3000} onClose={closeSnackBarVerifyCpf}>
            <Notification onClose={closeSnackBarVerifyCpf} severity='error'>
              CPF is invalid
            </Notification>
          </Snackbar>
        </DialogContent>
      </Dialog>
    </RegisterContainer>
  );
};

export default connect(state => ({ users: state.users }))(Register);