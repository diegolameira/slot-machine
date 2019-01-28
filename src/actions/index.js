import { START, STOP, TICK } from './actionTypes';

let timer = null;

export const start = () => dispatch => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 50);
  dispatch({ type: START });
  dispatch(tick());
};

export const stop = () => dipatch => {
  clearInterval(timer);
  dipatch({ type: STOP });
};

export const tick = () => ({
  type: TICK,
});
