import styled from 'styled-components';

const Button = styled.button`
  display: ${props => props.hideForSmall ? 'none' : 'inline-block'};
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : 'initial'};
  max-width: ${props => props.maxWidth ? props.maxWidth : 'initial'};
  margin: ${props => props.margin ? props.margin : 0};
  padding: ${props => props.small ? '0.2rem 1rem' : props.padding ? props.padding : '0.5rem 2rem'};
  background-color: ${props => props.color ? props.theme[props.color] : 'transparent'};
  font-size: ${props => props.small ? '0.8rem' : '1rem'};
  color: white;
  font-size: 0.9rem;
  font-weight: ${props => props.small ? 'normal' : 'bold'};
  border-radius: ${props => props.small ? '0.5rem' : '0.7rem'};
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid ${props => props.borderColor ? props.theme[props.borderColor] : props.theme[props.color]};
  box-shadow: ${props => props.shadow ? '0px 3px 10px rgba(0,0,0,0.4)' : 'none'};

  &.createMarketButton {
    display: none;
    background: #0F0E25;
    color: #C4FF88;
    border: none;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    padding: 0.5em 1em;

    img {
      padding-right: 0.7rem;
    }

    span {
      font-weight: 100;
    }
    
    @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: inline-block;
    margin: ${props => props.marginMedium ? props.marginMedium : props.margin ? props.margin : 0};
  }

  &:hover {
    opacity: 0.8;
  }

  &.cancelButton {
    border: none;
    color: gray;
    font-weight: 100;
    font-size: 1.2rem;
  }

  &.reviewButton {
    background: rgba(94, 0, 255, 100);
    border: none;
  }

  &.trade_button {
    font-size: 1.1em;
  }
`;

export default Button;
