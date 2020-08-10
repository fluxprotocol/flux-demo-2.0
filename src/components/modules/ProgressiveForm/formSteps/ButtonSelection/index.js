import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';

const ColumnTitle = styled.p`
  font-size: 0.8rem;
  color: white;
`;

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
  return (
    <ContentWrapper>

      {/* binary */}
      {props.options.length === 2 &&
        <ContentWrapper>

          <FlexWrapper 
            margin="2rem 0"
          >
            <FlexItem>
              <ColumnTitle>
                last forecast
              </ColumnTitle>
            </FlexItem>
            <FlexItem>
              <ColumnTitle>
                market price
              </ColumnTitle>
            </FlexItem>
            <FlexItem></FlexItem>
          </FlexWrapper>

        {props.options.map((option, index) => (
          <div key={option.name}>
              <FlexWrapper 
                margin="1rem 0"
              >
              <FlexItem>
                <OptionLabel>
                  {option.forecast}
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <OptionLabel>
                  <strong>${option.marketPrice}</strong>
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <Button
                  small={props.layover}
                  shadow
                  width="100%"
                  color={index === 0 ? 'lightPurple' : 'pink'}
                  onClick={ () => {
                    props.buttonEvent(option.name);
                  }}
                >
                  BUY {option.name.toUpperCase()}
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