import React from 'react';

export const calcPrize = (items = []) => {
  let equals = 0;
  let consecutives = false;
  items.reduce((prev, current, index, array) => {
    const compare = [
      ...array.slice(0, index),
      ...array.slice(index + 1, array.length),
    ];
    if (prev === current) consecutives = true;
    if (~compare.indexOf(current)) equals++;
    return current;
  }, '');
  return equals > 0 && equals === items.length
    ? 100
    : equals && consecutives
    ? 20
    : equals
    ? 10
    : 0;
};

export default ({ history = [] }) => (
  <>
    <h1>Prize: {calcPrize(history.slice(-1)[0])}</h1>
    <h2>
      Win Amount:
      {history.reduce((prev, current) => {
        return calcPrize(current) + prev;
      }, 0)}
    </h2>
  </>
);
