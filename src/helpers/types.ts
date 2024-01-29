export type WinnerIndexesType = null | [string, string, string];

export type AppStateType = {
  gameboard: GameBoardType,
  playerOnTurn: null| boolean,
  lastUpdatedCellPosition: string[],
  gameOver: boolean,
  winner: null | boolean,
  winnerIndexes: WinnerIndexesType,
};

export type GameBoardCellValueType = null | true | false;

export type GameBoardType = [
  [GameBoardCellValueType, GameBoardCellValueType, GameBoardCellValueType],
  [GameBoardCellValueType, GameBoardCellValueType, GameBoardCellValueType],
  [GameBoardCellValueType, GameBoardCellValueType, GameBoardCellValueType]
];

export type TempNestedArrType = (null | boolean)[][];

export class Log {
  id: string;
  text: string;

  constructor(t: string) {
    this.id = Math.random().toString();
    this.text = t;
  }
}