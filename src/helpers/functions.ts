import { players, WinTypes, horizontalWinIndexes, verticalWinIndexes, crossWinIndexes } from "./constants";
import { GameBoardType, GameBoardCellValueType, TempNestedArrType } from "./types";

export const getCellSignValue = (value: GameBoardCellValueType): string => {
  if (value !== null) {
    return value === true ? players[0] : players[1];
  }
  return '';
};

export const getSortedCellValues = (gameSnapshot: GameBoardType) => {
  const gameBoardArr = gameSnapshot.flat();
  const horizontalCellValues: TempNestedArrType = [[], [], []]; // for each row
  const verticalCellValues: TempNestedArrType = [[], [], []]; // for each column
  const crossCellValues: TempNestedArrType = [[], []]; // for two cross lines ( X )

  for (const [index, value] of gameBoardArr.entries()) {
    // horizontal lines
    if (horizontalWinIndexes[0].includes(index)) {
      horizontalCellValues[0].push(value);
    }
    if (horizontalWinIndexes[1].includes(index)) {
      horizontalCellValues[1].push(value);
    }
    if (horizontalWinIndexes[2].includes(index)) {
      horizontalCellValues[2].push(value);
    }
    // vertical lines
    if (verticalWinIndexes[0].includes(index)) {
      verticalCellValues[0].push(value);
    }
    if (verticalWinIndexes[1].includes(index)) {
      verticalCellValues[1].push(value);
    }
    if (verticalWinIndexes[2].includes(index)) {
      verticalCellValues[2].push(value);
    }
    // cross lines
    if (crossWinIndexes[0].includes(index)) {
      crossCellValues[0].push(value);
    }
    if (crossWinIndexes[1].includes(index)) {
      crossCellValues[1].push(value);
    }
  }

  return [
    {
      cellType: WinTypes.Horizontal,
      cellValues: horizontalCellValues,
    },
    {
      cellType: WinTypes.Vertical,
      cellValues: verticalCellValues,
    },
    {
      cellType: WinTypes.Cross,
      cellValues: crossCellValues,
    }
  ];
}

const calcWinnerIndexes = (winType: number, winPosition: number) => {
  if (WinTypes.Horizontal === winType) {
    return [`${winPosition}${0}`, `${winPosition}${1}`, `${winPosition}${2}`];
  }
  if (WinTypes.Vertical === winType) {
    return [`${0}${winPosition}`, `${1}${winPosition}`, `${2}${winPosition}`];
  }
  if (WinTypes.Cross === winType) {
    if (winPosition === 0) {
      return [`${0}${0}`, `${1}${1}`, `${2}${2}`];
    }
    if (winPosition === 1) {
      return [`${0}${2}`, `${1}${1}`, `${2}${0}`];
    }
  }
  return null;
};

export const checkForWin = (gameBoardData: {
  cellType: WinTypes,
  cellValues: TempNestedArrType,
}[]) => {
  for (const [index, obj] of gameBoardData.entries()) {
    for (const [i, arr] of obj.cellValues.entries()) {
      if (
        arr.every(value => value === true) ||
        arr.every(value => value === false)
      ) {
        // we have a winner
        return {
          isGameOver: true,
          winner: arr[0],
          winnerIndexes: calcWinnerIndexes(index, i),
        }
      }
    }
  }
  const isDraw = gameBoardData[0].cellValues.flat()
    .every(value => value === true || value === false);
  
  if (isDraw) {
    // no winner, game is over
    return {
      isGameOver: true,
      winner: null,
      winnerIndexes: null,
    }
  }
  // no winner, game continues
  return {
    isGameOver: false,
    winner: null,
    winnerIndexes: null,
  }
}