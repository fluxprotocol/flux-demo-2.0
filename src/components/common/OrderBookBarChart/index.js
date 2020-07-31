import React, { useState } from 'react';
import styled from 'styled-components';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';

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

`;

const OrderBookDetails = styled.tr`

`;

const OrderBookDetail = styled.th`
  padding: .5em;
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'auto'};
`;

const OrderBookData = styled.td`
  padding: .8em;
  color: ${props => props.color ? props.color : '#FF009C'};
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
  color: white;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#FF009C'};
`;

const OrderBookBookBarChart = props => {
  // define default state
  const [checked, setChecked] = useState('all');
  
  // handler for filter selections
  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    let filterValue = event.target.value;
    console.log('make request for maket detail with filter value', filterValue)
  }

  return (
    <PageWrapper>
        <FlexWrapper
          width="80%"
        >
          <RadioButton 
            name="filterValue" 
            id="1D"
            value="1D"
            checked={checked === '1D'}
            onChange={handleRadioChange}
          />
          <RadioLabel htmlFor="1D">
            <FilterLabel>
              1D
            </FilterLabel>
          </RadioLabel>

          <RadioButton 
            name="filterValue" 
            id="1W"
            value="1W"
            checked={checked === '1W'}
            onChange={handleRadioChange}
          />
          <RadioLabel htmlFor="1W">
            <FilterLabel>
              1W
            </FilterLabel>
          </RadioLabel>

          <RadioButton 
            name="filterValue" 
            id="1M"
            value="1M"
            checked={checked === '1M'}
            onChange={handleRadioChange}
          />
          <RadioLabel htmlFor="1M">
            <FilterLabel>
              1M
            </FilterLabel>
          </RadioLabel>

        <RadioButton 
          name="filterValue" 
          id="3M"
          value="3M"
          checked={checked === '3M'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="3M">
          <FilterLabel>
            3M
          </FilterLabel>
        </RadioLabel>

        <RadioButton 
          name="filterValue" 
          id="6M"
          value="6M"
          checked={checked === '6M'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="6M">
          <FilterLabel>
            6W
          </FilterLabel>
        </RadioLabel>

        <RadioButton 
          name="filterValue" 
          id="1Y"
          value="1Y"
          checked={checked === '1Y'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="1Y">
          <FilterLabel>
            1Y
          </FilterLabel>
        </RadioLabel>

        <RadioButton 
          name="filterValue" 
          id="all"
          value="all"
          checked={checked === 'all'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="all">
          <FilterLabel>
            all
          </FilterLabel>
        </RadioLabel>
        </FlexWrapper>

        <FlexWrapper>
          <OrderBookWrapper>
            <tbody>
              <OrderBookDetails>
                <OrderBookDetail
                  fontWeight="100"
                >Contract</OrderBookDetail>
                <OrderBookDetail
                  fontWeight="100"
                >Amount</OrderBookDetail>
                <OrderBookDetail
                  fontWeight="100"
                >Price</OrderBookDetail>
                <OrderBookDetail
                  fontWeight="100"
                >Type</OrderBookDetail>
              </OrderBookDetails>
              <OrderBookDetails>
                <OrderBookData
                  color="white"
                >Trump</OrderBookData>
                <OrderBookData 
                  className="range"
                  borderRadius="4px"
                  minWidth="10em"
                >
                  <BarWrapper>
                    1200
                  </BarWrapper>
                </OrderBookData>
                <OrderBookData>
                  0.40
                </OrderBookData>
                <OrderBookData>
                  sell
                </OrderBookData>
              </OrderBookDetails>
              <OrderBookDetails>
                <OrderBookData
                  color="white"
                >
                  Biden
                </OrderBookData>
                <OrderBookData 
                  className="range"
                  borderRadius="4px"
                  minWidth="10em"
                >
                  <BarWrapper
                    backgroundColor="#C4FF88"
                    color="white"
                  >
                    1200
                  </BarWrapper>
                </OrderBookData>
                <OrderBookData
                  color="#C4FF88"
                >
                  0.40
                </OrderBookData>
                <OrderBookData
                  color="#C4FF88"
                >
                  buy
                </OrderBookData>
              </OrderBookDetails>
              <OrderBookDetails>
                <OrderBookData
                  color="white"
                >
                  Jon
                </OrderBookData>
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
                <OrderBookData
                  color="white"
                >
                  Other
                </OrderBookData>
                <OrderBookData 
                  className="range"
                  borderRadius="4px"
                  minWidth="10em"
                >
                  <BarWrapper
                    backgroundColor="#C4FF88"
                    color="white"
                  >
                    1200
                  </BarWrapper>
                </OrderBookData>
                <OrderBookData
                  color="#C4FF88"
                >
                  0.40
                </OrderBookData>
                <OrderBookData
                  color="#C4FF88"
                >
                  buy
                </OrderBookData>
              </OrderBookDetails>
            </tbody>
          </OrderBookWrapper>
        </FlexWrapper>
    </PageWrapper>
  );
}

export default OrderBookBookBarChart;
