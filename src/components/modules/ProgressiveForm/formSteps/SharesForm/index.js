import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';

const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const Input = styled.input.attrs({ type: 'number' })`
  max-width: 8rem;
  border: 1px red dashed;
  padding: 1rem 1rem 1rem 1rem;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  border: none;
  outline: none;
  margin-right: -1em;
  text-align: right;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: ${props => props.theme.gray};
  }
`;

const Span = styled.span`
  font-size: 1.2rem;
  padding-left: .5rem;
  color: rgba(246,1,155, 100);
`;

// const Error

const SharesForm = props => {
  const [numberOfShares, setNumberOfShares] = useState(0);
  const defaultMarketPrice = props.sharesType[0] && parseInt(props.sharesType[0].marketPrice) ? parseInt(props.sharesType[0].marketPrice) : "-";
  const [marketPrice, setMarketPrice] = useState(defaultMarketPrice);
  
  const colorMap = {
    yes: 'lightPurple',
    no: 'pink',
  };

  const handleSharesInputChange = (event) => {
    setNumberOfShares(event.target.value);
  }

  const handlePriceChange = (event) => {
    setMarketPrice(event.target.value);
  }

  return (
      <FlexWrapper
        flexDirection="column"
        height="100%"
      >

        <ContentWrapper
          className="buy_shares"
          backgroundColor={props.layover ? colorMap[props.sharesType] : 'transparent'}
          width="100%"
          padding="2rem"
          >
          <ActionTitle textAlign="center">Buy {numberOfShares} Shares</ActionTitle>
          <FlexWrapper className="input_divider" margin="1rem 0">
            <FlexItem
              color="white"
            >
              Number of Shares
            </FlexItem>
            <FlexItem textAlign="right">
              <Input 
                value={numberOfShares}
                onChange={handleSharesInputChange}
              />
            </FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem
              className="marketPrice"
              color="white"
            >
              Market Price <Span>?</Span>
            </FlexItem>
            <FlexItem 
              color="white"
              textAlign="right"  
            >
              <FlexItem>
                $
                <Input
                  onChange={handlePriceChange}
                  required
                  value={marketPrice}
                />
              </FlexItem> 
            </ FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem
              color="white"
            >
              Estimated Cost
            </FlexItem>
            <FlexItem
              color="white"
              textAlign="right"
            >
              {
                isNaN(props.sharesType) === false && 
                <FlexItem>
                  &#162;{(numberOfShares * props.sharesType[2]) / 100}
                </FlexItem>
              }
              
              {
                isNaN(props.sharesType) === true && 
                <FlexItem>
                  $  {((marketPrice * numberOfShares) / 100) || '-'}
                </FlexItem>
              }
            </FlexItem>
          </FlexWrapper>
          <RowDivider />
        </ContentWrapper>

        <ContentWrapper 
          className="orderSelection"
          margin="auto 0 2rem 0"
          width="100%"
          padding={props.layover ? '2rem' : '0 2rem 0 0'}
          textAlign={props.layover ? 'center' : 'right'}
        >
        <Button
            margin="2rem 0 0 0"
            borderColor="transparent"
            className="cancelButton"
            onClick={ () => {
              props.cancel()
            }}
          >
            cancel
          </Button>
          <Button
            margin="2rem 0 0 1rem"
            color={colorMap[props.sharesType]}
            className="reviewButton"
            onClick={ () => {
              // TODO: validation market price < 100 && > 0
              // TODO: validation: shares > 0
              // TODO: default number of shares to
              props.formEvent(['review', numberOfShares, marketPrice, numberOfShares * marketPrice / 100]);
            }}
          >
            Review
          </Button>
        </ContentWrapper>

      </FlexWrapper>
  );
}

export default SharesForm;