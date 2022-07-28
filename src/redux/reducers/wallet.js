const INITIAL_STATE = {
  wallet: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_SAVE':
    return state.walletDataSaved;
  default:
    return state;
  }
};

export default walletReducer;
