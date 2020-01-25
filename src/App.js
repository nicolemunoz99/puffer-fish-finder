import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import Box from './Box.jsx';


const App = (props) => {
  const [board, updateBoard] = useState(null);
  const [revealedBoxes, updateRevealedBoxes] = useState([]);
  const [dead, updateDead] = useState(false);
  const [mines, updateMines] = useState(null);
  
  useEffect(() => {
    updateBoard(makeBoard(10));
  }, []);

  useEffect(() => {
    if (board) {
      let tempMines = [];
      board.forEach((row, x) => {
        row.forEach((square, y) => {
          if (square === 'x') {
            tempMines.push([x,y])
          }
        });
      });
      updateMines(tempMines);
    }
  }, [board]);

  const newGame = (e) => {
    updateDead(false);
    updateBoard(makeBoard(e.target.id));
    updateRevealedBoxes([])
  }

  return (
    <div className="App">
      <div className="title-container">
        <div className="title mt-3 mb-3">
          Mine Mopper
        </div>
      </div>
      <div className="container">
      <div className='board'>
        {board ?
          board.map((row, x) => {
            return (
              <div className='row justify-content-md-center no-gutters'>
                
                {
                row.map((square, y) => {
                  return (
                    <div className={`col box`}>
                        <Box updateRevealedBoxes={updateRevealedBoxes} 
                            x={x} 
                            y={y} 
                            value={board[x][y]} 
                            board={board} 
                            revealedBoxes={revealedBoxes}
                            dead={dead}
                            updateDead={updateDead}
                      />
                    </div>
                  )
                })}
                
              </div>
            )
          })
          : null
        }
        </div>
      </div> <span className='mr-2'>New Game: </span>
      <button onClick={newGame} id="10" className='mt-4 mb-4 mr-2 new-game'>Easy</button>
      <button onClick={newGame} id="15" className='mt-4 mb-4 mr-2 new-game'>Medium</button>
      <button onClick={newGame} id="25" className='mt-4 mb-4 mr-2 new-game'>Expert</button>
    </div>
  );
}

export default App;