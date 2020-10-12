import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { routerReducer } from 'react-router-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import indexReducer, { IndexReducerState} from './reducers'
import {INode} from 'src/types/task'

export interface ReduxState {
  indexReducer: IndexReducerState;
  // nodeList: INode[]
}

// const createStoreWithMdware = applyMiddleware(
//   thunkMiddleware
// )(createStore);


let middleware = applyMiddleware(thunkMiddleware);

const rootReducer = combineReducers<ReduxState>({
  indexReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
middleware = composeEnhancers(middleware);

const store = createStore(rootReducer, {}, middleware);
// // @ts-ignore
// const store = createStoreWithMdware(rootReducer, devToolsEnhancer({}));


export default store;
