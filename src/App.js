import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import { Box } from './Box.jsx';


const App = (props) => {
  const [board, updateBoard] = useState(null);
  const [revealedBoxes, updateRevealedBoxes] = useState([]);
  const [markedBoxes, updateMarkedBoxes] = useState([])
  const [dead, updateDead] = useState(false);
  const [mines, updateMines] = useState(null);
  const [isMarker, updateIsMarker] = useState(false);
  const [markerPosition, updateMarkerPosition] = useState({ top: null, left: null })


  useEffect(() => {
    updateBoard(makeBoard(10));
  }, []);

  useEffect(() => {
    if (board) {
      let tempMines = [];
      board.forEach((row, x) => {
        row.forEach((square, y) => {
          if (square === 'x') {
            tempMines.push([x, y]);
          }
        });
      });
      updateMines(tempMines);
    }
  }, [board]);


  const newGame = (e) => {
    updateDead(false);
    updateBoard(makeBoard(e.target.id));
    updateRevealedBoxes([]);
  }

  const handleMarkerClick = (e) => {
    updateIsMarker(!isMarker);
  };

  const handleMouseMove = (e) => {
    let position = { left: e.clientX, top: e.clientY }
    updateMarkerPosition(position)
  }

  const dropMarker = (e) => {
    if (isMarker && !document.getElementById('board').contains(e.target)) {
      updateIsMarker(false);
      return
    }
  }

  return (
    <div onMouseMove={handleMouseMove} onClick={dropMarker} className="App">
      {isMarker ?
        <img className='marker' src="/images/palmTree.png" style={{ top: markerPosition.top, left: markerPosition.left }}></img>
        : null
      }
      <div className="title-container">
        <div className="title mt-3 mb-3">
          Puffer Fish Finder
        </div>
      </div>
      {/* palm tree marker */}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className='col-12'>
            <div className='marker-container' onClick={handleMarkerClick}>

            </div>
          </div>
        </div>
        {/* board */}
        <div className="row">
          <div className='col-md-2'></div>
          <div id="board" className='col-md'>
            {board ?
              board.map((row, x) => {
                return (
                  <div className='row justify-content-md-center no-gutters'>
                    {
                      row.map((square, y) => {
                        return (
                          <div className={`col box`}>
                            <Box 
                              x={x}
                              y={y}
                              board={board}
                              revealedBoxes={revealedBoxes}
                              updateRevealedBoxes={updateRevealedBoxes}
                              markedBoxes={markedBoxes}
                              updateMarkedBoxes={updateMarkedBoxes}
                              dead={dead}
                              updateDead={updateDead}
                              isMarker={isMarker}
                              updateIsMarker={updateIsMarker}
                            />
                          </div>
                        );
                      })}
                  </div>
                );
              })
              : null
            }
          </div>
          <div className='col-md-2'></div>
        </div>
      </div> <span className='mr-2'>New Game: </span>
      <button onClick={newGame} id="10" className='mt-4 mb-4 mr-2 new-game'>Easy</button>
      <button onClick={newGame} id="15" className='mt-4 mb-4 mr-2 new-game'>Medium</button>
      <button onClick={newGame} id="25" className='mt-4 mb-4 mr-2 new-game'>Expert</button>

    </div>
  );
}

export default App;

