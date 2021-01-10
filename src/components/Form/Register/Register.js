import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { addUser, toggleAuth } from '../../../store/actions/actions';

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
import { Dialog, DialogContent, IconButton, Snackbar, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import { Alert } from '@material-ui/lab';
import { Spin } from 'antd';

import { RegisterContainer, RegisterForm } from './styles';

function Notification(props) {
  return <Alert elevation={40} variant='filled' {...props} />;
}

const Register = ({ users, dispatch }) => {
  const [register, setRegister] = useState(false);

  const [snackbarVerifyBirth, setSnackBarVerifyBirth] = useState(false);
  const [snackbarVerifyCep, setSnackBarVerifyCep] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState('password');
  const [simuletedBirth, setSimuletedBirth] = useState('text');

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

  const getCepAddress = async () => {
    setLoading(true);
    var cepla = '';
    for (const i of cep) {
      if (i !== '-') {
        cepla += i;
      }
    }
    axios.get(`https://cep.awesomeapi.com.br/json/${cepla}`).then(res => {
      const { address, district } = res.data;
      setAddress(`${address}, ${district}`);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setAddress('');
      setSnackBarVerifyCep(true);
    })
  }

  const onRegister = async e => {
    e.preventDefault();
    const birthYear = new Date(birth).getFullYear();
    const nowYear = new Date().getFullYear();
    if ((nowYear - birthYear) <= 12) {
      setSnackBarVerifyBirth(true);
    } else if (address === '' || address === 'Looking for an address ...' | cep.length !== 8) {
      setSnackBarVerifyCep(true);
    } else {
      setLoading(true);
      const user = {
        id: Math.random(),
        name,
        email,
        password,
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


  return (
    <RegisterContainer>
      <span onClick={e => setRegister(true)}>Sign up</span>
      <Dialog style={{ zIndex: 11}} fullScreen={fullScreen} open={register} onClose={closeDialogRegister}>
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
                  <input type='text' autoComplete='off' value={name} onChange={e => setName(e.target.value)} name='name' placeholder='Full Name' required />
                </div>
                <div>
                  <EmailTwoTone />
                  <input type='email' autoComplete='off' value={email} onChange={e => setEmail(e.target.value)} name='email' placeholder='Email' required />
                </div>
                <article>
                  <div>
                    <DateRangeTwoTone />
                    <input type={simuletedBirth} autoComplete='off' onBlur={e => {
                      (e.target.value === '') ? setSimuletedBirth('text') : setSimuletedBirth('date');
                    }} onFocus={e => setSimuletedBirth('date')} value={birth} onChange={e => {
                      setBirth(e.target.value);
                    }} name='bith' placeholder='Birthday' required />
                  </div>
                  <div>
                    <FingerprintTwoTone />
                    <InputMask type='text' autoComplete='off' value={cpf} onChange={e => setCpf(e.target.value)} name='cpf' placeholder='CPF' mask='999.999.999-99' maskChar=' ' />
                  </div>
                </article>
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
                <article>
                  <div>
                    <MyLocationTwoTone />
                    <InputMask type='text' autoComplete='off' onBlur={getCepAddress} value={cep} onChange={e => setCep(e.target.value)} name='cep' placeholder='CEP' mask='99999-999' maskChar=' ' />
                  </div>
                  <div>
                    <input type='number' autoComplete='off' value={number} onChange={e => setNumber(e.target.value)} placeholder='Number' />
                  </div>
                </article>
                <div>
                  <RoomTwoTone />
                  <input type='text' autoComplete='off' value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
                </div>
                <footer>
                  <button>Create your account</button>
                </footer>
              </section>
            </RegisterForm>
          </Spin>
        </DialogContent>
      </Dialog>

      {/* Snackbars */}

      <Snackbar open={snackbarVerifyBirth} autoHideDuration={3000} onClose={closeSnackbarVerifyBith}>
        <Notification onClose={closeSnackbarVerifyBith} severity='warning'>
          Only users over eighteen years old can register
        </Notification>
      </Snackbar>
      <Snackbar anchorOrigin={{ horizontal: 'right', vertical: 'top'}} open={snackbarVerifyCep} autoHideDuration={3000} onClose={closeSnackbarVerifyCep}>
        <Notification onClose={closeSnackbarVerifyCep} severity='error'>
          Zip Code invalid
        </Notification>
      </Snackbar>
    </RegisterContainer>
  );
};

export default connect(state => ({ users: state.users }))(Register);