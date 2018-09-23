import { createAction } from 'helpers/saga';
import * as types from './types';
import { authService } from 'services';

export const authenticationActions = {
  login: (user) => createAction(types.LOGIN_ASYNC.PENDING, { user }),
  loginSuccess: (user) => createAction(types.LOGIN_ASYNC.SUCCESS, { user }),
  loginError: (error) => createAction(types.LOGIN_ASYNC.ERROR, { error }),
  currentUser: () => createAction(types.CURRENT_USER_ASYNC.PENDING),
  currentUserSuccess: (user) => createAction(types.CURRENT_USER_ASYNC.SUCCESS, { user }),
  currentUserError: (error) => createAction(types.CURRENT_USER_ASYNC.ERROR, { error }),
  logout: logout
}

function logout() {
  authService.logout();
  return { type: types.LOGOUT.REQUEST };
}
