import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import Box from './Box.jsx';


const App = (props) => {
  const [board, updateBoard] = useState(null);
  const [revealedBoxes, updateRevealedBoxes] = useState([]);
  
  useEffect(() => {
    updateBoard(makeBoard(10))
    console.log('board updated')
  }, []);



  return (
    <div className="App">hi
      <div className="container">
        {board ?
          board.map((row, x) => {
            return (
              <div className='row'>{
                row.map((square, y) => {
                  return (
                    <div className="box">
                      <Box updateRevealedBoxes={updateRevealedBoxes} 
                            x={x} 
                            y={y} 
                            value={board[x][y] } 
                            board={board} 
                            revealedBoxes={revealedBoxes}
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
    </div>
  );
}

export default App;
