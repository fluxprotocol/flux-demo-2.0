import styled from 'styled-components';

const ContentCard = styled.div`
  display: ${props => props.display ? props.display : 'flex'};
  padding: 1rem;
  background-color: ${props => props.theme.contentCardBackground};
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export default ContentCard;
