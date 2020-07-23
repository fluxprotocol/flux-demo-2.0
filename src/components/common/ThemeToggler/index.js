import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  transform: translateY(-0.3rem);
  margin-left: 0.5rem;
  padding: 0.2rem 1rem;
  background: white;
  border: 2px solid ${props => props.theme.background};
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  outline: none;
`;

const Toggle = ({ toggleTheme }) => {
    return (
      <Button onClick={toggleTheme}></Button>
    );
};

export default Toggle;