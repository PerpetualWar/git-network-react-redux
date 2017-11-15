import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import *  as reducers from './reducers/reducers';

let reducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, {}, composeEnhancers(
  applyMiddleware(thunk)));

// console.log(store.getState());

// store.dispatch(addUserAsync('PerpetualWar'))
// store.dispatch(addUserAsync('dhh'))
// store.dispatch(addReposAsync('PerpetualWar'))
// store.dispatch(addCommitsAsync('PerpetualWar', 'git-network'))
// store.dispatch(addReposAsync('dhh'))
// store.dispatch(addReposAsync('vue'))