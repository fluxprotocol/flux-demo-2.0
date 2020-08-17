import { createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};

    &.layover {
      overflow: hidden;
    }

    &.ReactModal__Body--open {
      overflow: hidden;
    }
  }`;
  