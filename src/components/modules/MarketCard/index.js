import React from 'react';
import styled from 'styled-components';

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
  background-color: ${props => props.theme[props.category] ? props.theme[props.category] : props.theme.crypto};
  padding: 1rem;
  height: 250px;
  border-radius: 2rem;
  overflow: hidden;
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

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    font-size: 1.5rem;
  }
`;

const MarketCard = props => {
  return (
    <CardContainer>
      <Card category={props.market.categories[0]}>
        <CardImage 
          src={require(`../../../assets/images/card-${props.market.category ? props.market.category : 'crypto'}.png`)}
          alt={props.market.category}
        />
        <CardTitle>
          {props.market.description}
        </CardTitle>
      </Card>
    </CardContainer>
  );
}

export default MarketCard;
