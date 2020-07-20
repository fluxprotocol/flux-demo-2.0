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
    if (markets.length == 0) {
      flux.getMarkets().then(res => {
        setMarkets(res);
      })
    }
  }, []);

<<<<<<< HEAD
=======
  const getMarkets = () => {
    setMarkets([
      {
        title: 'Jon jones will fight MMA again by september 30th 2020?',
        category: 'sports',
        id: '5rgret98y6h8r98gt',
      }, 
      {
        title: 'Will GOLD reach $1800 usd in 2020?',
        category: 'stockmarket',
        id: '4tegregdt4et46j43',
      }, 
      {
        title: 'Will PSG.LGD be the next ESL One champion of 2020?',
        category: 'esports',
        id: '6r89y5959g8r9hhtr8',
      }, {
        title: 'Will Ethereum explode in 2020?',
        category: 'crypto',
        id: '4grgegreggergrdg',
      }, 
      {
        title: 'Will SpaceX launch a second manned mission in 2020?',
        category: 'startups',
        id: 'j5t6jrrhreg4gr',
      }, 
      {
        title: 'Which presidential candidate will be elected in 2020?',
        category: 'viral',
        id: 'h6rhtrthryj65',
      }
    ])
  }

>>>>>>> 3d478c3762a289313f7c18c67e273cc28ffa2245
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