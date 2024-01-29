import styled from "styled-components";
import { device } from "../styles/Breakpoints";

interface CounterProps {
  $zoom: boolean;
}

export const CounterContainer = styled.div`
  min-width: 36rem;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.themeMainBgColor};
  box-shadow: ${({ theme }) => theme.counterContainerBoxShadow};

  @media ${device.xs} {
    min-width: 30rem;
  }

  @media ${device.xxs} {
    min-width: 27rem;
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 5rem;

    @media ${device.xs} {
      font-size: 3.5rem;
    }

    @media ${device.xxs} {
      font-size: 3rem;
    }
  }

  .divider {
    font-weight: 600;
    color: ${({ theme}) => theme.themeMainTextColor};
  }
`;

export const Counter = styled.span<CounterProps>`
  min-width: 7.5rem;
  font-size: 7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.themeMainTextColor};
  text-align: center;

  animation: ${({ $zoom }) => $zoom ? 'zoom-in-out .25s ease-out' : undefined};

  @media ${device.xs} {
    font-size: 5.5rem;
  }

  @media ${device.xxs} {
    font-size: 5rem;
  }
`;