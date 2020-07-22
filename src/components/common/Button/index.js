import styled from 'styled-components';

const Button = styled.button`
  padding: 0.5rem 2rem;
  background-color: ${props => props.theme[props.color]};
  font-size: 1rem;
  color: white;
  font-weight: bold;
  border-radius: 0.7rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid ${props => props.borderColor ? props.borderColor : props.theme[props.color]};

  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
