import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// common
import MarketCard from '../MarketCard';

const MarketCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const MarketOverview = props => {
  return (
    <MarketCardContainer>
      {props.markets.map((market, index) => (
        <MarketCard
          key={market.id}
          market={market}
          cardType={props.type}
        >
          <Link to="/detail">{market.description}</Link>
        </MarketCard>
      ))}
    </MarketCardContainer>
  );
}

export default MarketOverview;