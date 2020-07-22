import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'initial'};
`;

export const FlexItem = styled.div`
`;
