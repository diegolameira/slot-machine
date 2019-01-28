import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { start, stop } from '../actions';

import Wheel from './Wheel';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }
`;

class SlotMachine extends Component {
  static propTypes = {
    wheels: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    ).isRequired,
    start: PropTypes.any,
    stop: PropTypes.any,
  };

  render() {
    const { wheels, start, stop } = this.props;
    return (
      <MachineWrapperStyled>
        <GlobalStyles />
        <header>
          <h1>Slot Machine</h1>
        </header>
        <main>
          {wheels.map((items, key) => {
            return <Wheel items={items} key={key} />;
          })}
        </main>
        <Button onClick={() => start()}>Start</Button>
        <Button onClick={() => stop()}>Stop</Button>
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

const Button = styled.button`
  background: red;
`;

const mapStateToProps = ({ machineState: { wheels } }) => ({
  wheels,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ start, stop }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotMachine);
