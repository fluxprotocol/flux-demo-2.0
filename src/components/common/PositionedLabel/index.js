import styled from 'styled-components';

const PositionedLabel = styled.div`
  margin-right: ${props => props.position === 'left' ? 'auto' : 'initial'};
  margin-left: ${props => props.position === 'right' ? 'auto' : 'initial'};
  color: ${props => props.theme.text};
`;

export default PositionedLabel;
