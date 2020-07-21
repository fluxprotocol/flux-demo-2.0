import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// config
import { categoryFilters } from '../../config/filters';

// common
import ContentWrapper from '../../components/common/ContentWrapper';

// modules
import MainHeader from '../../components/modules/MainHeader';
import CategoryFilters from '../../components/modules/CategoryFilters';
import MarketOverview from '../../components/modules/MarketOverview';

// context
import { FluxContext } from '../../context/FluxProvider';

const BackgroundWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    background: url(${props => props.theme.backgroundWave}) no-repeat;
    background-size: 100%;
    background-color: ${props => props.theme.background };
  }
`;

const Dashboard = props => {
  const [markets, setMarkets] = useState([]);
  const [flux, _] = useContext(FluxContext);

  useEffect(() => {
    if (markets.length === 0) {
      flux.getMarkets().then(res => {
        setMarkets(res);
      })
    }
  }, [markets, flux]);

  return (
    <BackgroundWrapper>
      <ContentWrapper maxWidth>
        <MainHeader />
        <CategoryFilters filters={categoryFilters} />
        <MarketOverview 
          markets={markets}
        />
      </ContentWrapper>
    </BackgroundWrapper>
  );
}

export default Dashboard;