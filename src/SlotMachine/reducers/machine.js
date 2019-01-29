import shuffle from 'lodash.shuffle';
import { START, STOP, TICK } from '../actions/actionTypes';

const shuffleWheels = (length, items) =>
  Array.from({ length }, () => shuffle(items));

const initialState = {
  isPlaying: false,
  wheelsCount: 3,
  items: ['strawberry', 'banana', 'orange', 'monkey'],
  history: [],
  wheels: [],
};

export const machineReducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isPlaying: true,
      };
    case STOP:
      if (!state.isPlaying) return { ...state, isPlaying: false };
      const visibleItems = state.wheels.map(i => i.slice(-1)[0]);
      return {
        ...state,
        isPlaying: false,
        history: [...state.history, visibleItems],
      };
    case TICK:
      const wheels = shuffleWheels(state.wheelsCount, state.items);
      return {
        ...state,
        wheels,
      };
    default:
      return state;
  }
};
