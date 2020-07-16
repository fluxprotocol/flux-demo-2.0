import React, { useState, useEffect } from 'react';

// common
import ContentWrapper from '../../components/common/ContentWrapper';

// modules
import MainHeader from '../../components/modules/MainHeader';
import MarketOverview from '../../components/modules/MarketOverview';

const Dashboard = props => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = () => {
    setMarkets([
      {
        name: 'market one',
        id: '5rgret98y6h8r98gt',
      }, 
      {
        name: 'market two',
        id: '4tegregdt4et46j43',
      }, 
      {
        name: 'market three',
        id: '6r89y5959g8r9hhtr8',
      }
    ])
  }

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