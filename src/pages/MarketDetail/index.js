import React from 'react';
import { Link } from "react-router-dom";

// common
import ContentWrapper from '../../components/common/ContentWrapper';

// modules
import MainHeader from '../../components/modules/MainHeader';

const MarketOverview = props => {
  const market = {
    category: 'esports',
    description: 'This is a description for a specific market',
  }

  return (
    <ContentWrapper>
      <MainHeader market={market} />
      <ContentWrapper maxWidth addPadding>
        <h1>Market detail</h1>
        <Link to="/">Market overview</Link>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default MarketOverview;