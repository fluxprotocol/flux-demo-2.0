import styled, { css } from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  align-items: ${props => props.alignItems ? props.alignItems : 'initial'};
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'initial'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'intial'};
  align-items: ${props => props.alignItems ? props.alignItems : 'intial'};
  padding: ${props => props.paddingSmall ? props.paddingSmall : props.padding ? props.padding : 0};
  height: ${props => props.height ? props.height : 'auto'}; 
  width: ${props => props.width ? props.width : 'auto'};
  margin: ${props => props.margin ? props.margin : 0};
  background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    flex-direction: ${props => props.columnForSmall ? 'row' : props.flexDirection ? props.flexDirection : 'initial'};
    padding: ${props => props.padding ? props.padding : 0};
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    max-width: ${props => props.maxWidth ? props.maxWidth : 'initial'};
  }

  &.input_divider {
    display: flex;
    align-items: center;
  }
`;

export const FlexItem = styled.div`
  display: ${props => props.hideForSmall ? 'none' : 'initial'};
  flex: ${props => props.flex ? props.flex : '1'};
  margin: ${props => props.margin ? props.margin : 0};
  padding: ${props => props.padding ? props.padding : '0'};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
  color: ${props => props.color ? props.color : props.theme.text};
  background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : 'initial'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'initial'};
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};

  &.marketPrice {
    position: relative;
    align-self: center;
  }

  &.active {
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
  }

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: ${props => props.hideForMedium ? 'none' : 'initial'};

    ${props => props.paddingMedium && css`
      padding: ${props => props.paddingMedium ? props.paddingMedium : '0'};
    `}
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    display: ${props => props.hideForLarge ? 'none' : 'initial'};

    ${props => props.paddingLarge && css`
      padding: ${props => props.paddingLarge ? props.paddingLarge : '0'};
    `}
  }

  &.inputError {
    color: red;
  }

  &.finalOrderOverview {
    background: #5e00ff;
    position: relative;
  }
`;
