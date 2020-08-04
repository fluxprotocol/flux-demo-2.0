import React, { useState } from 'react';
import styled from 'styled-components';

const positiveArrow = require('../../../assets/images/icons/green_arrow.svg');
// const negativeArrow = require('../../../assets/images/icons/pink_arrow.svg');

const barsActive = require('../../../assets/images/icons/bars_active.svg');
const barsInactive = require('../../../assets/images/icons/bars_inactive.svg');
const graphActive = require('../../../assets/images/icons/graph_active.svg');
const graphInactive = require('../../../assets/images/icons/graph_inactive.svg');

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: start;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 1em;
  width: 90%;
`;

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

const FilterWrapper = styled.div`
  display: inline-block;
  margin-bottom: 0.5rem;
  width: 50%;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    width: auto;
  }
`;

const ChartButton = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + label {
    opacity: 1;
    ${props => props.theme.text}
  }
`;

const ChartLabel = styled.label`
  display: inline-block;
  width: 100%;
  padding: 0.4rem 0 0.4rem .75rem;
  font-size: 0.8rem;
  color: ${props => props.theme.text};
  opacity: 0.7;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
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

  const colorValue = {
    sell: 'pink',
    buy: 'green'
  };

  let barIcon = barsActive;
  let chartIcon = graphInactive;
  
  // handler for filter selections
  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    let filterValue = event.target.value;
    console.log(filterValue);
    barIcon = barsInactive;
    chartIcon = graphActive;
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
                <img alt="positiveArrow" src={positiveArrow} /> $0.03 (%)
              </DetailStatLabel>
              Past week
            </DetailStatHeading>
          </ShareDetails>
          <FormatContainer>
            <ChartWrapper>
              <FilterWrapper>
                <ChartButton 
                  name="overviewType" 
                  id="graph"
                  value="graph"
                  checked={checked === 'graph'}
                  onChange={handleRadioChange}
                />
                <ChartLabel htmlFor="graph">
                  <FilterLabel>
                    <img alt="graphIcon" src={chartIcon} />
                  </FilterLabel>
                </ChartLabel>
              </FilterWrapper>

              <FilterWrapper>
                <ChartButton 
                  name="overviewType" 
                  id="bars"
                  value="bars"
                  checked={checked === 'bars'}
                  onChange={handleRadioChange}
                />
                <ChartLabel htmlFor="bars">
                  <FilterLabel>
                    <img alt="barIcon" src={barIcon} />
                  </FilterLabel>
                </ChartLabel>
              </FilterWrapper>
            </ChartWrapper>
          </FormatContainer>
        </OverviewWrapper>
        <FlexWrapper
          width="100%"
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
                    width="100%"
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
