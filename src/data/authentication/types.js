import { createAsyncTypes } from 'helpers/saga'

export const LOGIN_ASYNC = createAsyncTypes('LOGIN_ASYNC');
export const CURRENT_USER_ASYNC = createAsyncTypes('CURRENT_USER_ASYNC');
export const LOGOUT = {
    REQUEST: 'LOGOUT_REQUEST'
};
