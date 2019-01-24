import React from 'react';
import TestRenderer from 'react-test-renderer';

import SlotMachine from './index';

describe('SlotMachine', () => {
  const component = TestRenderer.create(<SlotMachine />);
  const tree = component.toTree();

  it('should render properly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should have 3 wheels', () => {});
  it('should have a start button', () => {});
  it('should have a stop button', () => {});

  describe('Wheels', () => {
    it('should have 4 symbols each (strawberry, banana, orange and a monkey)', () => {});
    it('starts with the symbols in some random position', () => {});
  });

  describe('Start button', () => {
    it('should spin the wheels on click (a symbol every, 50ms)', () => {});
    it('should automatically start after 5 seconds', () => {});
  });

  describe('Stop button', () => {
    it('should stop wheels from spinning on click', () => {});
    it('should automatically stop wheels from spinning after 10 seconds (after starting)', () => {});
  });

  describe('Prizes', () => {
    it('10 dollars when two identical non-consecutive symbols', () => {});
    it('20 dollars when two consecutive symbols', () => {});
    it('100 dollars when same symbol in all the wheels', () => {});
  });
});
