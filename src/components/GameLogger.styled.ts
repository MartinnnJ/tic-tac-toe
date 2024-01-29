import styled from "styled-components";
import { device } from "../styles/Breakpoints";

interface LoggerMessageProps {
  $new: boolean;
}

export const Logger = styled.div`
  width: 100%;
  height: 20.5rem;
  padding: 2rem;
  padding-top: 0;
  text-align: center;
  overflow: hidden;

  mask-image: linear-gradient(to bottom, black 50%, transparent 100%); // bottom box fade effect
`;

export const LoggerMessage = styled.p<LoggerMessageProps>`
  font-size: ${({ $new }) => $new ? '3rem' : '2rem' };
  font-weight: ${({ $new }) => $new ? 500 : 400 };
  color: ${({ theme }) => theme.themeMainTextColor};
  padding: 1rem;

  @media ${device.xs} {
    font-size: ${({ $new }) => $new ? '2.5rem' : '1.5rem' };
    line-height: 1.5;
  }

  @media ${device.xxs} {
    font-size: ${({ $new }) => $new ? '2rem' : '1.25rem' };
    line-height: 1.5;
  }
`;