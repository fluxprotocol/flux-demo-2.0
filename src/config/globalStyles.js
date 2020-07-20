import { createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
<<<<<<< HEAD
=======
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

>>>>>>> 3d478c3762a289313f7c18c67e273cc28ffa2245
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
  }
  `