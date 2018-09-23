import { createReducer } from 'helpers/saga'
import * as types from './types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export const authentication =  createReducer(initialState, {
  [types.LOGIN_ASYNC.PENDING](state, action) {
    return {
      loggingIn: true,
      user: action.user
    };
  },
  [types.LOGIN_ASYNC.SUCCESS](state, action) {
    return {
      loggedIn: true,
      user: action.user
    };
  },
  [types.LOGIN_ASYNC.ERROR](state, action) {
    return {
      error: action.error
    };
  },
  [types.CURRENT_USER_ASYNC.PENDING](state, action) {
    return state;
  },
  [types.CURRENT_USER_ASYNC.SUCCESS](state, action) {
    return Object.assign({}, state,
    {
      currentUser: action.user
    });
  },
  [types.CURRENT_USER_ASYNC.ERROR](state, action) {
    return Object.assign({}, state,
    {
      error: action.error
    });
  },
  [types.LOGOUT.REQUEST](state) {
    return {};
  }
});
