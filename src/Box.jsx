import React, { useState } from 'react';
import revealEmptySquares from './board-funcs/revealEmptySquares.js';

const Box = (props) => {
  let showValue = false;
  let value = props.board[props.x][props.y];

  if (props.dead) {
    showValue = true;
  } else {
    props.revealedBoxes.forEach(coord => {
      if (coord[0] === props.x && coord[1] === props.y) {
        showValue = true;
      }
    });
  }

  const handleClick = (e) => {
    let newState = props.revealedBoxes.slice();
    newState.push([props.x, props.y]);

    if (value === 'x') {
      props.updateDead(true);
    }

    if (value === null) {
      // get surrounding null squares
      let newEmpties = revealEmptySquares([props.x, props.y], props.board);
      newState.push(...newEmpties);
    }

    props.updateRevealedBoxes(newState);
  }

  return (
    <div className={`inner-box ${showValue ? 'revealed' : 'hidden'} ${value === 'x' && props.dead ? 'dead' : null} `}
      onClick={handleClick}>
        <span className="number">{showValue ? (value === 'x' ? null : value) : null}</span>
    </div>
  )
};

export default Box;