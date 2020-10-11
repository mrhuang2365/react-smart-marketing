import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { routerReducer } from 'react-router-redux';

import indexReducer, {nodeList, IndexReducerState} from './reducers'
import {INode} from 'src/types/task'

export interface ReduxState {
  indexReducer: IndexReducerState;
  nodeList: INode[]
}

let middleware = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers<ReduxState>({
  indexReducer,
  nodeList,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleware = composeEnhancers(middleware);

const store = createStore(rootReducer, {}, middleware);

export default store;
