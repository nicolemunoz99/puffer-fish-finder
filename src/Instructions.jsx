import React from 'react';

const Instructions = (props) => {
  const hideModal = (e) => {
    props.updateShowInstructions(false);
  }

  return (
    <div onClick={hideModal} className="pufferModal">
      <div className="instructions vertical-horizontal-center">
        <div className="closeModal">X</div>
        <h2>How to Play</h2>
        <p>
          It's like Mine Sweeper, but with puffer fish. 
        </p>
        <p>
          <h4>Objective:</h4>
          Find all the puffer fish without stepping on one.
        </p>
        <p>
          Click on a square to reveal its contents. The number indicates the number of
          puffers in immediately adjacent squares (including diagonals).
          If you're sure that a square has a puffer fish, mark the square with a
          palm tree. To mark a square, click on the palm tree icon
          and then click on a square. Click on a marked square to unmark it. The number
          counts down the total number of puffers on the board.
        </p>
        <p>
          <h4>How to lose:</h4>
          Revealing a square containing a puffer fish. All puffers will then
          be revealed.
        </p>
        <p>
          <h4>How to win:</h4>
          Mark all puffer fish with a palm tree.
          </p>
        
      </div>

    </div>
  )
};

export default Instructions;