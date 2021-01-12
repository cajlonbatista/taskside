const INITIAL = {
  users: [

  ],
  tasks: [

  ],
  auth: {
    user: {},
    logged: false,
  }
};

export const reducer = (state = INITIAL, action) => {
  if (action.type === 'ADD_USER') {
    return {
      ...state, users: [...state.users, action.users]
    }
  } else if (action.type === 'ADD_TASK') {
    return {
      ...state, tasks: [...state.tasks, action.tasks]
    }
  } else if (action.type === 'CHANGE_AUTH') {
    return {
      ...state, auth: action.auth
    }
  } else if (action.type === 'REMOVE_TASK') {
    const position = state.tasks.indexOf(action.task);
    const cache = [...state.tasks];
    cache.splice(position, 1)
    if (position > -1) {
      return {
        ...state, tasks: cache
      }
    }
  } else if (action.type === 'PUT_TASK') {
    var cache = [...state.tasks];
    for (var i = 0; i < cache.length; i++){
      if (cache[i].id === action.task.id) {
        cache.splice(i, 1, action.task);
      }
    } 
    console.log(i);
    return {
      ...state, tasks: cache
    }
  }
  return state;
}