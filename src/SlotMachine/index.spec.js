import React from 'react';
import TestRenderer from 'react-test-renderer';

import SlotMachine from './index';

describe('SlotMachine', () => {
  const component = TestRenderer.create(<SlotMachine />);
  const tree = component.toTree();

  it('should render properly', () => {
    expect(tree).toMatchSnapshot();
  });
});
