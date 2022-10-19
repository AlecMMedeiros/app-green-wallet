const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  actualId: 0,
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES_NAMES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_DATA':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'EDIT_DATA':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload[0].id,
      toBeEdited: action.payload,
    };
  case 'ALTER_DATA':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editor: false,
      toBeEdited: 0,
    };
  case 'SET_ID':
    return {
      ...state,
      actualId: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
