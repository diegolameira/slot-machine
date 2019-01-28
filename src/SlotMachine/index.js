import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { start, stop } from '../actions';
import Prize from './Prize';
import Wheel from './Wheel';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
  }
`;

export class SlotMachine extends Component {
  static propTypes = {
    wheels: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    ).isRequired,
    history: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
  };

  state = {
    timer: 0,
    startTimer: 5 * 1000,
    stopTimer: 10 * 1000,
  };

  componentDidMount() {
    this.setState(({ startTimer }) => {
      return {
        timer: setTimeout(() => this.start(), startTimer),
      };
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    this.setState(({ timer, stopTimer }) => {
      clearTimeout(timer);
      this.props.start();
      return {
        timer: setTimeout(() => this.props.stop(), stopTimer),
      };
    });
  };

  stop = () => {
    clearTimeout(this.state.timer);
    this.props.stop();
  };

  render() {
    const {
      start,
      stop,
      props: { wheels, history },
    } = this;
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
        <Prize history={history} />
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Stop</Button>
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
    display: flex;
    background: #000;
  }
`;

const Button = styled.button`
  background: red;
  border: 0;
  padding: 10px;
  margin: 2px;
  cursor: pointer;
`;

const mapStateToProps = ({ machineState: { wheels, history } }) => ({
  wheels,
  history,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ start, stop }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotMachine);
