import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleAuth } from '../../store/actions/actions';

import { ExitToAppTwoTone, ArrowDropDownTwoTone, AccountCircleTwoTone, SettingsTwoTone, InfoTwoTone, ContactlessTwoTone } from '@material-ui/icons';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import Register from '../Form/Register/Register';
import Login from '../Form/Login/Login';
import Inline from 'svg-inline-react';

import { HeaderContainer } from './styles';
import '@szhsin/react-menu/dist/index.css';

import { logo } from '../../global/assets/svg/logo';

const Header = ({ auth, dispatch }) => {

  const onLoggout = e => {
    dispatch(toggleAuth({}));
  }

  return (
    <HeaderContainer style={{ justifyContent: ((auth.logged === true) ? 'space-between' : 'space-evenly') }}>
      <Link to='/'>
        <Inline src={logo} />
        Taskside
      </Link>
      <div>
        {
          (auth.logged === true)
            ?
            <div>
              <article>
                <Link to='/contactus'>
                  <ContactlessTwoTone />
                  <span>Contact us</span>
                </Link>
                <Link to='/about'>
                  <InfoTwoTone />
                  <span>About</span>
                </Link>
              </article>
              <Menu align='center' menuButton={
                <MenuButton>
                  <AccountCircleTwoTone />
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