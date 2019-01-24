import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Wheel extends PureComponent {
  static defaultProps = {
    items: ['strawberry', 'banana', 'orange', 'monkey'],
  };
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };
  state = {};

  static getDerivedStateFromProps = ({ items }) => ({
    wheelItems: items,
  });
  render() {
    const {
      props: { className },
      state: { wheelItems },
    } = this;
    return (
      <div className={className}>
        {wheelItems.map(item => (
          <WheelItem key={item} img={item} />
        ))}
      </div>
    );
  }
}

export const WheelItem = styled.img.attrs(({ img }) => ({
  src: `/imgs/${img}.jpg`,
}))`
  position: absolute;
  background: green;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default styled(Wheel)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
`;
