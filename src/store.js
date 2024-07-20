import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import tasksReducer from './Components/store/tasksReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});
const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;