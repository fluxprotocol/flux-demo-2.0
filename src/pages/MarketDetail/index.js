import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import OrderBookBarChart from '../../components/common/OrderBookBarChart';
import { FlexWrapper, FlexItem } from '../../components/common/Flex';
import ContentCard from '../../components/common/ContentCard';
import PositionedLabel from '../../components/common/PositionedLabel';
import Button from '../../components/common/Button';
import Layover from '../../components/common/Layover';

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
  const [showForm, setShowForm] = useState(false);

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
          <FlexWrapper 
            flexDirection="column"
            columnForSmall
            alignItems="flex-start"
          >
            <FlexItem 
              width="100%"
              paddingMedium="0 1rem 0 0"
              paddingLarge="0 4rem 0 0"
            >
              <OrderBookBarChart />
            </FlexItem>
            <FlexItem
             width="100%"
             paddingMedium="2rem 0 0 1rem"
             paddingLarge="2rem 4rem 0 0"
             >
              <ContentWrapper>
                <ContentCard
                  paddingMedium="0"
                  smallNoRadius
                  backgroundColor="mediumBlue"
                >
                  
                  {/* buying power: mobile */}
                  {width < 650 &&
                    <ContentWrapper width="100%">
                      <FlexWrapper>
                        <PositionedLabel position="left">Buying power</PositionedLabel>
                        <PositionedLabel position="right">
                          <strong>$150.000</strong>
                        </PositionedLabel>
                      </FlexWrapper>
                      <FlexWrapper 
                        margin="3rem 0"
                      >
                        <FlexItem>
                          <ContentWrapper>
                            <strong>total volume</strong>
                          </ContentWrapper>
                          10,500
                        </FlexItem>
                        <FlexItem textAlign="right">
                          <Button
                            maxWidth="10rem"
                            shadow
                            width="100%"
                            color="lightPurple"
                            onClick={ () => {
                              setShowForm(true);
                              document.body.classList.add('layover');
                            }}
                          >Trade</Button>
                        </FlexItem>
                      </FlexWrapper>
                    </ContentWrapper>
                  }

                  {/* purchase shares: tablet/desktop */}
                  {width >= 650 &&
                    <PurchaseWrapper>
                      <ProgressiveForm market={market} />
                    </PurchaseWrapper>
                  }

                </ContentCard>
                {/* <ProgressiveForm /> */}
              </ContentWrapper>
            </FlexItem>
          </FlexWrapper>
        </ContentWrapper>
      </ContentWrapper>

      {/* layover for mobile */}
      {(width < 650 && showForm) &&
        <Layover>
          <FlexWrapper height="100%">
            <ProgressiveForm layover market={market} />
          </FlexWrapper>
        </Layover>
      }

    </ContentWrapper>
  );
}

export default MarketOverview;