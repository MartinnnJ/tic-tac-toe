import styled from "styled-components";
import { device } from "../styles/Breakpoints";

interface GameBoardCellProps {
  $winCell: boolean;
}

export const StyledGameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${({ theme }) => theme.themeMainBgColor};
  border: 1px solid ${({ theme }) => theme.gameBoardBorderColor};
  box-shadow: ${({ theme }) => theme.gameBoardBoxShadow};
`;

export const GameBoardCell = styled.div<GameBoardCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 12rem;
  font-size: 7rem;
  border: 1px solid ${({ theme }) => theme.gameBoardBorderColor};
  cursor: pointer;

  @media ${device.xs} {
    width: 10rem;
    height: 10rem;
    font-size: 6rem;
  }

  @media ${device.xxs} {
    width: 9rem;
    height: 9rem;
    font-size: 5rem;
  }

  &[data-value="1"] {
    pointer-events: none;
    user-select: none;
    background-color: ${({ $winCell, theme }) => $winCell ? theme.winnerCellBgColor : undefined};
  }

  &:hover {
    background-color: ${({ theme }) => theme.cellBgHover};
  }
`;