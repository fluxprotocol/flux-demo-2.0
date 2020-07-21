import React from 'react';
import styled from 'styled-components';

// common
import ProgressBar from '../ProgressBar';
import ContentCard from '../ContentCard';

const MarketOpinionContainer = styled.div`
  padding: 1rem;
`;

const OpinionPercentageContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const PositionedLabel = styled.div`
  margin-right: ${props => props.position === 'left' ? 'auto' : 'initial'};
  margin-left: ${props => props.position === 'right' ? 'auto' : 'initial'};
  color: ${props => props.theme.text};
`;

const VolumeAmount = styled.div`
  margin-left: 0.5rem;
  color: ${props => props.theme[props.category] ? props.theme[props.category] : 'white'};
`;

const MarketCardOpinion = props => {
  return (
      <MarketOpinionContainer>

        <p>What does the market think?</p>
        <ProgressBar value="32" max="100"></ProgressBar>
        
        <OpinionPercentageContainer>
          <PositionedLabel position={'left'}>
            <strong>Yes</strong> 75%
          </PositionedLabel>
          <PositionedLabel position={'right'}>
            <strong>No</strong> 25%
          </PositionedLabel>
        </OpinionPercentageContainer>

        <ContentCard>
          <PositionedLabel position={'left'}>
            <strong>Total Volume</strong>
          </PositionedLabel>
          <PositionedLabel position={'right'}>
            <VolumeAmount category={props.market.categories[0]}>
              {props.market.volume ? props.market.volume : '-'} DAI
            </VolumeAmount>
          </PositionedLabel>
        </ContentCard>

      </MarketOpinionContainer>
  );
}

export default MarketCardOpinion;
