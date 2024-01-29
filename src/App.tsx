import { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameLogger from "./components/GameLogger";
import GameWinnerCounter from "./components/GameWinnerCounter";
import { AppContainer } from "./App.styled";
import { GameBoardType, Log, WinnerIndexesType } from "./helpers/types";
import { initState, maxLoggerDataLength } from "./helpers/constants";
import { checkForWin, getCellSignValue, getSortedCellValues } from "./helpers/functions";

let somePlayerDidAction = false;

export default function App() {
  const [gameTurn, setGameTurn] = useState(initState);
  const [loggerData, setLoggerData] = useState([new Log('Welcome to the Tic Tac Toe game!')]);

  useEffect(() => {
    const playerSignValue = getCellSignValue(gameTurn.playerOnTurn);
    if (playerSignValue) {
      setLoggerData(prevState => {
        const updatedLoggerDataArr = [
          new Log(`Player with ${playerSignValue} is on turn.`),
          ...prevState
        ];
        // keeping array in limited length
        if (updatedLoggerDataArr.length > maxLoggerDataLength) {
          return updatedLoggerDataArr.slice(0, 10);
        }
        return updatedLoggerDataArr;
      })
    }
  }, [gameTurn.playerOnTurn]);

  useEffect(() => {
    // this will be called after the component rerenders (after JSX is returned)
    const sortedCells = getSortedCellValues(gameTurn.gameboard);
    const result = checkForWin(sortedCells);
    let timerId: number;

    // we have a winner
    if (result.isGameOver && (result.winner === true || result.winner === false)) {
      somePlayerDidAction = false;
      setGameTurn(prevState => {
        return {
          ...prevState,
          gameOver: true,
          winner: result.winner,
          winnerIndexes: result.winnerIndexes as WinnerIndexesType,
          playerOnTurn: null,
        }
      })
      setLoggerData(prevState => [
        new Log(`We have a winner!`),
        ...prevState
      ]);
    }

    // draw, no winner
    if (result.isGameOver && result.winner === null) {
      somePlayerDidAction = false;
      setGameTurn(prevState => {
        return {
          ...prevState,
          gameOver: true,
          winner: null,
          winnerIndexes: null,
          playerOnTurn: null,
        }
      })
      setLoggerData(prevState => [
        new Log(`Draw! No player has won.`),
        ...prevState
      ]);
    }

    // game reset in 3 sec, because game is over (we have a winner, or its a draw)
    if (result.isGameOver) {
      timerId = setTimeout(() => {
        setGameTurn({ ...initState, playerOnTurn: (Math.random() < 0.5) });
      }, 3000);
    }

    // switching player, because game continues
    if (!result.isGameOver && somePlayerDidAction) {
      setGameTurn(prevState => {
        return { ...prevState, playerOnTurn: !prevState.playerOnTurn }
      })
    }

    return () => {
      // cleanup function will be called when the component is unmounted
      clearTimeout(timerId); // timer reset
    }
  }, [gameTurn.gameboard]);

  const cellClickHandler = (e: React.MouseEvent) => {
    const clickedCellElement = e.target as HTMLDivElement;

    if (!gameTurn.gameOver && +clickedCellElement.dataset.value! === 0) { // only if cell is empty and game is not over
      const cellPosition = clickedCellElement.dataset.position!.split('');
      somePlayerDidAction = true;

      setGameTurn(prevState => {
        const gameboardArrCopy: GameBoardType = [
          [...prevState.gameboard[0]],
          [...prevState.gameboard[1]],
          [...prevState.gameboard[2]]
        ];
        const [firstIndex, lastIndex] = cellPosition.map(index => +index); // converting strings to numbers
        gameboardArrCopy[firstIndex][lastIndex] = prevState.playerOnTurn; // inserting value to clicked empty cell

        return {
          ...prevState,
          gameboard: gameboardArrCopy, // new gameboard state
          lastUpdatedCellPosition: cellPosition,
        }
      });

      // setLoggerData(prevState => {
      //   const [x, y] = [cellPosition[0], cellPosition[1]];
      //   const playerSignValue = getCellSignValue(gameTurn.playerOnTurn);

      //   return [
      //     new Log(`Value ${playerSignValue} has been inserted at (${x}, ${y}).`),
      //     ...prevState,
      //   ]
      // });
    }
  };

  return (
    <AppContainer>
      <GameWinnerCounter winner={gameTurn.winner} />
      <GameBoard
        state={gameTurn.gameboard}
        gameOver={{ status: gameTurn.gameOver, indexes: gameTurn.winnerIndexes }}
        onCellClick={cellClickHandler}
      />
      <GameLogger
        data={loggerData}
      />
    </AppContainer>
  )
}