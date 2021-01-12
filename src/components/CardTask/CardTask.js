import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import { removeTask, putTask } from '../../store/actions/actions';

import { EditTwoTone, DoneOutlineTwoTone, DeleteTwoTone, MoreTwoTone, WarningTwoTone, Close, ViewComfyTwoTone, HourglassEmptyTwoTone, CheckCircleOutlineTwoTone } from '@material-ui/icons';
import { Button, Dialog, DialogContent, useMediaQuery, IconButton } from '@material-ui/core';
import { CardTaskContainer, DialogDelete, DialogConclude, DialogView } from './styles';
import { TaskCreate as TaskEdit } from '../../pages/Main/styles';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { useTheme } from '@material-ui/core/styles';

const CardTask = ({ tasks, task, auth, dispatch }) => {

  const [dialogConfirmDelete, setDialogConfirmDelete] = useState(false);
  const [dialogConfirmConclude, setDialogConfirmConclude] = useState(false);
  const [dialogEditTask, setDialogEditTask] = useState(false);
  const [dialogView, setDialogView] = useState(false);

  const [name, setName] = useState(task.name);
  const [conclusion, setConclusion] = useState(task.conclusion);
  const [delivery, setDelivery] = useState(task.delivery);
  const [status, setStatus] = useState(task.status);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onDelete = e => {
    dispatch(removeTask(task));
  }
  const onConclude = e => {
    e.preventDefault();
    setStatus('true');
    dispatch(putTask({
      id: task.id,
      name: task.name,
      user: task.user,
      conclusion: new Date().toLocaleDateString(),
      delivery: task.delivery,
      status: 'true',
    }));
    closeDialogConfirmConclude();
  }
  const onEdit = e => {
    e.preventDefault();
    dispatch(putTask({
      id: task.id,
      name,
      user: task.user,
      conclusion,
      delivery,
      status: task.status,
    }));
    closeDialogEdit();
  }

  const closeDialogConfirmDelete = e => {
    setDialogConfirmDelete(false);
  }
  const closeDialogConfirmConclude = e => {
    setDialogConfirmConclude(false);
  }
  const closeDialogEdit = e => {
    setDialogEditTask(false);
  }
  const closeDialogView = e => {
    setDialogView(false);
  }

  const viewDialog = (
    <Dialog fullScreen={fullScreen} open={dialogView} onClose={closeDialogView}>
      <DialogContent>
        <DialogView>
          <header>
            <IconButton onClick={closeDialogView}>
              <Close />
            </IconButton>
            {
              (task.status == 'false')
                ?
                <span>
                  <HourglassEmptyTwoTone />
                  Pending
                </span>
                :
                <div>
                  <CheckCircleOutlineTwoTone />
                  Completed - {task.conclusion}
                </div>
            }
          </header>
          <section>
            <p>{task.name}</p>
            {
              (task.status == 'false')
                ?
                <p>Delivery - {new Date(task.delivery).toLocaleDateString()}</p>
                :
                <span>Delivery - {new Date(task.delivery).toLocaleDateString()}</span>
            }
          </section>
        </DialogView>
      </DialogContent>
    </Dialog>
  );

  const deleteDialog = (
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
  );

  const confirmDialog = (
    <Dialog fullScreen={fullScreen} open={dialogConfirmConclude} onClose={closeDialogConfirmConclude}>
      <DialogContent>
        <DialogConclude>
          <header>
            <WarningTwoTone />
            <span>Do you really want to delete this task?</span>
          </header>
          <div>
            <Button onClick={e => setDialogConfirmConclude(false)}>Cancel</Button>
            <Button onClick={onConclude}>Confirm</Button>
          </div>
        </DialogConclude>
      </DialogContent>
    </Dialog>
  );


  const editDialog = (
    <Dialog fullScreen={fullScreen} open={dialogEditTask} onClose={closeDialogEdit}>
      <DialogContent>
        <TaskEdit onSubmit={onEdit}>
          <header>
            <IconButton onClick={closeDialogEdit}>
              <Close />
            </IconButton>
            <div>
              <h2>Edit Task</h2>
              <p>Fill in to edit your task.</p>
            </div>
          </header>
          <section>
            <div>
              <label htmlFor='name'>Nome</label>
              <textarea value={name} required onChange={e => setName(e.target.value)} name='name' type='text'></textarea>
            </div>
            <div>
              <label htmlFor='delivery'>Delivery</label>
              <input value={delivery} required onChange={e => setDelivery(e.target.value)} name='delivery' type='date' />
            </div>
            <div>
              <label htmlFor='conclusion'>Conclusion</label>
              <input value={conclusion} onChange={e => setConclusion(e.target.value)} name='conclusion' type='date' />
            </div>
          </section>
          <button>Save</button>
        </TaskEdit>
      </DialogContent>
    </Dialog>
  );

  return (
    <CardTaskContainer>
      <div>
        <p>{task.name}</p>
      </div>
      {
        editDialog
      }
      {
        deleteDialog
      }
      {
        confirmDialog
      }
      {
        viewDialog
      }
      <div>
        {
          (task.status == 'false')
            ?
            <Menu align='center' menuButton={
              <MenuButton>
                <MoreTwoTone />
              </MenuButton>
            }>
              <MenuItem onClick={e => setDialogConfirmConclude(true)}>
                <DoneOutlineTwoTone />
                Conclude
              </MenuItem>
              <MenuItem onClick={e => setDialogView(true)}>
                <ViewComfyTwoTone />
                View
              </MenuItem>
              <MenuItem onClick={e => setDialogEditTask(true)}>
                <EditTwoTone />
                Edit
              </MenuItem>
              <MenuItem onClick={e => setDialogConfirmDelete(true)}>
                <DeleteTwoTone />
                Delete
              </MenuItem>
            </Menu>
            :
            <Menu align='center' menuButton={
              <MenuButton>
                <MoreTwoTone />
              </MenuButton>
            }>
              <MenuItem onClick={e => setDialogView(true)}>
                <ViewComfyTwoTone />
                View
              </MenuItem>
              <MenuItem onClick={e => setDialogEditTask(true)}>
                <EditTwoTone />
                Edit
              </MenuItem>
              <MenuItem onClick={e => setDialogConfirmDelete(true)}>
                <DeleteTwoTone />
                Delete
              </MenuItem>
            </Menu>
        }
      </div>
    </CardTaskContainer>
  );
};

export default connect((state) => ({ tasks: state.tasks, auth: state.auth }))(CardTask);