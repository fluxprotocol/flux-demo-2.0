import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: flex;
  height: 0.5rem;
  width: 100%;
  margin: 1rem 0;
  background-color: ${props => props.theme.gray};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ProgressBarBlock = styled.div`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.theme[props.color]};
`;

const ProgressBar = props => {
  return (
      <ProgressBarContainer>

        {Object.keys(props.outcomes).map((key, i) => (
          <ProgressBarBlock 
            key={props.outcomes[key].label}
            width={`${props.lastFilledPrices[key]}%`}
            color={props.outcomes[key].color}
          />
        ))}

        {/* {props.items.map((item, index) => (
          <ProgressBarBlock 
            key={item.label}
            width={`${item.percentage}%`}
            color={item.color}
          />
        ))} */}
      </ProgressBarContainer>
  );
}


export default ProgressBar;