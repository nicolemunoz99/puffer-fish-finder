import React from 'react';
import gameOptions from './board-funcs/gameOptions.js'

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
              <div className="col-sm mx-1" key={option}>
                <button onClick={props.newGame} id={option} className='full-width mr-2 btn btn-primary btn-sm'>{option}</button>
              </div>
            )
          })
        }
      </div>

    </div>
  
  )
}





export default NewGame;