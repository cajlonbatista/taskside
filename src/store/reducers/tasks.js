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
      ...state, users : [...state.users, action.users]
    }
  } else if(action.type === 'ADD_TASK') {
    return {
      ...state, tasks: [...state.tasks, action.tasks]
    }
  } else  if (action.type === 'CHANGE_AUTH') {
    return {
      ...state, auth: action.auth
    }
  }
  return state;
}