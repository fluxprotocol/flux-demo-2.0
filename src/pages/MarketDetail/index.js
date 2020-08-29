import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import moment from 'moment';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import MarketDetailData from '../../components/modules/MarketDetailData';
import { FlexWrapper, FlexItem } from '../../components/common/Flex';
import ContentCard from '../../components/common/ContentCard';
import PositionedLabel from '../../components/common/PositionedLabel';
import Button from '../../components/common/Button';
import Layover from '../../components/common/Layover';
import Paragraph from '../../components/common/Paragraph';
import Footer from '../../components/common/Footer';

// modules
import MainHeader from '../../components/modules/MainHeader';
import ProgressiveForm from '../../components/modules/ProgressiveForm';

// context
import { FluxContext } from '../../context/FluxProvider';

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions';

// helpers
import { mapOutcomes } from '../../helpers/mappers';

const PurchaseWrapper = styled.div`
  width: 100%;
`;

// const signUpBackground = require('../../assets/images/signup-background.png');
// const SignUpBlock = styled.div`
//   background: url(${signUpBackground}) no-repeat;
//   background-size: cover;
//   padding: 2rem;
//   border-radius: 2rem;
//   overflow: hidden;
// `;

const MarketOverview = props => {
  const { id } = useParams();
  const [flux, _] = useContext(FluxContext);
  const [market, setMarket] = useState({});
  const [outcomeColorNameMap, setOutcomeColorNameMap] = useState({});
  const [priceHistory, setPriceHistory] = useState([]);
  const [orderbookData, setOrderbookData] = useState([]);
  const [avgPriceData, setAveragePriceData] = useState([]);
  const [marketPricesData, setMarketPrices] = useState([]);
  const [lastFilledPricesForMarket, setLastFilledPrice] = useState({});
  const { width } = useWindowDimensions();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getMarket();
    getPriceHistory('all');
    getOrderbookData();
    getAveragePrices();
    getMarketPrices();
  }, []);

  const getMarket = async () => {
    const market = await flux.getMarket(id);
    const lastFilledPricesForMarket = await flux.getLastFilledPricesForMarket(id);
    console.log(market)
    setMarket(market[0]);
    setLastFilledPrice(lastFilledPricesForMarket);
  }

  useEffect(() => {
    if (!market || !market.outcome_tags) return;

    const outcomeObject = mapOutcomes(market.outcome_tags);
    setOutcomeColorNameMap(outcomeObject);
  }, [market])

  const getPriceHistory = async (type) => {
    const daysMap = {
      '1D': {
        substractAmount: 1,
        substractType: 'days',
        dataTypes: ['hour'],
      },
      '1W': {
        substractAmount: 7,
        substractType: 'days',
        dataTypes: ['day'],
      },
      '1M': {
        substractAmount: 1,
        substractType: 'months',
        dataTypes: ['day'],
      },
      '3M': {
        substractAmount: 3,
        substractType: 'months',
        dataTypes: ['day'],
      },
      '6W': {
        substractAmount: 6,
        substractType: 'weeks',
        dataTypes: ['day'],
      },
      'all': {
        substractAmount: 12,
        substractType: 'months',
        dataTypes: ['week'],
      },
    };

    const fromDate = moment().subtract(daysMap[type].substractAmount, daysMap[type].substractType).format('YYYY-MM-DD');
    const toDate = moment().format('YYYY-MM-DD');

    const allPriceHistory = await flux.getPriceHistory(id, fromDate, toDate, daysMap[type].dataTypes);

    setPriceHistory(allPriceHistory);
  }

  const getOrderbookData = async () => {
    const obData = await flux.getOrderbook(id);
    setOrderbookData(obData);
  } 

  const getAveragePrices = async () => {
    const averagePriceData  = await flux.getAvgPricesOnDate(id);
    setAveragePriceData(averagePriceData);
  }

  const getMarketPrices = async () => {
    const marketPrices = await flux.getMarketPrices(id);
    setMarketPrices(marketPrices);
  }
  
  return (
    <ContentWrapper>
        <MainHeader 
          market={market}
          outcomes={outcomeColorNameMap}
          lastFilledPrices={lastFilledPricesForMarket}
        />
        <ContentWrapper 
          backgroundColor="darkBlue"
          padding="0 0 1rem 0"
        >
          <ContentWrapper
            maxWidth="62rem"
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
                <MarketDetailData 
                  priceHistory={priceHistory} 
                  orderbookData={orderbookData}
                  market={market} 
                  filterChange={getPriceHistory}
                  outcomeColorNameMap={outcomeColorNameMap}
                  averagePriceData={avgPriceData}
                />
              </FlexItem>
              <FlexItem
              width="100%"
              height="100%"
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
                            >
                              Trade
                            </Button>
                          </FlexItem>
                        </FlexWrapper>
                      </ContentWrapper>
                    }

                    {/* purchase shares: tablet/desktop */}
                    {width >= 650 &&
                      <PurchaseWrapper>
                        <ProgressiveForm 
                          market={market}
                          marketPricesData={marketPricesData}
                          lastFilledPrices={lastFilledPricesForMarket} 
                        />
                      </PurchaseWrapper>
                    }

                  </ContentCard>
                  {/* <ProgressiveForm /> */}
                </ContentWrapper>
              </FlexItem>
            </FlexWrapper>

          </ContentWrapper>
        </ContentWrapper>
        <ContentWrapper
          backgroundColor="background"
          padding="1em 0"
        >
          <ContentWrapper
            margin="2rem auto"
            padding="1rem"
            maxWidth="60rem"
          >
            <Paragraph
              size="1.5rem"
              fontWeight="bold"
              maxWidth="55rem"
              margin="0 auto"
            >
              extra info
            </Paragraph>
            <Paragraph
              size="1rem"
              maxWidth="55rem"
              margin="2rem auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </Paragraph>

            {/* <SignUpBlock>
              <Paragraph
                size="1.7rem"
                fontWeight="bold"
                maxWidth="17rem"
                color="white"
              >
                Sign up to receive $5 for trading!
              </Paragraph>
              <Button 
                color="black"
                margin="1.5rem 0 0 0"
                padding="1rem"
                onClick={ () => {
                  //
                }}
              >
                Sign up now!
              </Button>
            </SignUpBlock> */}
          </ContentWrapper>
        </ContentWrapper>

        {/* layover for mobile */}
        {(width < 650 && showForm) &&
          <Layover>
            <FlexWrapper height="100%">
              <ProgressiveForm 
                layover 
                isMobile={true}
                market={market} 
                cancelMobile={() => {
                  setShowForm(false);
                }}
                marketPricesData={marketPricesData} 
                lastFilledPrices={lastFilledPricesForMarket}
              />
            </FlexWrapper>
          </Layover>
        }
    <Footer />
    </ContentWrapper>
  );
}

export default MarketOverview;