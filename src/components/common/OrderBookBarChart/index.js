import React from 'react';
import styled from 'styled-components';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const OrderBookWrapper = styled.table`

`;

const OrderBookDetails = styled.tr`

`;

const OrderBookDetail = styled.th`
  padding: .5em;

`;

const OrderBookData = styled.td`
  padding: .8em;
  &.range {
    margin: 1em;
    padding: 0 .1em;
    text-align: right;
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'initial'};
    min-width: ${props => props.minWidth ? props.minWidth : '5em'};
  }

`;

const BarWrapper = styled.span`
  display: block;
  border-radius: 12px 0 0 12px;
  padding: 3px 4px 3px 0;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'red'}
`

const OrderBookBookBarChart = props => {
  return (
    <PageWrapper>
        <FlexWrapper
          width="80%"
        >
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            1D
          </FlexItem>
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            1W
          </FlexItem>
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            1M
          </FlexItem>
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            3M
          </FlexItem>
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            6M
          </FlexItem>
          <FlexItem 
            color="gray" 
            textAlign="center"
          >
            1Y
          </FlexItem>
          {/* should become dynamic active class */}
          <FlexItem className="active"
            color="gray" 
            textAlign="center"
            padding="13px"
            backgroundColor="#3B3A64"
            borderRadius="4px"
            maxWidth="4em"
          >
            ALL
          </FlexItem>
        </FlexWrapper>

        <FlexWrapper>
          <OrderBookWrapper>
            <colgroup span="4"></colgroup>
            <OrderBookDetails>
              <OrderBookDetail>Contract</OrderBookDetail>
              <OrderBookDetail>Amount</OrderBookDetail>
              <OrderBookDetail>Price</OrderBookDetail>
              <OrderBookDetail>Type</OrderBookDetail>
            </OrderBookDetails>
            <OrderBookDetails>
              <OrderBookData>Trump</OrderBookData>
              <OrderBookData 
                className="range"
                borderRadius="4px"
                minWidth="10em"
              >
                <BarWrapper>
                  1200
                </BarWrapper>
              </OrderBookData>
              <OrderBookData>0.40</OrderBookData>
              <OrderBookData>sell</OrderBookData>
            </OrderBookDetails>
            <OrderBookDetails>
              <OrderBookData>Biden</OrderBookData>
              <OrderBookData 
                className="range"
                borderRadius="4px"
                minWidth="10em"
              >
                <BarWrapper>
                  1200
                </BarWrapper>
              </OrderBookData>
              <OrderBookData>0.40</OrderBookData>
              <OrderBookData>buy</OrderBookData>
            </OrderBookDetails>
            <OrderBookDetails>
              <OrderBookData>Jon</OrderBookData>
              <OrderBookData 
                className="range"
                borderRadius="4px"
                minWidth="10em"
              >
                <BarWrapper>
                  1200
                </BarWrapper>
              </OrderBookData>
              <OrderBookData>0.40</OrderBookData>
              <OrderBookData>sell</OrderBookData>
            </OrderBookDetails>
            <OrderBookDetails>
              <OrderBookData>Other</OrderBookData>
              <OrderBookData 
                className="range"
                borderRadius="4px"
                minWidth="10em"
              >
                <BarWrapper>
                  1200
                </BarWrapper>
              </OrderBookData>
              <OrderBookData>0.40</OrderBookData>
              <OrderBookData>buy</OrderBookData>
            </OrderBookDetails>
          </OrderBookWrapper>
        </FlexWrapper>
    </PageWrapper>
  );
}

export default OrderBookBookBarChart;
