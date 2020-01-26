import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import { Box } from './Box.jsx';


const App = (props) => {
  const [board, updateBoard] = useState(null);
  const [revealedBoxes, updateRevealedBoxes] = useState([]);
  const [markedBoxes, updateMarkedBoxes] = useState([])
  const [mines, updateMines] = useState(null);
  const [isMarker, updateIsMarker] = useState(false);
  const [markerPosition, updateMarkerPosition] = useState({ top: null, left: null })
  const [dead, updateDead] = useState(false);
  const [won, updateWon] = useState(false);


  useEffect(() => {
    updateBoard(makeBoard(10));
  }, []);

  // add mine coordinates to state when loading a new board
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

  // check if game is won when a new box is marked
  useEffect(() => {
    if (mines && revealedBoxes) {
      let allMinesMarked = mines.every(mineCoord => {
        let thisMineMarked = false;
        markedBoxes.forEach(markCoord => {
          if (markCoord[0] === mineCoord[0] && markCoord[1] === mineCoord[1]) {
            thisMineMarked = true;
          }
        });
        return thisMineMarked
      })
      if (allMinesMarked) {
        updateWon(true)
      }
    }
  }, [markedBoxes])


  const newGame = (e) => {
    if (won) updateWon(false)
    updateDead(false);
    let newGameType = e.target.id ? e.target.id : '10'; 
    updateBoard(makeBoard(newGameType));
    updateRevealedBoxes([]);
    updateMarkedBoxes([]);
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

  const resetGame = (e) => {

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
      {/* header */}
      <div className="container">
        <div className="row header-items justify-content-md-center no-gutters">
          {/* marker icon */}
          <div className="col-auto">
            <div className='marker-container' onClick={handleMarkerClick}>
            </div>
          </div>
          {/* puffer count */}
          <div className="col-auto mine-count ml-4">
            <span className="vertical-center">{mines && markedBoxes ? mines.length - markedBoxes.length : null}</span>
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
      </div>
      <span className='mr-2'>New Game: </span>
      <button onClick={newGame} id="10" className='mt-4 mb-4 mr-2 new-game'>Easy</button>
      <button onClick={newGame} id="15" className='mt-4 mb-4 mr-2 new-game'>Medium</button>
      <button onClick={newGame} id="25" className='mt-4 mb-4 mr-2 new-game'>Expert</button>

      {/* show winner    */}
      {won ? 
      <div onClick={newGame} className="pufferModal">
        <div className="win vertical-horizontal-center">
          Winner! You Found All the Puffers<img src="/images/happyPuffer.png"></img>
        </div>
      </div>
      : null
      }

    </div>
  );
}

export default App;

