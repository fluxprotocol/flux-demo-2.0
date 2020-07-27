import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'initial'};
  padding: ${props => props.padding ? props.padding : 0};
  width: ${props => props.width ? props.width : 'auto'};
  margin: ${props => props.margin ? props.margin : 0};
`;

export const FlexItem = styled.div`
  flex:1;
  margin: ${props => props.margin ? props.margin : 0};
  padding: ${props => props.padding ? props.padding : '0'};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
  color: ${props => props.color ? props.color : props.theme.text};
  background: ${props => props.backgroundColor ? props.backgroundColor : 'none'};
  width: ${props => props.width ? props.width : 'initial'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'initial'};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};

  &.active {
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
  }
`;
