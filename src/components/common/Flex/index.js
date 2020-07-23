import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'initial'};
  padding: ${props => props.padding ? props.padding : 0};
`;

export const FlexItem = styled.div`
  flex:1;
  margin: ${props => props.margin ? props.margin : 0};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
  color: white;
`;
