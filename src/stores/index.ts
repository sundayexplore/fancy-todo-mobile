import { createStore, combineReducers } from 'redux';

import { userReducer as user, todoReducer as todo } from '../reducers';

const reducers = combineReducers({
  user,
  todo,
});

const store = createStore(reducers);

export default store;
