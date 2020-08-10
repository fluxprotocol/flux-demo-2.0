import styled from 'styled-components';

const searchIcon = require('../../../assets/images/icons/search.png');

const Input = styled.input.attrs({ type: 'text' })`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  background: url(${searchIcon}) no-repeat scroll 0.8rem 0.5rem;
  background-size: 0.8rem 0.8rem;
  background-color: ${props => props.theme.darkPurple};
  color: white;
  border-radius: 0.5rem;
  border: none;
  outline: none;

  &::placeholder {
    color: ${props => props.theme.gray};
  }
`;

export default Input;
