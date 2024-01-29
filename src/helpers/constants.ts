import { AppStateType, GameBoardType } from "./types";

export const players = ['⭕', '❌'] as const; // '😎', '🥺'

const gameBoardInitState: GameBoardType = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export const initState: AppStateType = {
  gameboard: gameBoardInitState,
  playerOnTurn: (Math.random() < 0.5),
  lastUpdatedCellPosition: [],
  gameOver: false,
  winner: null,
  winnerIndexes: null,
}

export enum WinTypes { Horizontal, Vertical, Cross }

export const horizontalWinIndexes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
 ];

 export const verticalWinIndexes = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
 ];

 export const crossWinIndexes = [
  [0, 4, 8],
  [2, 4, 6]
 ];

 export const counterIncrementValue = 1;
 
 export const maxLoggerDataLength = 30; // must be always more than 10 !