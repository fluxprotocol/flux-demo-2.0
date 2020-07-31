import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// hooks
import { useFluxAuth } from '../../App';

// config
import { categoryFilters } from '../../config/filters';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OverviewToggle from '../../components/common/OverviewToggle';
import CategoryFilters from '../../components/common/CategoryFilters';

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

const WelcomeSub = styled.p`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

const Dashboard = props => {
  const { user } = useFluxAuth();
  const [markets, setMarkets] = useState([]);
  const [resoluteMarkets, setResoluteMarkets] = useState([]);
  const [flux, _] = useContext(FluxContext);
  const [overviewType, setOverviewType] = useState('trade');

  useEffect(() => {
    if (markets.length === 0) {
      flux.getMarkets().then(res => {
        setMarkets(res);
        setResoluteMarkets(res);
      })
    }
  }, [markets, flux]);

  const handleOverviewToggle = (type) => {
    setOverviewType(type);
  }

  return (
    <BackgroundWrapper>
      <ContentWrapper maxWidth>
        <ContentWrapper padding="1rem">
          <WelcomeHeader>Welcome { (user && user.id) ? user.id : '' }</WelcomeHeader>
          <WelcomeSub>These are the latest trends.</WelcomeSub>
        </ContentWrapper>
        <OverviewToggle onToggle={handleOverviewToggle}/>
        
        <ContentWrapper padding="1rem">
          <CategoryFilters filters={categoryFilters} />
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