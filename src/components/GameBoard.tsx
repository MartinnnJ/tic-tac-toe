import { StyledGameBoard, GameBoardCell } from "./GameBoard.styled";
import { GameBoardType, WinnerIndexesType } from "../helpers/types";
import { getCellSignValue } from "../helpers/functions";

interface GameBoardProps {
  state: GameBoardType,
  gameOver: {
    status: boolean,
    indexes: WinnerIndexesType,
  },
  onCellClick: (e: React.MouseEvent) => void,
}

const GameBoard: React.FC<GameBoardProps> = ({ state, gameOver, onCellClick }) => {
  const gameBoardContentOutput = state.map((array, mapIndex) => {
    return [...array.map((cellValue, i) => {
      const valueOutput = getCellSignValue(cellValue);
      const hasValue = valueOutput ? 1 : 0;
      const positionIndexOutput = `${mapIndex}${i}`;
      const isWinIndexIncluded = gameOver.indexes?.flat().includes(positionIndexOutput) || false;

      return (
        <GameBoardCell
          key={positionIndexOutput}
          data-position={positionIndexOutput}
          data-value={hasValue}
          $winCell={isWinIndexIncluded}
          onClick={onCellClick}
        >
          {valueOutput}
        </GameBoardCell>
      )
    })]
  }).flat();

  return <StyledGameBoard>{gameBoardContentOutput}</StyledGameBoard>
}

export default GameBoard;