

// make a board populated with mines and numbers

var makeBoard = (n) => {
  // n = 10;
  let board = [];
  for (let i = 0; i < n; i++) {
    let newRow = [];
    for (let j = 0; j < n; j++) {
      newRow.push(null);
    }
    board.push(newRow);
  }

  let mineCoords = getMines(n);

  mineCoords.forEach(coord => {
    board[coord[0]][coord[1]] = 'x';

  })


  let populatedBoard = fillBoard(board);

  return populatedBoard;
}

// ---------------------------
// ---- helper functions ------
// ----------------------------

// get random coords of mines;
// 'num' is the length of the board;
var getMines = (num) => {
  let mineCoords = [];

  const getRandom = (scale) => {
    return Math.floor(Math.random() * (scale));
  }

  let numMines = Math.floor(num * num/10 )

  for (let i = 0; i < numMines; i++) {
    while (true) {
      let row = getRandom(num);
      let col = getRandom(num);

      let isUniq = true;

      mineCoords.forEach(coord => {
        if (row === coord[0] && col === coord[1]) {
          isUniq = false;
        }
      });
      if (isUniq) {
        mineCoords.push([row, col])
        break;
      }
    }
  }

  return mineCoords
} 

// fill board (that is already populated with mines) ;
// with numbers indicating number of neighboring mines;
// 'matrix' is a board populated with mines;
var fillBoard = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      // if space is empty
      if (row[j] === null) {
        // count number of mines in surrounding squares
        let mineCount = countMines([i,j], matrix);
        matrix[i][j] = mineCount > 0 ? mineCount : null;
      }
    }
  }
  return matrix;
}

// count the number of mines in surrounding squares (including diagonals);
// 'coord' is an array containing the coords of the location of interest
var countMines = (coord, boardWithMines) => {
  let count = 0;
  let x = coord[0];
  let y = coord[1];

  let xToCheck = [x-1, x, x+1];
  let yToCheck = [y-1, y, y+1];

  xToCheck.forEach(xCoord => {
    yToCheck.forEach(yCoord => {
      if (boardWithMines[xCoord] !== undefined && 
          boardWithMines[xCoord][yCoord] !== undefined &&
          boardWithMines[xCoord][yCoord] === 'x') 
        {
        count++
        } 
    });
  });
  return count;
}

// x = makeBoard(8)

// x.forEach(row => {
//   let print = row.join(', ')
//   console.log(print + '\n')
// })

export default makeBoard;

