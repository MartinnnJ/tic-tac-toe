import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; // 1rem = 10px
    background: ${({ theme }) => theme.themeMainBgColor};
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.6rem;
    box-sizing: border-box;
    padding: 2rem 0;
    max-width: 1440px;
    margin: 0 auto;
  }

  ul {
    list-style: none;
  }

  @keyframes zoom-in-out {
    from {
      transform: scale(1.0);
    }
    to {
      transform: scale(1.4);
    }
  }
`;