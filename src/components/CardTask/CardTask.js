import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { removeTask } from '../../store/actions/actions';

import { EditTwoTone, DoneOutlineTwoTone, DeleteTwoTone, MoreTwoTone, WarningTwoTone } from '@material-ui/icons';
import { Button, Dialog, DialogContent, useMediaQuery } from '@material-ui/core';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { useTheme } from '@material-ui/core/styles';
import { CardTaskContainer, DialogDelete } from './styles';

const CardTask = ({ tasks, task, auth, dispatch }) => {

  const [dialogConfirmDelete, setDialogConfirmDelete] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onDelete = e => {
    for (const tsk of tasks) {
      if (tsk.id === task.id) {
        dispatch(removeTask(task));
      }
    }
  }

  const closeDialogConfirmDelete = e => {
    setDialogConfirmDelete(false);
  }

  return (
    <CardTaskContainer>
      <div>
        <p>{task.name}</p>
      </div>
      <Dialog fullScreen={fullScreen} open={dialogConfirmDelete} onClose={closeDialogConfirmDelete}>
        <DialogContent>
          <DialogDelete>
            <header>
              <WarningTwoTone />
              <span>Do you really want to delete this task?</span>
            </header>
            <div>
              <Button onClick={e => setDialogConfirmDelete(false)}>Cancel</Button>
              <Button onClick={onDelete}>Confirm</Button>
            </div>
          </DialogDelete>
        </DialogContent>
      </Dialog>
      <div>
        <Menu align='center' menuButton={
          <MenuButton>
            <MoreTwoTone />
          </MenuButton>
        }>
          {
            (task.status === false)
              ?
              <MenuItem>
                <DoneOutlineTwoTone />
                Conclude
              </MenuItem>
              :
              <Fragment />
          }
          <MenuItem>
            <EditTwoTone />
              Edit
            </MenuItem>
          <MenuItem onClick={e => setDialogConfirmDelete(true)}>
            <DeleteTwoTone />
            Delete
          </MenuItem>
        </Menu>
      </div>
    </CardTaskContainer>
  );
};

export default connect((state) => ({ tasks: state.tasks, auth: state.auth }))(CardTask);