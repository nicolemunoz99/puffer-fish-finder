import React, {useState} from 'react';
import revealEmptySquares from './board-funcs/revealEmptySquares.js';

const Box = (props) => {
  

  let value = props.board[props.x][props.y];
  let showValue = false

  props.revealedBoxes.forEach(coord => {
    if (coord[0] === props.x && coord[1] === props.y) {
      showValue = true;
    }
  })   


  if ( typeof value === 'number' ) {

  }

  if (value === 'x') {
    // value = ':('
  }

  const handleClick = (e) => {
    console.log('value', value)
    let newState = props.revealedBoxes.slice();
    newState.push([props.x, props.y])
    
    if (value === null) {
      // get surrounding coords that are also null
      // push to newState
      let newEmpties = revealEmptySquares([props.x, props.y], props.board)
      newState.push(...newEmpties);
      // console.log(newState);
    }

    props.updateRevealedBoxes(newState);
  }
  
  return (
    <div className={`inner-box ${showValue ? null : 'hidden'}`} onClick={handleClick}>{showValue ? value : value}</div>
  )
};

export default Box;