import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const positiveArrow = require('../../../assets/images/icons/green_arrow.svg');
const negativeArrow = require('../../../assets/images/icons/pink_arrow.svg');

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 1em;
  width: 90%;
`;

const OrderBookWrapper = styled.table`
  width: 100%;
`;

const OrderBookDetails = styled.tr`
  & > th:first-of-type, & > td:first-of-type {
    text-align: left;
  }
`;

const OrderBookDetail = styled.th`
  padding: .5em;
  font-size: 0.8rem;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'auto'};
  text-align: right;
  color: white;
`;

const OrderBookData = styled.td`
  padding: .8em;
  color: ${props => props.color ? props.theme[props.color] : '#FF009C'};
  text-align: right;
  &.range {
    text-align: right;
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
    background-color: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'initial'};
    background-color: ${props => props.color ? props.theme[props.color] : 'transparent'};
    width: ${props => props.width ? props.width : '5em'};
  }

  &.priceValues {
    display: flex;
    flex-direction: column
  }

  &.priceValues div {
    display: flex;
  }

  &.priceValues span {
    width: 2.5em;
  }

`;

const BarWrapperContainer = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: '${props => props.content ? props.content : ""}';
    display: block;
    position: absolute;
    top: .2rem;
    right: 0;
    margin-top: -.8em;
    padding-right: .25em;
    width: 100%;
    border-radius: 12px 0 0 12px;
    height: 1.2rem;
    background: ${props => props.backgroundColor ? props.theme[props.backgroundColor] : 'transparent'};
    color: white;
  }

  @media (min-width: ${({ theme }) => theme.smallBreakpoint}) {
    &:after {
      width: ${props => props.width}%;
    }
  }
` 

const OrderBookBookBarChart = props => {
  const {orderBookHeaders, orderBookItems, market, averagePriceData } = props;
  const [chartPrice, setChartPrice] = useState([]);

  console.log('this is the market', market);
  console.log('this is the orderbookitems', orderBookItems);
  console.log('this is the averagepricedata', averagePriceData);

  useEffect(() => {

    if (!averagePriceData) {
      return;
    }
    getPriceData();
  }, [averagePriceData])
  

  const getPriceData = async () => {
    let outcome = await computePriceRange();
    setChartPrice(outcome);
  }

  const computePriceRange = async () => {
    let historicalPrices = averagePriceData;
    let currentPrices = orderBookItems;

    let dataObj = [];

    currentPrices.forEach((item, index) => {
      // sometimes the indexes do not match due to dummy data
      if (historicalPrices[index]) {
        // get currentprice
        let currPrice = item.price;
        // get the historical price from array based on inex
        let histPrice = parseInt(historicalPrices[index].avg_price);
        // calculate what 1 % is of the historical price
        let onePercent = histPrice / 100;
        // calculate the difference, can be negative or positive
        let difference = currPrice - histPrice;
        // calculate percentage
        let percentage = parseInt(difference / onePercent);

        let finalCalculations = {
          difference,
          percentage
        }

        dataObj.push(finalCalculations);
      } else {
        return null;
      }
    });
    return dataObj;
  }

  const colorValue = {
    buy: 'orderbookGreen'
  };

  return (
    <FlexWrapper>
      <OrderBookWrapper>
        <tbody>
          <OrderBookDetails>

          {orderBookHeaders.map((orderBookHeader, index) => (
            <OrderBookDetail
              fontWeight="400"
              key={orderBookHeader}
            >
              {orderBookHeader}
            </OrderBookDetail>
          ))}

          </OrderBookDetails>

          {
            market.outcome_tags && averagePriceData ? market.outcome_tags.map((contract, index) => (
              <OrderBookDetails key={contract}>
                <OrderBookData
                  color="white"
                >
                  {contract}
                </OrderBookData>
                <OrderBookData 
                  className="range"
                  borderRadius="4px"
                  width="100%"
                  backgroundColor={colorValue.buy}
                >
                  {/* 
                    I need to know the data format from the real data - then we can compute the arithmetics
                    with respect to the with. Currently set to be fixed @70%
                  */}
                  <BarWrapperContainer
                    color={colorValue.buy}
                    backgroundColor={colorValue.buy}
                    width={70}
                    content={orderBookItems[index] ? orderBookItems[index].depth / 100000000000 : ''}
                  >
                  </BarWrapperContainer>
                </OrderBookData>
                <OrderBookData
                  color={colorValue.buy}
                  className="priceValues"
                  
                >
                  {orderBookItems[index] ? orderBookItems[index].price : ''}
                  
                </OrderBookData>
                <OrderBookData
                  color={colorValue.buy}
                >
                  Buy
                </OrderBookData>
              </OrderBookDetails>
              
            )) : null
          }

        </tbody>
      </OrderBookWrapper>
    </FlexWrapper>        
  );
}

export default OrderBookBookBarChart;
