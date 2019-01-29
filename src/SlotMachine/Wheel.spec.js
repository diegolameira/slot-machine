import React from 'react';
import TestRenderer from 'react-test-renderer';

import Wheel from './Wheel';

describe('Wheel', () => {
  let component = TestRenderer.create(<Wheel items={[]} />);

  it('should render properly', () => {
    expect(component).toMatchSnapshot();
    component.update(<Wheel items={['1', '2']} />);
    expect(component).toMatchSnapshot();
  });
});
