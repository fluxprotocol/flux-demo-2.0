import React from 'react';
import styled from 'styled-components';

// common
import ProgressBar from '../../common/ProgressBar';
import ContentCard from '../../common/ContentCard';

const CardContainer = styled.div`
  flex: 1 0 calc(100% - 2rem);
  padding: 1rem;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    flex: 1 0 calc(49% - 2rem);
    max-width: calc(49%);
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    flex: 1 0 calc(33% - 2rem);
    max-width: calc(33%);
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme[props.category] ? props.theme[props.category] : props.theme.crypto};
  padding: 1.5rem;
  height: 18rem;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0px 3px 20px rgba(0,0,0,0.2);
`;

const CardImage = styled.img`
  position: absolute;
  top: -0.5rem;
  right: -2rem;
  width: 9rem;
`;

const CardTitle = styled.h1`
  max-width: 60%;
  font-size: 1.2rem;
  font-weight: 'bold';
  margin-bottom: auto;
  color: white;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    font-size: 1.5rem;
  }
`;

const TwitterIcon = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const CategoryLabel = styled.span`
  display: block;
  margin: 0.8rem 0;
  font-size: 0.8rem;
  color: white;
`;

const DateLabel = styled.div`
  margin: 0.8rem 0;
  margin-top: auto;
  font-size: 0.8rem;
  text-align: right;
  color: white;
`;

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

const MarketCard = props => {
  return (
    <CardContainer>

      {/* colored card block */}
      <Card category={props.market.categories[0]}>
        <TwitterIcon
          src={require('../../../assets/images/twitter-circle.png')}
          alt="twitter"
          onClick={() => {}}
        />
        <CategoryLabel>Space | startups</CategoryLabel>
        <CardImage 
          src={require(`../../../assets/images/card-${props.market.categories[0] ? props.market.categories[0] : 'crypto'}.png`)}
          alt={props.market.category}
        />
        <CardTitle>
          {props.market.description}
        </CardTitle>
        <DateLabel>
          resolution date: <strong>3/20/2020</strong>
        </DateLabel>
      </Card>

      {/* market info */}
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

    </CardContainer>
  );
}

export default MarketCard;
