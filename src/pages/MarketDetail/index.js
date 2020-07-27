import React from 'react';
import { Link } from "react-router-dom";

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OrderBookBarChart from '../../components/common/OrderBookBarChart';

// modules
import MainHeader from '../../components/modules/MainHeader';

const MarketOverview = props => {

  return (
    <ContentWrapper>
      <MainHeader />
      <Link to="/">Market overview</Link>
      <OrderBookBarChart />
    </ContentWrapper>
  );
}

export default MarketOverview;