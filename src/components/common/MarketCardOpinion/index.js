import React from 'react';
import styled from 'styled-components';

// common
import ProgressBar from '../ProgressBar';
import PositionedLabel from '../PositionedLabel';
import ContentCard from '../ContentCard';
import { FlexWrapper, FlexItem } from '../Flex';

// temp data, will use market prop
const opinionRowsMultiple = [
  {
    label: 'Option one',
    percentage: 30,
    color: 'red',
  },
  {
    label: 'Option two',
    percentage: 15,
    color: 'blue',
  },
  {
    label: 'Option three',
    percentage: 20,
    color: 'pink',
  },
  {
    label: 'Option four',
    percentage: 35,
    color: 'green',
  },
];

// const opinionRowsTwo = [
//   {
//     label: 'Yes',
//     percentage: 75,
//     color: 'green',
//   },
//   {
//     label: 'No',
//     percentage: 25,
//     color: 'red',
//   },
// ];

const MarketOpinionContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const OutcomeTag = styled.div`
  background-color: ${props => props.color ? props.theme[props.color] : props.theme.gray};
  height: 0.5rem;
  width: 1.5rem;
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
        <ProgressBar items={opinionRowsMultiple}></ProgressBar>

        {lastFilledPrices.length !== 0 &&
          <FlexWrapper 
            flexDirection="column"
            margin="0 0 1rem 0"
            padding="0.5rem"
          >

            {props.market.outcome_tags.map((outcome_tag, index) => (
              <FlexItem width="100%" key={outcome_tag}>
                <FlexWrapper>
                  <FlexItem maxWidth="2.5rem">
                    <OutcomeTag/>
                  </FlexItem>
                  <FlexItem>
                    {outcome_tag}
                  </FlexItem>
                  <FlexItem textAlign="right">
                    {lastFilledPrices[index] || 0}
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
              {props.market.volume ? props.market.volume / 1000000000000000000 : '-'} DAI
            </VolumeAmount>
          </PositionedLabel>
        </ContentCard>

      </MarketOpinionContainer>
  );
}

export default MarketCardOpinion;
