import React, { useState, useEffect, useContext } from 'react';

// common
import ContentWrapper from '../../components/common/ContentWrapper';

// modules
import MainHeader from '../../components/modules/MainHeader';
import MarketOverview from '../../components/modules/MarketOverview';

// context
import { FluxContext } from '../../context/FluxProvider';

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
    <ContentWrapper>
      <MainHeader />
      <MarketOverview 
       markets={markets}
      />
    </ContentWrapper>
  );
}

export default Dashboard;