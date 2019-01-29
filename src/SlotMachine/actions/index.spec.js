import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './index';
import * as types from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {
  it('should create a TICK every 50ms after START', () => {
    jest.useFakeTimers();

    const expectedActions = [
      { type: types.START },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.TICK },
    ];

    const store = mockStore({});

    store.dispatch(actions.start());

    jest.runTimersToTime(5 * 50);

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action to tick slot machine', () => {
    const expectedAction = {
      type: types.TICK,
    };
    expect(actions.tick()).toEqual(expectedAction);
  });

  it('should stop wheels from spinning on click', () => {
    jest.useFakeTimers();

    const expectedActions = [
      { type: types.START },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.TICK },
      { type: types.STOP },
    ];

    const store = mockStore({});
    store.dispatch(actions.start());
    setTimeout(() => {
      store.dispatch(actions.stop());
    }, 2 * 50);
    jest.runTimersToTime(5 * 50);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
