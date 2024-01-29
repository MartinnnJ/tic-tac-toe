import { counterIncrementValue, players } from "../helpers/constants";
import { CounterContainer, Counter } from "./GameWinnerCounter.styled";

interface GameWinnerCounterProps {
  winner: null | boolean;
}

const counter = [0, 0]; // derived state

const GameWinnerCounter: React.FC<GameWinnerCounterProps> = ({ winner }) => {
  let [firstPlayerAnimate, secondPlayerAnimate] = [false, false];

  const firstPlayerSign = players[0];
  const secondPlayerSign = players[1];

  if (winner === true) {
    counter[0] += counterIncrementValue;
    firstPlayerAnimate = true;
  }

  if (winner === false) {
    counter[1] += counterIncrementValue;
    secondPlayerAnimate = true;
  }

  return (
    <CounterContainer>
      <p>
        {firstPlayerSign}
        <Counter
          $zoom={firstPlayerAnimate}
        >
          {counter[0]}
        </Counter>
        <span className="divider">:</span>
        <Counter
          $zoom={secondPlayerAnimate}
        >
          {counter[1]}
        </Counter>
        {secondPlayerSign}
      </p>
    </CounterContainer>
  )
};

export default GameWinnerCounter;