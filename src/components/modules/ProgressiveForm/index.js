import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

const formTitle = styled.h3`
  color: white;
`;

const MarketOverview = props => {
  return (
    <ContentWrapper>
      <formTitle>Purchase Shares</formTitle>
    </ContentWrapper>
  );
}

export default MarketOverview;