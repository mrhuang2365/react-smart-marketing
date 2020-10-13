import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import indexReducer, { IndexReducerState} from './reducers'

export interface ReduxState {
  indexReducer: IndexReducerState;
}

let middleware = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers<ReduxState>({
  indexReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleware = composeEnhancers(middleware);

const store = createStore(rootReducer, {}, middleware);
// // @ts-ignore


export default store;
