import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addTask } from '../../store/actions/actions';

import { Dialog, Fab, DialogContent, IconButton } from '@material-ui/core';
import Header from '../../components/Header/Header';
import { Add, Close } from '@material-ui/icons';

import { ThemeProvider } from '@material-ui/core/styles';
import { addTaskButton } from '../../global/themes/themes';
import { MainContainer, TaskCreate } from './styles';
import Feed from '../../components/Feed/Feed';

const Main = ({ auth, dispatch }) => {
  const [dialogCreateTask, setDialogCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);

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
      user: auth.user.id,
      name,
      delivery,
      conclusion,
      status: false, // Finished or no ?
    }));
    setLoading(false);
    onCloseDialogCreateTask();
  }

  // Clear state when logout occurs
  useEffect(() => {
    return async() => {
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
            <Dialog open={dialogCreateTask} onClose={onCloseDialogCreateTask} >
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
                      <input value={name} required onChange={e => setName(e.target.value)} name='name' type='text' />
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
          <></>
      }
    </MainContainer>
  );
};

export default connect(state => ({ auth: state.auth }))(Main);