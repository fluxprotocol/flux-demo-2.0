import styled from 'styled-components';

const CategoryLabel = styled.div`
  display: ${props => props.hideForSmall ? 'none' : 'block'};
  margin: 0.8rem 0;
  font-size: 0.8rem;
  color: white;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: block;
  }
`;

export default CategoryLabel;
