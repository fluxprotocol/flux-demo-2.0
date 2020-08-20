import React from 'react';
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

const OptionLabel = styled.span`
  font-size: 1.2rem;
  color: white;
`;

const ButtonSelection = props => {
  const { market, marketPricesData, lastFilledPrices } = props;
  console.log('all the props inside buttonselection', props);

  return (
    <ContentWrapper>

      {/* binary */}
      {props.options.length === 2 &&
        <ContentWrapper>

          <FlexWrapper 
            margin="2rem 0"
          >
            <FlexItem>
              <Paragraph
                size="0.8rem"
                color="white"
              >
                Contract
              </Paragraph>
            </FlexItem>
            <FlexItem>
              <Paragraph>
                Title
              </Paragraph>
            </FlexItem>
            <FlexItem>
              <Paragraph>
                market price
              </Paragraph>
            </FlexItem>
            <FlexItem></FlexItem>
          </FlexWrapper>

        {props.market.outcome_tags && props.market.outcome_tags.map((contract, index) => (
          <div 
            key={contract + index}
            className="contractRow"
          >
              <FlexWrapper 
                margin="1rem 0"
              >
              <FlexItem>
                <OptionLabel>
                  {marketPricesData[index] || null}
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <OptionLabel>
                  {contract}
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <OptionLabel>
                  <strong>&#162;{lastFilledPrices[index] || null}</strong>
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <Button
                  small={props.layover}
                  shadow
                  width="100%"
                  color={'lightPurple'}
                  onClick={ () => {
                    let userSelection = [marketPricesData[index], contract, lastFilledPrices[index]]
                    props.buttonEvent(userSelection);
                  }}
                >
                  BUY
                </Button>
              </FlexItem>
            </FlexWrapper>

            {(index === 0 && !props.layover) &&
              <RowDivider />
            }
          </div>
        ))}
          
        </ContentWrapper>
      }

      {/* multiple */}
      {props.options.length !== 2 &&
        <ContentWrapper>
          
          {props.options.map((option, index) => (
          <div key={option}>
            <FlexWrapper 
              margin="1rem 0"
            >
              <FlexItem>
                <OptionLabel>
                  <strong>{option}</strong>
                </OptionLabel>
              </FlexItem>
              <FlexItem textAlign="right">
                <Button
                  maxWidth="6rem"
                  shadow
                  width="100%"
                  color="lightPurple"
                  onClick={ () => {
                    props.buttonEvent(option);
                  }}
                >
                  Buy
                </Button>
              </FlexItem>
            </FlexWrapper>

            {!props.layover &&
              <RowDivider />
            }
          </div>
        ))}

        </ContentWrapper>
      }
    </ContentWrapper>
  );
}

export default ButtonSelection;