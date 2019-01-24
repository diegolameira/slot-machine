import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }
`;

export default class SlotMachine extends Component {
  static defaultProps = {
    wheelsCount: 3,
  };
  static propTypes = {
    wheelsCount: PropTypes.number.isRequired,
  };
  state = {};

  static getDerivedStateFromProps = ({ wheelsCount: length }) => ({
    wheels: Array.from({ length }),
  });

  render() {
    const { wheels } = this.state;
    return (
      <>
        <GlobalStyles />
        <h1>Slot Machine</h1>
        {wheels.map((w, key) => (
          <Wheel key={key} />
        ))}
      </>
    );
  }
}

export const Wheel = () => <h2>Wheel</h2>;
