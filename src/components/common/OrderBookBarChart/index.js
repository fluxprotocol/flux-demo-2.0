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

const BarWrapperContainer = styled.div`
  width: 100%;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0rem;
    right: 0;
    width: ${props => props.width}%;
    border-radius: 12px 0 0 12px;
    height: 1.7rem;
    background-color: ${props => props.backgroundColor ? props.theme[props.color] : 'transparent'};
  }
` 


// pass width: 0 / 100 fill width dynamiccaly 
const BarWrapper = styled.span`
  display: block;
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
  ]

  const colorValue = {
    sell: 'pink',
    buy: 'green'
  };
  
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

        {orderBookFilters.map((filter, index) => (
          <div>
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
                >
                  {orderBookHeader}
                </OrderBookDetail>
              ))}

              </OrderBookDetails>

              {orderBookItems.map((orderBookItem, index) => (
                <OrderBookDetails>
                  <OrderBookData
                    color="white"
                  >{orderBookItem.contract}</OrderBookData>
                  <OrderBookData 
                    className="range"
                    borderRadius="4px"
                    minWidth="10em"
                  >
                    <BarWrapperContainer
                      backgroundColor={colorValue[orderBookItem.type]}
                      width={orderBookItem.price * 100}
                    >
                    <BarWrapper
                      backgroundColor={colorValue[orderBookItem.type]}
                    >
                      {orderBookItem.amount}
                    </BarWrapper>
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
