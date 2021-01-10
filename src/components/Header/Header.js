import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import Inline from 'svg-inline-react';
import { Link } from 'react-router-dom';

import { ExitToAppTwoTone, ArrowDropDownTwoTone, AccountCircleTwoTone, SettingsTwoTone } from '@material-ui/icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import Login from '../Form/Login/Login';
import Register from '../Form/Register/Register';

import { toggleAuth } from '../../store/actions/actions';

import { HeaderContainer } from './styles';
import '@szhsin/react-menu/dist/index.css';

import { logo } from '../../global/assets/svg/logo';


const Header = ({ auth, dispatch }) => {

  const onLoggout = e => {
    dispatch(toggleAuth({}));
  }

  return (
    <HeaderContainer style={{ justifyContent: ((auth.logged === true) ? 'space-between' : 'space-between') }}>
      <Link to='/'>
        <Inline src={logo} />
      </Link>
      <div>
        {
          (auth.logged === true)
            ?
            <div>
              <Menu align='center' menuButton={
                <MenuButton>
                  <p>{auth.user.name}</p>
                  <ArrowDropDownTwoTone />
                </MenuButton>
              }>
                <MenuItem>
                  <AccountCircleTwoTone />
                  My account
                </MenuItem>
                <MenuItem>
                  <SettingsTwoTone />
                  Settings
                </MenuItem>
                <MenuItem onClick={onLoggout}>
                  <ExitToAppTwoTone />
                  Loggout
                </MenuItem>
              </Menu>
            </div>
            :
            <Fragment>
              <Login />
              <Register />
            </Fragment>
        }
      </div>
    </HeaderContainer>
  );
};

export default connect(state => ({ auth: state.auth }))(Header);