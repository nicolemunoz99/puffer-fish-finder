import React, { useState, useEffect } from 'react';
import './App.css';
import makeBoard from './board-funcs/makeBoard.js';
import gameOptions from './board-funcs/gameOptions.js'
import Instructions from './Instructions.jsx';
import NewGame from './NewGame.jsx';
import { Box } from './Box.jsx';


const App = (props) => {
  const [board, updateBoard] = useState(null);
  const [gameType, updateGameType] = useState('Easy')
  const [revealedBoxes, updateRevealedBoxes] = useState([]);
  const [markedBoxes, updateMarkedBoxes] = useState([])
  const [mines, updateMines] = useState(null);
  const [isMarker, updateIsMarker] = useState(false);
  const [markerPosition, updateMarkerPosition] = useState({ top: null, left: null })
  const [dead, updateDead] = useState(false);
  const [won, updateWon] = useState(false);
  const [showInstructions, updateShowInstructions] = useState(false);


  useEffect(() => {
    updateBoard(makeBoard(gameOptions['Easy']));
  }, []);

  // get mine coordinates when loading a new board
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
    let newGameType = e.target.id ? e.target.id : gameType;
    updateGameType(newGameType)
    updateBoard(makeBoard(gameOptions[newGameType]));
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
    {/* active palm tree marker; follows cursor */}
      {isMarker ?
        <img alt="palm tree" className='marker' src="/images/palmtree.png" 
            style={{ top: markerPosition.top, left: markerPosition.left }}>
        </img>
        : null
      }
    {/* Nav */}
      <div className="container-fluid">
        <div className="row title-container ">
          <div className="nav-item col-md-5 title">
            Puffer Fish Finder <img alt="happy puffer" src="/images/happyPuffer.png"></img>
          </div>
          <div className="nav-item col-md-5">
          <div className="vertical-center">
            <NewGame newGame={newGame}/>
            </div>
          </div>
          <div className="nav-item col-md-2 col-sm-12 ">
            <div className="vertical-center">
              <button onClick={clickInstructions} className="full-width btn btn-primary btn-sm">
                Instructions
              </button>
            </div>
          </div>
        </div>
      </div>

    <div className="inner-body">
    {/* above board: marker icon, timer  */}
      <div className="container my-auto">
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
        {/* TO DO: timer w/ backend for high-score storage/retrieval */}

    {/* board */}
        <div className="row">
          <div className='col'></div>
          <div id="board" className={gameType==="Easy" ? "col-md-6" : (gameType==="Medium" ? "col-md-8" : "col-md-12")}>
            {board ?
              board.map((row, x) => {
                return (
                  <div key={x} className='row justify-content-md-center no-gutters'>
                    {
                      row.map((square, y) => {
                        return (
                          <div key={y} className="col box">
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
          <div className='col'></div>
        </div>
      </div>

    {/* Modal: winner  */}
      {won ?
        <div onClick={newGame} className="pufferModal">
          <div className="win vertical-horizontal-center">
            Winner! You Found All the Puffers<img alt="happy-puffer" src="/images/happyPuffer.png"></img>
          </div>
        </div>
        : null
      }
    {/* Modal: instructions */}
      {showInstructions ?
        <Instructions updateShowInstructions={updateShowInstructions} />
        : null
      }
    </div>

    {/* footer pic */}
      <div className="footer-pic full-width">
        <img className="full-width" alt="ocean" src="/images/water.png"></img>
      </div>
    </div>
  );
}

export default App;

