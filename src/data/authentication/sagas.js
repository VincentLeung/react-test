import { authService } from 'services';
import { history } from 'helpers';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { authenticationActions } from './actions';
import { alertActions } from 'data/alert/actions';
import * as types from './types';

function* login(login) {
  try {
    const user = yield call(authService.login, login.user.username, login.user.password, login.user.otp);
    yield put(authenticationActions.loginSuccess(user));
    yield put(authenticationActions.currentUser());
    history.replace('/home');
  } catch (e) {
    yield put(authenticationActions.loginError(e));
    yield put(alertActions.error(e));
  }
}

function* currentUser() {
  try {
    const user = yield call(authService.currentUser);
    yield put(authenticationActions.currentUserSuccess(user));
  } catch (e) {
    yield put(authenticationActions.currentUserError(e));
    yield put(alertActions.error(e));
  }
}

export default function* () {
  yield all([
    takeLatest(types.LOGIN_ASYNC.PENDING, login),
    takeLatest(types.CURRENT_USER_ASYNC.PENDING, currentUser)
  ])
}
