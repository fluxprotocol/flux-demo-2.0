import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';
import Paragraph from '../../../../common/Paragraph';

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

const Error = styled(Paragraph)`
  color: red;
`

const Input = styled.input.attrs({ type: 'number' })`
  max-width: 3rem;
  border: 1px red dashed;
  padding: 1rem 1rem 1rem 0;
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

const TradingMessage = styled.span`
  z-index: 1;
  display: block;
  position: absolute;
  left: 0;
  bottom: -200%;
  background: #5e00ff;
  border-radius: 14px;
  padding: .5em .7em;
  color: white;
  width: 15em;
  font-size: 0.8em;
  text-align: center;
`;

const colorMap = {
  yes: 'lightPurple',
  no: 'pink',
};

const SharesForm = props => {
  const [numberOfShares, setNumberOfShares] = useState("");
  const defaultMarketPrice = props.sharesType[0] && parseInt(props.sharesType[0].marketPrice) ? parseInt(props.sharesType[0].marketPrice) : "";
  const [marketPrice, setMarketPrice] = useState(defaultMarketPrice);
  const [showMarketPriceTooltip, setShowMarketPriceTooltip] = useState(false);
  const [error, setError] = useState(null);


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
          {error && <Error>{error}</Error>}
          <FlexWrapper className="input_divider" margin="1rem 0">
            <FlexItem
              color="white"
            >
              Number of Shares
            </FlexItem>
            <FlexItem textAlign="right">
              <Input 
                placeholder={0}
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
              onMouseEnter={() => {
                setShowMarketPriceTooltip(true);
              }}
              onMouseLeave={() => {
                setShowMarketPriceTooltip(false);
              }}
            >
              Market Price 
              <Span>
                ?
              </Span>

              {showMarketPriceTooltip &&
                <TradingMessage
                  className="trading_message"
                >
                    The market price is the amount you will pay per share.
                </TradingMessage>              
              }

            </FlexItem>
            <FlexItem 
              color="white"
              textAlign="right"  
            >
              <FlexItem>
                &#162;
                <Input
                  onChange={handlePriceChange}
                  value={marketPrice}
                  required
                  placeholder={0}
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
                  $ {(numberOfShares * props.sharesType[2]) / 100}
                </FlexItem>
              }
              
              {
                isNaN(props.sharesType) === true && 
                <FlexItem>
                  $ {((marketPrice * numberOfShares) / 100) || '0'}
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
              if (marketPrice > 99 || marketPrice < 1) return setError("Invalid price - needs to be between 1 - 99");
              if (!numberOfShares || numberOfShares < 1) return setError("Invalid number of shares, should be more than 0");
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