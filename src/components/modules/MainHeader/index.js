import React from 'react';

// common
import ContentWrapper from '../../common/ContentWrapper';

const MainHeader = props => {
  
  return (
    <ContentWrapper backgroundColor={props.market.category}>
      <ContentWrapper maxWidth addPadding>
        HEADER
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default MainHeader;