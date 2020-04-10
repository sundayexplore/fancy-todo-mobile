import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { userReducer, todoReducer } from '../reducers';

const reducers = combineReducers({
  userReducer,
  todoReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
