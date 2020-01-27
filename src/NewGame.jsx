import React from 'react';

const NewGame = (props) => {


  return (
    <div>
      <div className="row">
        <div className="col h5">New Game</div>
      </div>
      <div className="row no-gutters justify-content-md-center">
        {
          Object.keys(gameOptions).map(option => {
            return (
              <div className="col-sm new-game mx-1">
                <button onClick={props.newGame} id={gameOptions[option]} className='mr-2 btn btn-primary btn-sm'>{option}</button>
              </div>
            )
          })
        }
      </div>

    </div>
  
  )
}


const gameOptions = {
  Easy: 10,
  Medium: 15,
  Expert: 25
};


export default NewGame;