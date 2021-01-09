import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';

import Inline from 'svg-inline-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Dialog, DialogContent, useMediaQuery } from '@material-ui/core';


import { HeaderContainer } from './styles';

import { logo } from '../../global/assets/svg/logo';
import Login from '../Form/Login/Login';


const Header = ({ auth, dispatch }) => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <HeaderContainer>
      <Link>
        <Inline src={logo} />
      </Link>
      <div>
        {
          (auth.logged === true)
            ?
            <span>{auth.user.name}</span>
            :
            <Fragment>
              <div>
                <span>Sign in</span>
                <Dialog fullScreen={fullScreen} open={login} onClose={e => setLogin(true)}>
            
                </Dialog>
              </div>
              <div>
                <span>Sign up</span>
                <Dialog fullScreen={fullScreen} open={register} onClose={e => setRegister(false)}>
                  <DialogContent>
                    <Login/>
                  </DialogContent>
                </Dialog>
              </div>
            </Fragment>
        }
      </div>
    </HeaderContainer>
  );
};

export default connect(state => ({ auth: state.auth }))(Header);