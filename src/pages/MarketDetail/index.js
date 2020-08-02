import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OrderBookBarChart from '../../components/common/OrderBookBarChart';
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

const PurchaseWrapper = styled.div`
  width: 100%;
`;

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const DetailWrapper = styled.div`
  & > table {
    display: flex;
    flex-direction: column;
  }

  & > table tr {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  & > table hr {
    width: 95%;
    margin: 0 auto;
    margin-top: 1em;
    height: 1px;
    color: rgba(216, 216, 216, .4);
  }
`;

const DetailHeading = styled.th`
  font-weight: 100;
  font-size: .8em;
  margin: 2em 1em 0 1em;
`;

const DetailData = styled.td`
  font-size: 1.5em;
  margin: 1em 1em 0 1em;

  &.bold {
    font-weight: 900;
    margin-left: 1.5em;
  }

  &.callToAction {
    background: ${props => props.backgroundColor ? props.backgroundColor : '#5400FF'};
    border-radius: 15px;
    padding: .5em 1.2em;
    text-transform: uppercase;
    text-align: right;
    width: 6.5em;
    font-size: 1em;
    font-weight: 900;
  }
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
              <OrderBookBarChart />
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
                    <PurchaseWrapper>
                      <ActionTitle textAlign="center">
                        Purchase Shares
                      </ActionTitle>
                      <DetailWrapper>
                        <table>
                          <tr>
                            <DetailHeading>last forecast</DetailHeading>
                            <DetailHeading>market price</DetailHeading>
                          </tr>
                          <tr>
                            <DetailData>40%</DetailData>
                            <DetailData 
                              className="bold"
                            >
                              30c
                            </DetailData>
                            <DetailData
                              className="callToAction"
                            >
                              buy yes
                            </DetailData>
                          </tr>
                          <hr className="border" />
                          <tr>
                            <DetailData>45%</DetailData>
                            <DetailData 
                              className="bold"
                            >
                              55c
                            </DetailData>
                            <DetailData
                              className="callToAction"
                              backgroundColor="#FF009C"
                            >
                              buy no
                            </DetailData>
                          </tr>
                        </table>
                      </DetailWrapper>
                    </PurchaseWrapper>
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