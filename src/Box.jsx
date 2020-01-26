import React from 'react';
import revealEmptySquares from './board-funcs/revealEmptySquares.js';


const Box = (props) => {  

  let showValue = false;
  let isMarked = false;
  let value = props.board[props.x][props.y];

  if (props.dead) {
    // game lost
    showValue = true;
  } else {
    // check if box has been revealed
    props.revealedBoxes.forEach(coord => {
      if (coord[0] === props.x && coord[1] === props.y) {
        showValue = true;
      }
    });
    // check if box has been marked
    if (!showValue) {
      props.markedBoxes.forEach(coord => {
        if (coord[0] === props.x && coord[1] === props.y) {
          isMarked = true;
        }
      });
    }
  }

  const handleClick = (e) => {
    if (props.isMarker ) {
      props.updateIsMarker(false);
      let newMarkedState = [...props.markedBoxes, [props.x, props.y]]
      props.updateMarkedBoxes(newMarkedState)
      return
    }
// TO DO : if clicked and isMarker, then remove marker

    let newRevealedState = [...props.revealedBoxes, [props.x, props.y]];

    if (value === 'x') {
      props.updateDead(true);
    }
    if (value === null) {
      // reveal surrounding null squares
      let newEmpties = revealEmptySquares([props.x, props.y], props.board);
      newRevealedState.push(...newEmpties);
    }

    props.updateRevealedBoxes(newRevealedState);
  };

  return (
    <div className={`inner-box ${showValue ? 'revealed' : (isMarked ? 'dropped-marker' : 'hidden') } ${value === 'x' && props.dead ? 'dead' : null} `}
      onClick={handleClick}>
        <span className="number">{showValue ? (value === 'x' ? null : value) : null}</span>
    </div>
  )
};

export {Box}

