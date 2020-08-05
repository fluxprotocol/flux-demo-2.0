import styled from 'styled-components';

const ContentCard = styled.div`
  display: ${props => props.display ? props.display : 'flex'};
  padding: ${props => props.padding ? props.padding : '1rem'};
  background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : props.theme.contentCardBackground};
  border-radius: ${props => props.smallNoRadius ? 0 : '1rem'};
  box-shadow: ${props => props.smallNoRadius ? 0 : '0 2px 10px rgba(0,0,0,0.1)'};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    padding: ${props => props.paddingMedium ? props.paddingMedium : props.padding ? props.padding : '1rem'};
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
`;

export default ContentCard;
