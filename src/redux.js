import {
  combineReducers,
  createStore,
} from 'redux';
import makeBoard from '../board-funcs/makeBoard.js';

const board = makeBoard(8)


// actions


export const recordCoord = coordinate => ({
  type: 'GET_VALUE',
  coordinate
})


// reducers

const exposedCoords = (state=[], action) => {
  let newState
  if (action.type === 'GET_VALUE') {
    newState = state.slice();
    state = newState.push(action.value)
  }
  return state
}

export default exposedCoords;

const initialState = [];

// store

export default createStore(
  exposedCoords,
  initialState
)

