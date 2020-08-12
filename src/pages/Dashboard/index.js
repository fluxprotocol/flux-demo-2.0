import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

// hooks
import { useFluxAuth } from '../../App';

// config
import { categoryFilters } from '../../config/filters';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OverviewToggle from '../../components/common/OverviewToggle';
import CategoryFilters from '../../components/common/CategoryFilters';
import Paragraph from '../../components/common/Paragraph';

// modules
import MarketOverview from '../../components/modules/MarketOverview';

// context
import { FluxContext } from '../../context/FluxProvider';

const BackgroundWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    min-height: 100vh;
    background: url(${props => props.theme.backgroundWave}) no-repeat;
    background-size: 100%;
    background-color: ${props => props.theme.background };
  }
`;

const WelcomeHeader = styled.h1`  
  margin-top: 2rem;
  font-size: 1.5rem;
`;

const Dashboard = props => {
  const { user } = useFluxAuth();
  const [markets, setMarkets] = useState([]);
  const [resoluteMarkets, setResoluteMarkets] = useState([]);
  const [flux, _] = useContext(FluxContext);
  const [overviewType, setOverviewType] = useState('trade');
  const [activeFilters, setActiveFilters] = useState([]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    getMarkets();
  }, []);

  const handleOverviewToggle = (type) => {
    setOverviewType(type);
  }

  const getMarkets = () => {
    const params = {};

    if (activeFilters.length) params.categories = activeFilters;
    else if (params.categories) delete params.categories;

    flux.getMarkets(params, 100, 0).then(res => {
      getLastFilledPrices(params, res);
    })

    flux.getMarkets(params, 100, 0).then(res => {
      setResoluteMarkets(res);
    })
  }

  const getLastFilledPrices = async (params, marketArr) => {
    const prices = await flux.getLastFilledPrices(params, 10, 0);
    const currentMarkets = marketArr;
    currentMarkets.forEach((market, index) => {
      if (prices[market.id]) market.prices = prices[market.id];
      else market.prices = [];
    });
    setMarkets(currentMarkets);
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    getMarkets();
  }, [activeFilters])

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    const filterIndex = activeFilters.indexOf(filter);

    if (filterIndex === -1) setActiveFilters([ ...activeFilters, filter]); 
    else setActiveFilters(activeFilters.filter(item => item !== filter))
  }

  return (
    <BackgroundWrapper>
      <ContentWrapper maxWidth="68rem">
        <ContentWrapper padding="1rem">
          <WelcomeHeader>Welcome { (user && user.id) ? user.id : '' }</WelcomeHeader>
          <Paragraph
            margin="0.5rem 0 0 0"
            size="0.8rem"
            opacity="0.7"
          >
            These are the latest trends.
          </Paragraph>
        </ContentWrapper>
        <OverviewToggle onToggle={handleOverviewToggle}/>
        
        <ContentWrapper padding="1rem">
          <CategoryFilters 
            filters={categoryFilters} 
            filterChange={handleFilterChange}
          />
        </ContentWrapper>

        {(overviewType === 'trade' && markets.length) ? (
          <MarketOverview 
            markets={markets}
            type="trade"
          />
        ) : (overviewType === 'resolute' && resoluteMarkets.length) ? (
          <MarketOverview 
            markets={resoluteMarkets}
            type="resolute"
          />
        ) : (
          <ContentWrapper padding="1rem">
            <p>No markets found.</p>
          </ContentWrapper>
        )}

      </ContentWrapper>
    </BackgroundWrapper>
  );
}

export default Dashboard;