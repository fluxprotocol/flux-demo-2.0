import styled from 'styled-components';

const Paragraph = styled.p`
  max-width: ${props => props.maxWidth ? props.maxWidth : '100%'};
  margin: ${props => props.margin ? props.margin : 0};
  font-size: ${props => props.size ? props.size : '1rem'};
  color: ${props => props.color ? props.theme[props.color] : props.theme.text};
  line-height: ${props => props.lineHeight ? props.lineHeight : 'initial'};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal' };
  opacity: ${props => props.opacity ? props.opacity : 1 };
`;

export default Paragraph;
