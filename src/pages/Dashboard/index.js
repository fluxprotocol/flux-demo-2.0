import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// config
import { categoryFilters } from '../../config/filters';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OverviewToggle from '../../components/common/OverviewToggle';
import CategoryFilters from '../../components/modules/CategoryFilters';

// modules
import MainHeader from '../../components/modules/MainHeader';
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

const Dashboard = props => {
  const [markets, setMarkets] = useState([]);
  const [flux, _] = useContext(FluxContext);
  const [overviewType, setOverviewType] = useState('trade');

  useEffect(() => {
    if (markets.length === 0) {
      flux.getMarkets().then(res => {
        setMarkets(res);
      })
    }
  }, [markets, flux]);

  const handleOverviewToggle = (type) => {
    setOverviewType(type);
  }

  return (
    <BackgroundWrapper>
      <ContentWrapper maxWidth>
        <MainHeader />
        <OverviewToggle onToggle={handleOverviewToggle}/>
        <CategoryFilters filters={categoryFilters} />
        
        {overviewType === 'trade' &&
         <MarketOverview 
          markets={markets}
        />
        }

        {overviewType === 'resolute' &&
         <div>Resolute overview</div>
        }

      </ContentWrapper>
    </BackgroundWrapper>
  );
}

export default Dashboard;