import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
