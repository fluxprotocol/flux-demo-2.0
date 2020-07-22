import styled from 'styled-components';

const ContentWrapper = styled.div`
  max-width: ${props => props.maxWidth ? '78rem' : 'none'};
  margin: 0 auto;
  padding: ${props => props.addPadding ? '1rem' : 0};
  background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};
`;

export default ContentWrapper;
