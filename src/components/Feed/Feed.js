import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import CardTask from '../CardTask/CardTask';

import { FeedContainer } from './styles';

const Feed = ({ tasks, auth }) => {
  return (
    <FeedContainer>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {
            tasks.map(task => {
              if (task.user === auth.user.id) {
                return (
                  <div style={{ margin: 20 }} key={task.id}>
                    <CardTask task={task} />
                  </div>
                )
              } else {
                return <Fragment />
              }
            })
          }
        </Masonry>
      </ResponsiveMasonry>
    </FeedContainer>
  );
};

export default connect((state) => ({ tasks: state.tasks, auth: state.auth }))(Feed);