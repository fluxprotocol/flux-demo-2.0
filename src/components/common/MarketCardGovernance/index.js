import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Countdown from 'react-countdown';

// common
import Button from '../Button';
import { fromDenom, toDenom } from '../../../helpers/numberUtils';
import { FluxContext } from '../../../context/FluxProvider';
import { RESOLUTION_STATE } from '../../../constants';
import LoaderButton from '../LoaderButton';

const Title = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
`;

const VolumeAmount = styled.div`
  margin-left: 0.5rem;
  color: 'white';
`;

const CountdownSection = styled.p`
  font-size: 0.9rem;
  text-align: center;
  padding-bottom: 2rem;
`

const MarketGovernanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  background-color: ${props => props.theme.contentCardBackground};
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 3px 20px rgba(0,0,0,0.2);

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: -3rem;
    left: 0;
    width: 100%;
    height: 3rem;
    background-color: ${props => props.theme.contentCardBackground};
  }
`;

const ContainerRow = styled.div`
  display: flex;
  flex:1;
  margin-top: ${props => props.marginTop ? '2rem' : 0};
  margin-bottom: 0.5rem;
`;

const ContainerColumn = styled.div`
  margin-right: ${props => props.position === 'left' ? 'auto' : 'initial'};
  margin-left: ${props => props.position === 'right' ? 'auto' : 'initial'};
`;

const MarketCardGovernance = props => {
  const [flux] = useContext(FluxContext);
  const [loading, setLoading] = useState(false);
  const color = props.market.outcomes > 2 ? 'lightPurple' : 'pink';
  
  const resolutionPrice = props.market.resolution_state == 1 ? fromDenom(props.market.resolute_bond) : fromDenom(props.market.resolute_bond) * 2 ** (props.market.resolution_state - 1);
  const handleStake = async (outcome) => {
    setLoading(outcome);
    if (props.market.resolution_state == "1") {
      const res = await flux.resolute(props.market.id, outcome !== null ? outcome.toString() : null, props.market.resolute_bond);
    } else if (props.market.resolution_state == "2" && !finalizable) {
      const res = await flux.dispute(props.market.id, outcome.toString(), toDenom(resolutionPrice.toString()));
    }
    setLoading(false)
    props.getMarkets();
  }


  const finalize = async () => {
    setLoading(null);
    const res = await flux.finalize(props.market.id);
    setLoading(false);
    props.getMarkets();
  }


  const now = Date.now();
  const endTime = new Date(props.market.resolution_round_end_time).getTime();
  const finalizable = (props.market.resolution_state > 1 && endTime <= now) || props.market.resolution_state == "3";
  const outcomeTags = props.market.outcomes > 2 ? props.market.outcome_tags : ["NO", "YES"];

  return (
      <MarketGovernanceContainer>
        <CountdownSection>
          {
            props.market.resolution_state == "2" && !finalizable && <> 
              Time left to post dispute: <Countdown date={endTime}/>
            </>
          }
        </CountdownSection>
        <Title>
          {!finalizable ? RESOLUTION_STATE[props.market.resolution_state] : RESOLUTION_STATE[3]}
        </Title>
       {props.market.winning_outcome !== null && <Title>
          Last winning outcome: {outcomeTags[props.market.winning_outcome] || "INVALID"}
        </Title>}
        {
          !finalizable ? <> 
            {outcomeTags.map((outcome, i) => (
              <ContainerRow key={outcome}>
                <ContainerColumn position="left">
                  {outcome}
                </ContainerColumn>
                <ContainerColumn position="right">
                  <LoaderButton
                    color={color}
                    loading={loading === i}
                    borderColor={color}
                    onClick={() => handleStake(i)}
                  >
                    Stake ${resolutionPrice}
                  </LoaderButton>
                </ContainerColumn>
              </ContainerRow>
            ))}
    
            <ContainerRow>
              <ContainerColumn position="left">
                Invalid
              </ContainerColumn>
              <ContainerColumn position="right">
                <LoaderButton
                  color="darkBlue"
                  loading={loading === null}
                  borderColor="white"
                  onClick={() => handleStake(null)}
                >
                  Stake ${resolutionPrice}
                </LoaderButton>
              </ContainerColumn>
            </ContainerRow>
          
          </>
          :

          <> 
            <ContainerRow>
              <ContainerColumn position="left">
                <LoaderButton
                  color="pink"
                  loading={loading === null}
                  borderColor="white"
                  onClick={() => finalize()}
                >
                  {props.market.resolution_state == "3" ? "Finalizable by judge" : "Finalizable"}
                </LoaderButton>
              </ContainerColumn>
            </ContainerRow>
          </>
        }


        <ContainerRow marginTop>
          <ContainerColumn position="left">
            Total Volume
          </ContainerColumn>
          <ContainerColumn position="right">
            <VolumeAmount category={props.market.categories[0]}>
              {props.market.volume ? "$" + fromDenom(props.market.volume) : '-'} DAI
            </VolumeAmount>
          </ContainerColumn>
        </ContainerRow>
        
      </MarketGovernanceContainer>
  );
}

export default MarketCardGovernance;
