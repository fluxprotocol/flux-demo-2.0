import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../components/common/Flex';
import ContentCard from '../../components/common/ContentCard';
import PositionedLabel from '../../components/common/PositionedLabel';

// modules
import MainHeader from '../../components/modules/MainHeader';
import ProgressiveForm from '../../components/modules/ProgressiveForm';

// context
import { FluxContext } from '../../context/FluxProvider';

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions';

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const MarketOverview = props => {
  const { id } = useParams();
  const [flux, _] = useContext(FluxContext);
  const [market, setMarket] = useState({});
  const { width } = useWindowDimensions();

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
      <ContentWrapper backgroundColor="darkBlue">
        <ContentWrapper
          maxWidth
          padding="1rem"
          paddingSmall="0"
        >
          <FlexWrapper flexDirection="column" columnForSmall>
            <FlexItem width="100%">
              orderbook
            </FlexItem>
            <FlexItem  width="100%">
              <ContentWrapper>
                <ContentCard smallNoRadius backgroundColor="mediumBlue">
                  
                  {/* buying power: mobile */}
                  {width < 650 &&
                    <ContentWrapper width="100%">
                      <FlexWrapper>
                        <PositionedLabel position="left">Buying power</PositionedLabel>
                        <PositionedLabel position="right">$150.000</PositionedLabel>
                      </FlexWrapper>
                    </ContentWrapper>
                  }

                  {/* purchase shares: tablet/desktop */}
                  {width >= 650 &&
                    <div>
                      <ActionTitle textAlign="center">
                        Purchase Shares
                      </ActionTitle>
                    </div>
                  }

                </ContentCard>
                {/* <ProgressiveForm /> */}
              </ContentWrapper>
            </FlexItem>
          </FlexWrapper>
        </ContentWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default MarketOverview;