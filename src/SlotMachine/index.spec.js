import React from 'react';
import TestRenderer from 'react-test-renderer';
import diff from 'lodash.difference';
import shuffle from 'lodash.shuffle';

import { SlotMachine } from './index';
import Wheel, { WheelItem } from './Wheel';

const items = ['strawberry', 'orange', 'banana', 'monkey'];
const buildWheels = (length = 3) =>
  Array.from({ length }, () => shuffle(items));

describe('SlotMachine', () => {
  const start = () => () => false;
  const stop = () => () => false;
  const wheels = buildWheels(3);

  const component = TestRenderer.create(
    <SlotMachine {...{ wheels, stop, start }} />
  );

  it('should render properly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should have 3 (or given) wheels', () => {
    let wheels = component.root.findAllByType(Wheel);
    expect(wheels.length).toBe(3);
    component.update(<SlotMachine wheels={buildWheels(2)} />);
    wheels = component.root.findAllByType(Wheel);
    expect(wheels.length).toBe(2);
  });

  it('should have a start button', () => {});
  it('should have a stop button', () => {});

  describe('Wheels', () => {
    it('should have 4 symbols each (strawberry, banana, orange and a monkey)', () => {
      const items = ['strawberry', 'banana', 'orange', 'monkey'];

      component.root.findAllByType(Wheel).forEach(w => {
        let _items = w.findAllByType(WheelItem);
        expect(_items.length).toBe(items.length);
        let itemsImage = [];
        _items.map(i => itemsImage.push(i.props.img));
        expect(itemsImage.length).toBe(items.length);
        expect(diff(items, itemsImage).length).toBe(0);
      });
    });
    it('starts with the symbols in some random position', () => {
      const wheelsOrder = [];

      component.root.findAllByType(Wheel).forEach(w => {
        let items = w.findAllByType(WheelItem);
        let itemsImage = [];
        items.map(i => itemsImage.push(i.props.img));
        wheelsOrder.push(itemsImage.join(''));
      });

      const areEqual = wheelsOrder.every((val, i, arr) => val === arr[0]);

      expect(areEqual).toBe(false);
    });
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
