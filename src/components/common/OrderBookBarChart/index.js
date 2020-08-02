import React, { useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';

const positiveArrow = require('../../../assets/images/icons/green_arrow.svg');
const negativeArrow = require('../../../assets/images/icons/pink_arrow.svg');

const barsActive = require('../../../assets/images/icons/bars_active.svg');
const barsInactive = require('../../../assets/images/icons/bars_inactive.svg');

const graphActive = require('../../../assets/images/icons/graph_active.svg');
const graphInactive = require('../../../assets/images/icons/graph_inactive.svg');

const OverviewWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 1.25em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ShareDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailPriceHeading = styled.div`
  display: flex;
  align-items: baseline;
`;

const DetailPriceLabel = styled.div`
  font-weight: 900;
  font-size: 1.5em;
  margin-right: .5em;
`;
const DetailStatHeading = styled.div`
  display: flex;
`;

const DetailStatLabel = styled.div`
  color: ${props => props.color ? props.color : '#C4FF88' };
  margin-right: .5em;
`;

const FormatContainer = styled.div`
  display: flex;
  align-items: flex-start;

  & > img {
    margin: 0 .25em;
  }
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + label {
    opacity: 1;
    color: white;
    background-color: #3B3A64;
    border-radius: 4px
  }
`;

const RadioLabel = styled.label`
  display: inline-block;
  width: auto;
  padding: 1rem;
  font-size: 0.8rem;
  color: gray;
  opacity: 0.7;
  cursor: pointer;
  text-align: center;
`;

const FilterLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

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
  color: ${props => props.color ? props.color : '#FF009C'};
  text-align: right;
  &.range {
    text-align: right;
    border-radius: ${props => props.borderRadius ? props.borderRadius : 'initial'};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'initial'};
    background-color: ${props => props.theme.colorValue ? props.theme.colorValue : 'transparent'};
    min-width: ${props => props.minWidth ? props.minWidth : '5em'};
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
    width: ${props => props.width}%;
    border-radius: 12px 0 0 12px;
    height: 1.2rem;
    background: ${props => props.backgroundColor ? props.backgroundColor : 'transparent'};
    color: white;
  }
` 

// pass width: 0 / 100 fill width dynamiccaly 
const BarWrapper = styled.span`
  display: block;
  position: relative;
  padding: 3px 4px 3px 0;
  color: white;
  width: 100%;
`;

const OrderBookBookBarChart = props => {
  // define default state
  const [checked, setChecked] = useState('all');
  const [orderBookItems, setOrderBookItems] = useState([
    {
      contract: 'Trump',
      amount: '1200',
      price: '0.40',
      type: 'buy',
    },
    {
      contract: 'Biden',
      amount: '1000',
      price: '0.30',
      type: 'sell',
    },
    {
      contract: 'Kanye',
      amount: '1200',
      price: '0.40',
      type: 'sell',
    },
    {
      contract: 'Tom',
      amount: '1200',
      price: '0.40',
      type: 'sell',
    },
  ]);
  const orderBookFilters = [
    '1D',
    '1W',
    '1M',
    '3M',
    '6W',
    'all',
  ];
  const orderBookHeaders = [
    'Contact',
    'Amount',
    'Price',
    'Type',
  ];

  // should be based off the ThemeConsumer.js variables
  const colorValue = {
    sell: '#FF009C',
    buy: '#C4FF88'
  };
  
  // handler for filter selections
  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    let filterValue = event.target.value;
    console.log('make request for maket detail with filter value', filterValue)
  }

  return (
    <PageWrapper>
        <OverviewWrapper>
          <ShareDetails>
            <DetailPriceHeading>
              <DetailPriceLabel>
                $0.75
              </DetailPriceLabel>
              per Yes share
            </DetailPriceHeading>
            <DetailStatHeading>
              <DetailStatLabel>
                <img src={positiveArrow} /> $0.03 (%)
              </DetailStatLabel>
              Past week
            </DetailStatHeading>
          </ShareDetails>
          <FormatContainer>
            <img src={graphInactive} />
            <img src={barsActive} />
          </FormatContainer>
        </OverviewWrapper>
        <FlexWrapper
          width="80%"
        >

        {orderBookFilters.map((filter, index) => (
          <div key={filter}>
            <RadioButton 
              name="filterValue" 
              id={filter}
              value={filter}
              checked={checked === filter}
              onChange={handleRadioChange}
            />
            <RadioLabel htmlFor={filter}>
              <FilterLabel>
                {filter}
              </FilterLabel>
            </RadioLabel>
          </div>
        ))}

        </FlexWrapper>

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

              {orderBookItems.map((orderBookItem, index) => (
                <OrderBookDetails key={orderBookItem.contract}>
                  <OrderBookData
                    color="white"
                  >{orderBookItem.contract}</OrderBookData>
                  <OrderBookData 
                    className="range"
                    borderRadius="4px"
                    minWidth="10em"
                    backgroundColor={colorValue[orderBookItem.type]}
                  >
                    <BarWrapperContainer
                      color={colorValue[orderBookItem.type]}
                      backgroundColor={colorValue[orderBookItem.type]}
                      width={orderBookItem.price * 100}
                      content={orderBookItem.amount}
                    >
                    </BarWrapperContainer>
                  </OrderBookData>
                  <OrderBookData
                    color={colorValue[orderBookItem.type]}
                    
                  >
                    {orderBookItem.price}
                  </OrderBookData>
                  <OrderBookData
                    color={colorValue[orderBookItem.type]}
                  >
                    {orderBookItem.type}
                  </OrderBookData>
                </OrderBookDetails>
              ))}
 
            </tbody>
          </OrderBookWrapper>
        </FlexWrapper>        
    </PageWrapper>
  );
}

export default OrderBookBookBarChart;
