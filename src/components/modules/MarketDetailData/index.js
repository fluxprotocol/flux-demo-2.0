import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';
import OrderBookBookBarChart from '../../common/OrderBookBarChart';
import OrderBookLineGraph from '../../common/OrderBookLineGraph';

const positiveArrow = require('../../../assets/images/icons/green_arrow.svg');
const negativeArrow = require('../../../assets/images/icons/pink_arrow.svg');

const barsActive = require('../../../assets/images/icons/bars_active.svg');
const barsInactive = require('../../../assets/images/icons/bars_inactive.svg');
const lineActive = require('../../../assets/images/icons/graph_active.svg');
const lineInactive = require('../../../assets/images/icons/graph_inactive.svg');

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
  color: white;
`;

const DetailPriceLabel = styled.div`
  color: white;
  font-weight: 900;
  font-size: 1.5em;
  margin-right: .5em;
`;
const DetailStatHeading = styled.div`
  display: flex;
  color: white;
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

const MarketDetailData = props => {
  // define default state
  const [checked, setChecked] = useState('all');
  const [chartView, setChartView] = useState('orderBook');
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

  let chartState = {
    bar: true,
    line: false
  }
  
  // handler for filter selections
  const handleRadioChange = (event) => {
    setChecked(event.target.value);
  }

  const handleChartChange = (event) => {
    setChartView(event.target.value);
  }

  const { market } = props;

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
                  id="orderBookChart"
                  value="orderBookChart"
                  checked={chartView === 'orderBookChart'}
                  onChange={handleChartChange}
                />
                <ChartLabel htmlFor="orderBookChart">
                  <FilterLabel>
                    <img alt="lineIcon" src={chartView === 'orderBookChart' ? lineActive : lineInactive} />
                  </FilterLabel>
                </ChartLabel>
              </FilterWrapper>

              <FilterWrapper>
                <ChartButton 
                  name="overviewType" 
                  id="orderBook"
                  value="orderBook"
                  checked={chartView === 'orderBook'}
                  onChange={handleChartChange}
                />
                <ChartLabel htmlFor="orderBook">
                  <FilterLabel>
                    <img alt="barIcon" src={chartView === 'orderBook' ? barsActive : barsInactive} />
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
        {
          (chartView === 'orderBook') 
          ? 
          (
            <OrderBookBookBarChart 
              orderBookHeaders={orderBookHeaders} 
              orderBookItems={orderBookItems} 
            />
          ) 
          : 
          <OrderBookLineGraph 
            market={market} 
          />
        }
        
    </PageWrapper>
  );
}

export default MarketDetailData;
