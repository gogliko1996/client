import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk'; 
import createTodoreducer from '../../page/Home/redux/todoreducer'
import createUserSlice from '../../page/Auth/redux/userReducer'

const rootReducer = combineReducers({
  createUser: createUserSlice,
  todolist: createTodoreducer,
});


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewareEnhancer = applyMiddleware(thunk as ThunkMiddleware);

const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, composedEnhancers);




