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
    if (props.isMarker) {
      props.updateIsMarker(false);
      if (!isMarked) {
        let newMarkedState = [...props.markedBoxes, [props.x, props.y]]
        props.updateMarkedBoxes(newMarkedState)
      }
      return
    }
    if (isMarked) {
      let newMarkedState = props.markedBoxes.filter(coord => {
        return coord[0] !== props.x && coord[1] !== props.y
      })
      props.updateMarkedBoxes(newMarkedState)
      return
    }
    // game lost
    if (value === 'x') {
      props.updateDead(true);
    }

    // add clicked on box to list of revealed boxes
    let newRevealedState = [...props.revealedBoxes, [props.x, props.y]];
    
    // reveal surrounding null squares when clicking on null box
    if (value === null) {
      let newEmpties = revealEmptySquares([props.x, props.y], props.board);
      // remove empties that correspond to a marked box
      let newEmpties2 = newEmpties.filter(emptyCoord => {
      let isMarked = false;
      props.markedBoxes.map(markedCoord => {
          if (emptyCoord[0] === markedCoord[0] &&  emptyCoord[1] === markedCoord[1]) {
            console.log('in here')
            isMarked = true;
          }
        });
        return !isMarked;
      });
      newRevealedState.push(...newEmpties2);
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

