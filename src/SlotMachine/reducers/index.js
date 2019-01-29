import { combineReducers } from 'redux';

import { machineReducer } from './machine';

export default combineReducers({
  machineState: machineReducer,
});
