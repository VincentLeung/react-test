import { alertConstants } from 'constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'warning',
        icon: 'warning',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        icon: 'ban',
        message: action.message.errorCode
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}
