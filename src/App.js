import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import Instructions from './Instructions.jsx'
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
  const [showInstructions, updateShowInstructions] = useState(false);


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

  const gameOptions = {
    Easy: 10,
    Medium: 15,
    Expert: 25
  };

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
    let position = { left: e.pageX, top: e.pageY }
    updateMarkerPosition(position)
  }

  const dropMarker = (e) => {
    if (isMarker && !document.getElementById('board').contains(e.target)) {
      updateIsMarker(false);
      return
    }
  }

  const clickInstructions = () => {
    updateShowInstructions(true);
  }

  return (
    <div onMouseMove={handleMouseMove} onClick={dropMarker} className="App">
      {isMarker ?
        <img alt="palm tree" className='marker' src="/images/palmTree.png" style={{ top: markerPosition.top, left: markerPosition.left }}></img>
        : null
      }
      <div className="container-fluid">
        <div className="row title-container">
          <div className="col-sm-10 title">
            Puffer Fish Finder <img alt="happy puffer" src="/images/happyPuffer.png"></img>
          </div>
          <div className="nav-item col-sm-2">
            <button onClick={clickInstructions} className="btn btn-primary">Instructions</button>
          </div>
        </div>
      </div>

      {/* instructions button */}

      {/* header */}
      <div className="container">
        <div className="row header-items">

          {/* marker icon */}
          <div className='col col-md-12'>
            <div className='col-md-12 marker-container' onClick={handleMarkerClick}>
              <img alt="palmtree" src="/images/palmtree.png"></img>
              <span className='ml-3 mine-count vertical-center'>{mines && markedBoxes ? mines.length - markedBoxes.length : null}</span>
            </div>
          </div>
          <div className="col col-md-2"></div>
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
      {/* buttons for game options */}
      {
        Object.keys(gameOptions).map(option => {
          return <button onClick={newGame} id={gameOptions[option]} className='mt-4 mb-4 mr-2 btn btn-primary'>{option}</button>
        })
      }
      {/* show winner modal */}
      {won ?
        <div onClick={newGame} className="pufferModal">
          <div className="win vertical-horizontal-center">
            Winner! You Found All the Puffers<img src="/images/happyPuffer.png"></img>
          </div>
        </div>
        : null
      }
      {/* instructions modal */}
      {showInstructions ?
        <Instructions updateShowInstructions={updateShowInstructions} />
        : null
      }
      <img className="ocean-pic" alt="ocean" src="/images/water.png"></img>
    </div>
  );
}

export default App;

