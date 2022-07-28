const INITIAL_STATE = {
  email: '',
  password: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.loginData;
  default:
    return state;
  }
}

export default userReducer;
