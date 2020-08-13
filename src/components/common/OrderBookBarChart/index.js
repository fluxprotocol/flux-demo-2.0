import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'auto'};
  text-align: right;
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
    buy: 'green'
  };

  return (
    <FlexWrapper>
      <OrderBookWrapper>
        <tbody>
          <OrderBookDetails>

          {orderBookHeaders.map((orderBookHeader, index) => (
            <OrderBookDetail
              fontWeight="100"
              key={orderBookHeader}
            >
              {orderBookHeader}
            </OrderBookDetail>
          ))}

          </OrderBookDetails>

          {
            market.outcome_tags ? market.outcome_tags.map((contract, index) => (
              <OrderBookDetails key={contract.index}>
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
                  <BarWrapperContainer
                    color={colorValue.buy}
                    backgroundColor={colorValue.buy}
                    width={orderBookItems[index].price * 10}
                    content={orderBookItems[index].depth}
                  >
                  </BarWrapperContainer>
                </OrderBookData>
                <OrderBookData
                  color={colorValue.buy}
                  
                >
                  {orderBookItems[index].price}
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
