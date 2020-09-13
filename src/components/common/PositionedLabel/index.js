import styled from 'styled-components';

const PositionedLabel = styled.div`
  margin-right: ${props => props.position === 'left' ? 'auto' : 'initial'};
  margin-left: ${props => props.position === 'right' ? 'auto' : 'initial'};
  padding-top: 1.2em;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    padding-top: 0;
  }
  color: ${props => props.theme.text};
`;

export default PositionedLabel;
