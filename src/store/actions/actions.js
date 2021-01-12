module.exports = {
  addUser(users) {
    return {
      type: 'ADD_USER',
      users,
    };
  },
  addTask(tasks) {
    return {
      type: 'ADD_TASK',
      tasks,
    };
  },
  toggleAuth(auth) {
    return {
      type: 'CHANGE_AUTH',
      auth
    }
  },
  removeTask(task) {
    return {
      type: 'REMOVE_TASK',
      task
    }
  },
  putTask(task) {
    return {
      type: 'PUT_TASK',
      task
    }
  }
}