import React from 'react';
import styled from 'styled-components';

// common
import ProgressBar from '../ProgressBar';
import PositionedLabel from '../PositionedLabel';
import ContentCard from '../ContentCard';
import { FlexWrapper, FlexItem } from '../Flex';
import { fromDenom } from '../../../helpers/numberUtils';

const MarketOpinionContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const OutcomeTag = styled.div`
  background-color: ${props => props.color ? props.theme[props.color] : props.theme.gray};
  height: 0.5rem;
  width: 1.5rem;
  margin-top: 0.3rem;
  border-top-left-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
`;

const VolumeAmount = styled.div`
  margin-left: 0.5rem;
  color: 'white';
`;

const MarketCardOpinion = props => {
  let lastFilledPrices = [];
  
  if (props.lastFilledPrices) {
    for (const [key, value] of Object.entries(props.lastFilledPrices)) {
      lastFilledPrices.push(value);
    }
  }

  return (
      <MarketOpinionContainer>

        <p>What does the market think?</p>
        <ProgressBar
          outcomes={props.outcomes}
          lastFilledPrices={lastFilledPrices}
        ></ProgressBar>

        {props.outcomes.length !== 0 &&
          <FlexWrapper 
            flexDirection="column"
            margin="0 0 1rem 0"
            padding="0.5rem"
          >
            {Object.keys(props.outcomes).map((key, i) => (
              <FlexItem width="100%" key={props.outcomes[key].label}>
                <FlexWrapper>
                  <FlexItem maxWidth="2.5rem">
                    <OutcomeTag
                      color={props.outcomes[key].color}
                    />
                  </FlexItem>
                  <FlexItem>
                    {props.outcomes[key].label}
                  </FlexItem>
                  <FlexItem
                    textAlign="right"
                  >
                    {lastFilledPrices[key] || 0}
                  </FlexItem>
                </FlexWrapper>
              </FlexItem>
            ))}
        </FlexWrapper>
        }

        <ContentCard>
          <PositionedLabel position={'left'}>
            <strong>Total Volume</strong>
          </PositionedLabel>
          <PositionedLabel position={'right'}>
            <VolumeAmount category={props.market.categories[0]}>
              {props.market.volume ? "$" + fromDenom(props.market.volume) : '-'} DAI
            </VolumeAmount>
          </PositionedLabel>
        </ContentCard>

      </MarketOpinionContainer>
  );
}

export default MarketCardOpinion;
