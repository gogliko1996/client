import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk'; 
import  createUserSlice  from '../reducers/userReducer';

const rootReducer = combineReducers({
  createUser: createUserSlice
});


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewareEnhancer = applyMiddleware(thunk as ThunkMiddleware);

const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export const store = createStore(rootReducer, composedEnhancers);




