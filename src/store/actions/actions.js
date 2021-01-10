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
}