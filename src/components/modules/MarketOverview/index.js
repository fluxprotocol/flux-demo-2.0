import React from 'react';
import { Link } from "react-router-dom";

// common
import ContentWrapper from '../../common/ContentWrapper';
import MarketCard from '../../common/MarketCard';

const MarketOverview = props => {
  return (
    <ContentWrapper>
      <h1>Market overview</h1>
      {props.markets.map((market, index) => (
        <MarketCard
          key={market.id} 
        >
          <Link to="/detail">{market.name}</Link>
        </MarketCard>
      ))}
    </ContentWrapper>
  );
}

export default MarketOverview;