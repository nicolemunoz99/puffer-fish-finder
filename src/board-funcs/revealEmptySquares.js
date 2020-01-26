

const revealEmptySquares = (coordinates, board) => {
  let empties = [];
  let visited = [];

  const getEmpties = (coord) => {
    let x = coord[0];
    let y = coord[1];
    visited.push([x, y]);

    let xToCheck = [x - 1, x, x + 1];
    let yToCheck = [y - 1, y, y + 1];

    for (let i = 0; i < xToCheck.length; i++) {
      let currRow = board[xToCheck[i]];
      for (let j = 0; j < yToCheck.length; j++) {
        let currVal = currRow === undefined ? undefined : currRow[yToCheck[j]];
        let hasBeenVisited = isVisited([xToCheck[i], yToCheck[j]], visited);
        if (currRow && currVal === null && !hasBeenVisited) {
          empties.push([xToCheck[i], yToCheck[j]]);
          getEmpties([xToCheck[i], yToCheck[j]]);
          visited.push([xToCheck[i], yToCheck[j]]);
        } else {
          empties.push([xToCheck[i], yToCheck[j]]);
          visited.push([xToCheck[i], yToCheck[j]]);
        }

      }
    }
  }

  getEmpties(coordinates);
  return empties;
}


const isVisited = (coord, visitedArray) => {
  let x1 = coord[0];
  let y1 = coord[1]
  let result = false;
  visitedArray.forEach(item => {
    if (x1 === item[0] && y1 === item[1]) {
      result = true;
    }
  });
  return result;
};


export default revealEmptySquares;