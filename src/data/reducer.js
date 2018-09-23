import { combineReducers } from 'redux';

import { authentication } from 'data/authentication/reducer';
import { alert } from 'data/alert/reducer';

const dataReducer = combineReducers({
  authentication,
  alert
});

export default dataReducer;
