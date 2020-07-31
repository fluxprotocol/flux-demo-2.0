import styled from 'styled-components';

const DateLabel = styled.div`
  width: 100%;
  margin: 0.8rem 0;
  margin-top: auto;
  padding: ${props => props.padding ? props.padding : 0};
  font-size: 0.8rem;
  text-align: ${props => props.textAlign ? props.textAlign : 'right'};
  color: ${props => props.themed ? props.theme.text : 'white'};
`;

export default DateLabel;
