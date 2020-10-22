import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toDenom, toShares } from '../../../helpers/numberUtils';

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
  const {orderBookHeaders, orderBookItems, market } = props;

  const colorValue = {
    buy: 'orderbookGreen'
  };

  const outcomeTags = market.outcomes > 2 ? market.outcome_tags : ["NO", "YES"]

  const getOrderbook = () => orderBookItems.map((item, i) =>{
    return (
      <OrderBookDetails key={i}>
        <OrderBookData
          color="white"
        >
          {outcomeTags[item.outcome]}
        </OrderBookData>
        <OrderBookData 
          className="range"
          borderRadius="4px"
          width="100%"
          backgroundColor={colorValue.buy}
        >

          <BarWrapperContainer
            color={colorValue.buy}
            backgroundColor={colorValue.buy}
            width={70}
            content={item.depth / toShares(1)}
            />
        
        </OrderBookData>
        <OrderBookData
          color={colorValue.buy}
          className="priceValues"
          
        >
          {item.price}
          
        </OrderBookData>
        <OrderBookData
          color={colorValue.buy}
        >
          Buy
        </OrderBookData>
      </OrderBookDetails>
    )

  })

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

          {market.outcome_tags && getOrderbook()}

        </tbody>
      </OrderBookWrapper>
    </FlexWrapper>        
  );
}

export default OrderBookBookBarChart;
