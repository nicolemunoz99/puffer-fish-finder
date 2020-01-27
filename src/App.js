import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import Instructions from './Instructions.jsx';
import NewGame from './NewGame.jsx';
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
      {/* header */}
      <div className="container-fluid">
        <div className="row title-container">
          <div className="col-6 title">
            Puffer Fish Finder <img alt="happy puffer" src="/images/happyPuffer.png"></img>
          </div>
          <div className="nav-item col-4">
            <NewGame newGame={newGame}/>
          </div>
          <div className="nav-item col-2">
            <button onClick={clickInstructions} className="btn btn-primary btn-sm">Instructions</button>
          </div>
        </div>
      </div>


      {/* above board: marker icon, timer  */}
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
          <div className='col-lg-4 col-md-2'></div>
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
          <div className='col-lg-4 col-md-2'></div>
        </div>
      </div>

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
      <img className="full-width" alt="ocean" src="/images/water.png"></img>
    </div>
  );
}

export default App;

