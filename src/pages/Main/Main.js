import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addTask } from '../../store/actions/actions';

import { Dialog, Fab, DialogContent, IconButton, useMediaQuery } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';

import Header from '../../components/Header/Header';
import Feed from '../../components/Feed/Feed';
import Landing from '../Landing/Landing';

import { ThemeProvider, useTheme } from '@material-ui/core/styles';
import { addTaskButton } from '../../global/themes/themes';
import { MainContainer, TaskCreate } from './styles';

const Main = ({ auth, dispatch }) => {
  const [dialogCreateTask, setDialogCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [name, setName] = useState('');
  const [delivery, setDelivery] = useState('');
  const [conclusion, setConclusion] = useState('');

  const onCloseDialogCreateTask = () => {
    setDialogCreateTask(false);
  }

  const createTask = async e => {
    e.preventDefault();
    setLoading(true);
    await dispatch(addTask({
      id: Math.random(),
      user: auth.user.id,
      name,
      delivery,
      conclusion,
      status: 'false', // Finished or no ?
    }));
    setLoading(false);
    onCloseDialogCreateTask();
    setName('');
    setDelivery('');
    setConclusion('');
  }

  // Clear state when logout occurs
  useEffect(() => {
    return async () => {
      if (auth.logged === false) {
        setName('');
        setDelivery('');
        setConclusion('');
      }
    }
  }, [auth.logged]);

  return (
    <MainContainer>
      <Header />
      {
        (auth.logged === true)
          ?
          <main>
            <Dialog fullScreen={fullScreen} open={dialogCreateTask} onClose={onCloseDialogCreateTask} >
              <DialogContent>
                <TaskCreate onSubmit={createTask}>
                  <header>
                    <IconButton onClick={onCloseDialogCreateTask}>
                      <Close />
                    </IconButton>
                    <div>
                      <h2>New Task</h2>
                      <p>Fill in to create your task.</p>
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
                  <button>Add</button>
                </TaskCreate>
              </DialogContent>
            </Dialog>

            {/* View tasks*/}
            <Feed />

            <footer onClick={e => setDialogCreateTask(true)}>
              <ThemeProvider theme={addTaskButton}>
                <Fab color='primary'>
                  <Add />
                </Fab>
              </ThemeProvider>
            </footer>
          </main>
          :
          <Landing />
      }
    </MainContainer>
  );
};

export default connect(state => ({ auth: state.auth }))(Main);