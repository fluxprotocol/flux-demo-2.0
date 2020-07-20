import styled from 'styled-components';

const ContentWrapper = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  padding: ${props => props.addPadding ? '1rem' : 0}
`;

export default ContentWrapper;
