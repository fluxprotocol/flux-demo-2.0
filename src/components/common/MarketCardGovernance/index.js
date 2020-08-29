import React from 'react';
import styled from 'styled-components';

// common
import Button from '../Button';
import { fromDenom } from '../../../helpers/numberUtils';


// // temp data, will use market prop
// const governanceRows = [
//   {
//     label: 'Yes',
//     color: 'lightPurple',
//     borderColor: 'lightPurple',
//     action: '',
//   },
//   {
//     label: 'No',
//     color: 'pink',
//     borderColor: 'pink',
//     action: '',
//   },
//   {
//     label: 'Invalid',
//     color: 'darkBlue',
//     borderColor: 'white',
//     action: '',
//   },
// ];

const VolumeAmount = styled.div`
  margin-left: 0.5rem;
  color: 'white';
`;

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

  const color = props.market.outcomes > 2 ? 'lightPurple' : 'pink';
  const handleStake = (outcome) => {
    // todo
  }

  const outcomeTags = props.market.outcomes > 2 ? props.market.outcome_tags : ["NO", "YES"]

  return (
      <MarketGovernanceContainer>
        {outcomeTags.map((outcome, i) => (
          <ContainerRow key={outcome}>
            <ContainerColumn position="left">
              {outcome}
            </ContainerColumn>
            <ContainerColumn position="right">
              <Button
                color={color}
                borderColor={color}
                onClick={() => handleStake(i)}
              >
                Stake ${fromDenom(props.market.resolute_bond)}
              </Button>
            </ContainerColumn>
          </ContainerRow>
        ))}

        <ContainerRow>
          <ContainerColumn position="left">
            Invalid
          </ContainerColumn>
          <ContainerColumn position="right">
            <Button
              color="darkBlue"
              borderColor="white"
              onClick={() => handleStake(null)}
            >
              Stake ${fromDenom(props.market.resolute_bond)}
            </Button>
          </ContainerColumn>
        </ContainerRow>

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
