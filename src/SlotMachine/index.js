import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import shuffle from 'lodash.shuffle';

import Wheel from './Wheel';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }
`;

export default class SlotMachine extends Component {
  static defaultProps = {
    wheelsCount: 3,
    items: ['strawberry', 'banana', 'orange', 'monkey'],
  };
  static propTypes = {
    wheelsCount: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };
  state = {};

  static getDerivedStateFromProps = ({ wheelsCount: length, items }) => ({
    wheels: Array.from({ length }, () => shuffle(items)),
  });

  render() {
    const { wheels } = this.state;
    return (
      <MachineWrapperStyled>
        <GlobalStyles />
        <header>
          <h1>Slot Machine</h1>
        </header>
        <main>
          {wheels.map((items, key) => (
            <Wheel items={items} key={key} />
          ))}
        </main>
      </MachineWrapperStyled>
    );
  }
}

const MachineWrapperStyled = styled.div`
  width: 80%;
  background: #000;
  margin: 2em auto;
  color: #fff;
  border-radius: 100% 100% 0 0;

  header {
    padding: 1em;
  }

  main {
    display: grid;

    grid-template-columns: 33.3333% 33.3333% 33.3333%;
    grid-template-rows: auto;
    grid-template-areas:
      'header header header'
      'wheel wheel wheel';

    h1 {
      grid-area: header;
    }
  }
`;
