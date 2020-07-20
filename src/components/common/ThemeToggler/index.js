import React from 'react'
import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;

<<<<<<< HEAD
const Toggle = ({theme,  toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
          Switch Theme
        </Button>
=======
const Toggle = ({ toggleTheme }) => {
    return (
      <Button onClick={toggleTheme} >
        Switch Theme
      </Button>
>>>>>>> 3d478c3762a289313f7c18c67e273cc28ffa2245
    );
};

export default Toggle;