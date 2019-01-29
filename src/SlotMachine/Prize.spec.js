import React from 'react';
import TestRenderer from 'react-test-renderer';

import Prize, { calcPrize } from './Prize';

describe('Prize', () => {
  let history, component;

  beforeAll(() => {
    history = [];
    component = TestRenderer.create(<Prize history={history} />);
  });

  beforeEach(() => {
    component.update(<Prize history={history} />);
  });

  afterEach(() => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  history = [[1, 0, 1], [0, 1, 0, 2], [2, 0, 1, 2], [2, 0, 2], [2, 1, 2]];
  it('10 dollars when two identical non-consecutive symbols', () => {
    history.map(calcPrize).forEach(i => expect(i).toEqual(10));
  });

  history = [[1, 0, 1, 1], [0, 0, 2], [0, 1, 1], [2, 1, 2, 2]];
  it('20 dollars when two consecutive symbols', () => {
    history.map(calcPrize).forEach(i => expect(i).toEqual(20));
  });

  history = [[1, 1, 1], [0, 0, 0], [1, 1, 1, 1], [1, 1]];
  it('100 dollars when same symbol in all the wheels', () => {
    history.map(calcPrize).forEach(i => expect(i).toEqual(100));
  });
});
