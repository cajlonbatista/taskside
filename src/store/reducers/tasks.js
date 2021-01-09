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
  if (action.type === 'SET_REFRESH') {
    return {
      ...state, refresh: action.refresh,
    }
  }
  return state;
}