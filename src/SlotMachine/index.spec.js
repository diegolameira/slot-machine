import React from 'react';
import TestRenderer from 'react-test-renderer';
import diff from 'lodash.difference';
import shuffle from 'lodash.shuffle';

import { SlotMachine } from './index';
import Wheel, { WheelItem } from './Wheel';

const items = ['strawberry', 'orange', 'banana', 'monkey'];
const buildWheels = (length = 3, random) =>
  Array.from({ length }, () => (random ? shuffle(items) : items));

describe('SlotMachine', () => {
  jest.useFakeTimers();

  const start = jest.fn();
  const stop = jest.fn();
  const tick = jest.fn();
  const wheels = buildWheels(3, false);

  const component = TestRenderer.create(
    <SlotMachine {...{ wheels, stop, start, tick }} />
  );

  it('should render properly', () => {
    expect(component.toJSON()).toMatchSnapshot();
    expect(tick).toBeCalled();
  });

  it('should have 3 (or given) wheels', () => {
    let wheels = component.root.findAllByType(Wheel);
    expect(wheels.length).toBe(3);
    component.update(
      <SlotMachine wheels={buildWheels(2, true)} {...{ stop, start, tick }} />
    );
    wheels = component.root.findAllByType(Wheel);
    expect(wheels.length).toBe(2);
  });

  it('should have a start button', () => {
    let startButton = component.root.find(
      elm => elm.props.onClick == component.start
    );
    expect(startButton).toBeTruthy();
  });
  it('should have a stop button', () => {
    let stopButton = component.root.find(
      elm => elm.props.onClick == component.stop
    );
    expect(stopButton).toBeTruthy();
  });

  describe('Wheels', () => {
    it('should have 4 symbols each (strawberry, banana, orange and a monkey)', () => {
      const items = ['strawberry', 'banana', 'orange', 'monkey'];

      // reducing the chance of repeated items
      component.update(
        <SlotMachine
          wheels={buildWheels(20, true)}
          {...{ stop, start, tick }}
        />
      );

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
    it('should automatically start after 5 seconds', () => {
      expect(start).not.toBeCalled();
      jest.runTimersToTime(5 * 1000);
      expect(start).toBeCalled();
    });
  });

  describe('Stop button', () => {
    it('should automatically stop wheels from spinning after 10 seconds (after starting)', () => {
      expect(stop).not.toBeCalled();
      jest.runTimersToTime(10 * 1000);
      expect(stop).toBeCalled();
    });
  });
});
