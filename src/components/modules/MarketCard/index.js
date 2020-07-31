import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

// common
import MarketCardOpinion from '../../common/MarketCardOpinion';
import MarketCardGovernance from '../../common/MarketCardGovernance';
import CategoryLabel from '../../common/CategoryLabel';
import DateLabel from '../../common/DateLabel';

// constants
import { CATEGORIES } from '../../../constants';

const CardContainer = styled.div`
  flex: 1 0 calc(100% - 2rem);
  padding: 1rem;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    flex: 1 0 calc(49% - 2rem);
    max-width: calc(49%);
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    flex: 1 0 calc(33.3% - 2rem);
    max-width: calc(33.3%);
  }
`;

const Card = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme[props.category] ? props.theme[props.category] : props.theme.crypto};
  padding: 1.5rem;
  height: 18rem;
  border-radius: 2rem;
  border-bottom-left-radius: ${props => props.cardType === 'resolute' ? 0 : '2rem'};
  overflow: hidden;
  box-shadow: 0px 3px 20px rgba(0,0,0,0.2);
  cursor: pointer;
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

const MarketCard = props => {
  const history = useHistory();

  const handleCardClick = (id) => {
    history.push(`/markets/${id}`);
  };

  return (
    <CardContainer>

      {/* colored card block */}
      <Card 
        category={props.market.categories[0]}
        cardType={props.cardType}
        onClick={() => handleCardClick(props.market.id)}
      >
        <TwitterIcon
          src={require('../../../assets/images/twitter-circle.png')}
          alt="twitter"
          onClick={() => {}}
        />
        <CategoryLabel>Space | startups</CategoryLabel>
        <CardImage 
          src={require(`../../../assets/images/card-${CATEGORIES.indexOf(props.market.categories[0]) > -1 ? props.market.categories[0] : 'crypto'}.png`)}
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
      {props.cardType === 'trade' &&
        <MarketCardOpinion market={props.market}/>
      }

      {props.cardType === 'resolute' &&
        <MarketCardGovernance market={props.market}/>
      }

    </CardContainer>
  );
}

export default MarketCard;
