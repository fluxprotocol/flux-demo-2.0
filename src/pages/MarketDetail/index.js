import React from 'react';
import { Link } from "react-router-dom";

// common
import ContentWrapper from '../../components/common/ContentWrapper';

// modules
import MainHeader from '../../components/modules/MainHeader';

const MarketOverview = props => {

  return (
    <ContentWrapper>
      <MainHeader />
      <h1>Market detail</h1>
      <Link to="/">Market overview</Link>
    </ContentWrapper>
  );
}

export default MarketOverview;