import styled from 'styled-components';

const ProgressBar = styled.div`
  height: 0.5rem;
  width: 100%;
  margin: 0.5rem 0;
  background-color: ${props => props.theme.pink};
  border-radius: 0.5rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 0.5rem;
    width: 75%;
    background-color: ${props => props.theme.green};
  }
`;

export default ProgressBar;