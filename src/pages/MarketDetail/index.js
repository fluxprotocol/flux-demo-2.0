import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../components/common/Flex';

// modules
import MainHeader from '../../components/modules/MainHeader';

// context
import { FluxContext } from '../../context/FluxProvider';

const MarketOverview = props => {
  const { id } = useParams();
  const [flux, _] = useContext(FluxContext);
  const [market, setMarket] = useState({});

  useEffect(() => {
    getMarket();
  }, []);

  const getMarket = async () => {
    const market = await flux.getMarket(id);
    setMarket(market[0]);
  }

  return (
    <ContentWrapper>
      <MainHeader market={market} />
      <ContentWrapper maxWidth>
        <FlexWrapper>
          <FlexItem>
            orderbook
          </FlexItem>
          <FlexItem>
            purchase shares
          </FlexItem>
        </FlexWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default MarketOverview;