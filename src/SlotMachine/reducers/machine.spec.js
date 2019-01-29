import { machineReducer as reducer } from './machine';
import * as types from '../actions/actionTypes';

describe('Machine Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isPlaying: false,
      wheelsCount: 3,
      items: ['strawberry', 'banana', 'orange', 'monkey'],
      history: [],
      wheels: [],
    });
  });

  it('should handle START', () => {
    expect(
      reducer(
        {},
        {
          type: types.START,
        }
      )
    ).toEqual({
      isPlaying: true,
    });

    expect(
      reducer(
        {
          isPlaying: false,
        },
        {
          type: types.START,
        }
      )
    ).toEqual({
      isPlaying: true,
    });
  });

  it('should handle STOP', () => {
    const wheels = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    expect(
      reducer(
        {
          wheels: [],
        },
        {
          type: types.STOP,
        }
      )
    ).toEqual({
      isPlaying: false,
      wheels: [],
    });

    expect(
      reducer(
        {
          isPlaying: true,
          wheels,
          history: [],
        },
        {
          type: types.STOP,
        }
      )
    ).toEqual({
      isPlaying: false,
      wheels,
      history: [[3, 3, 3]],
    });
  });
});
