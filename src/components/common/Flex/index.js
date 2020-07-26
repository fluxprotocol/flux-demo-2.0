import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'initial'};
  padding: ${props => props.padding ? props.padding : 0};
  width: ${props => props.width ? props.width : 'auto'};
`;

export const FlexItem = styled.div`
  flex:1;
  margin: ${props => props.margin ? props.margin : 0};
  padding: ${props => props.padding ? props.padding : '0'};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
  color: ${props => props.color ? props.color : 'white'};
  background: ${props => props.backgroundColor ? props.backgroundColor : 'none'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'initial'};
  &.active {
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
  }
`;
