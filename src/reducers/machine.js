import shuffle from 'lodash.shuffle';
import { START, STOP, TICK } from '../actions/actionTypes';

const shuffleWheels = (length, items) =>
  Array.from({ length }, () => shuffle(items));

const initialState = {
  isPlaying: false,
  wheelsCount: 3,
  items: ['strawberry', 'banana', 'orange', 'monkey'],
};

initialState.wheels = shuffleWheels(
  initialState.wheelsCount,
  initialState.items
);

export const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isPlaying: true,
      };
    case STOP:
      return {
        ...state,
        isPlaying: false,
      };
    case TICK:
      return {
        ...state,
        wheels: shuffleWheels(state.wheelsCount, state.items),
      };
    default:
      return state;
  }
};
