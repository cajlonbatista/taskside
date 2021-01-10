import React from 'react';

import { connect } from 'react-redux';

import { Paper } from '@material-ui/core';

import { FeedContainer } from './styles';

const Feed = ({ tasks, auth }) => {
  return (
    <FeedContainer>
      {
        tasks.map(task => (
          <Paper>
            <div>
              <p>{task.name}</p>
            </div>
          </Paper>
        ))
      }
    </FeedContainer>
  );
};

export default connect((state) => ({ tasks: state.tasks, auth: state.auth }))(Feed);