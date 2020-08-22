import styled from 'styled-components';

const InlineContentWrapper = styled.div`
  display: ${props => props.hideForSmall ? 'none' : 'inline-block'};
  position: ${props => props.position ? props.position : 'initial'};
  height: ${props => props.height ? props.height : 'auto'};
  min-height: initial;
  width: ${props => props.width ? props.width : 'initial'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'none'};
  margin: ${props => props.margin ? props.margin : '0 auto'};
  padding: ${props => props.paddingSmall ? props.paddingSmall : props.padding ? props.padding : 0};
  background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
  border-top: ${props => props.borderTop ? props.borderTop : 'none'};
  overflow: ${props => props.overflow ? props.overflow : 'initial'};
  cursor: ${props => props.cursor ? props.cursor : 'initial'};

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: ${props => props.hideForMedium ? 'none' : 'inline-block'};
    min-height: ${props => props.minHeight ? props.minHeight : 'initial'};
    padding: ${props => props.padding ? props.padding : 0};
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    display: ${props => props.hideForLarge ? 'none' : 'inline-block'};
  }

  & div.contractRow {
    border-bottom: 1px solid white;
  }

  &.purchase_shares {
    margin-top: 1em;
  }
`;

export default InlineContentWrapper;
