import React from 'react';
import styled from 'styled-components';

// common
import { FlexWrapper } from '../../common/Flex';
import ContentWrapper from '../../common/ContentWrapper';
// import ThemeToggler from '../../common/ThemeToggler';

const Logo = styled.img`
  width: 4rem;
`;

const TopBar = props => {
  return (
    <ContentWrapper
      backgroundColor="darkBlue"
      addPadding
    >
      <ContentWrapper maxWidth>
        <FlexWrapper></FlexWrapper>
        <Logo 
          src={require(`../../../assets/images/flux-logo.png`)}
          alt="Flux"
        />
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default TopBar;