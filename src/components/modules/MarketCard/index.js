import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { TwitterShareButton, TwitterIcon } from 'react-share';

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
  cursor: pointer;

  &:hover {
    .card {
      transform: translateY(-0.3rem);
    }
  }

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
  transition: 0.3s ease;
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

const StyledTwitterShareButton = styled(TwitterShareButton)`
  width: 2rem;
  cursor: pointer;
`

const MarketCard = props => {
  const history = useHistory();

  const handleCardClick = (id) => {
    history.push(`/markets/${props.market.id}`);
  };

  return (
    <CardContainer 
      onClick={() => handleCardClick(props.market.id)}
    >

      {/* colored card block */}
      <Card 
        category={props.market.categories[0]}
        cardType={props.cardType}
        className="card"
      >
        <StyledTwitterShareButton
					url={`https://app.flux.market/market/${props.market.id}`}
					title={`Checkout this @fluxprotocol market: ${props.market.description}`}
				>
					<TwitterIcon
						size={40}
						round
						iconFillColor={"white"}
						hashtags={["flux", "fluxProtocol", "markets"]}
						bgStyle={
							{fill: "#0D0C0C"}
						}
					/>
				</StyledTwitterShareButton>
        <CategoryLabel>Space | startups</CategoryLabel>
        <CardImage 
          src={require(`../../../assets/images/card-${CATEGORIES.indexOf(props.market.categories[0]) > -1 ? props.market.categories[0] : 'crypto'}.png`)}
          alt={props.market.category}
        />
        <CardTitle>
          {props.market.description}
        </CardTitle>
        <DateLabel>
          resolution date: <strong>{moment.unix(props.market.end_timestamp).format("MM/DD/YYYY")}</strong>
        </DateLabel>
      </Card>

      {/* market info */}
      {props.cardType === 'trade' &&
        <MarketCardOpinion market={props.market} lastFilledPrices={props.market.prices}/>
      }

      {props.cardType === 'resolute' &&
        <MarketCardGovernance market={props.market}/>
      }

    </CardContainer>
  );
}

export default MarketCard;
