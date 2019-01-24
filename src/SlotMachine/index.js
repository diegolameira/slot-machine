import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }
`;

export default class SlotMachine extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <h1>Slot Machine</h1>
      </>
    );
  }
}
