import React from 'react';

import Inline from 'svg-inline-react';

import { LandingContainer } from './styles';

import { landing } from '../../global/assets/svg/landing';

const Landing = props => {
  return (
    <LandingContainer>
      <header>
        <h1>Welcome</h1>
        <p>To the best aplication for your tasks</p>
      </header>
      <Inline src={landing}/>
    </LandingContainer>
  );
};

export default Landing;