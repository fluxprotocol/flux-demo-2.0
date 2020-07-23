import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  padding: ${props => props.small ? '0.2rem 1rem' : '0.5rem 2rem'};
  background-color: ${props => props.theme[props.color]};
  font-size: ${props => props.small ? '0.8rem' : '1rem'};
  color: white;
  font-weight: ${props => props.small ? 'regular' : 'bold'};
  border-radius: ${props => props.small ? '0.5rem' : '0.7rem'};
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
