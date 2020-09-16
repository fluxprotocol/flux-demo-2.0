import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

const FilterWrapper = styled.div`
  display: inline-block;
  margin-bottom: 0.5rem;
  width: 50%;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    width: auto;
  }
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + label {
    opacity: 1;
    ${props => props.theme.text}
  }
`;

const RadioLabel = styled.label`
  display: inline-block;
  width: 100%;
  padding: 0.4rem 1.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.text};
  border-bottom: 0.2rem solid ${props => props.theme.text};
  opacity: 0.7;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
`;

const FilterLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const OverviewToggle = props => {
  const [checked, setChecked] = useState('resolute');

  const handleRadioChange = (event) => {
    setChecked(event.target.value);
    props.onToggle(event.target.value);
  }

  return (
    <ContentWrapper padding="1rem">

      <FilterWrapper>
        <RadioButton 
          name="overviewType" 
          id="trade"
          value="trade"
          checked={checked === 'trade'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="trade">
          <FilterLabel>
            trade
          </FilterLabel>
        </RadioLabel>
      </FilterWrapper>

      <FilterWrapper>
        <RadioButton 
          name="overviewType" 
          id="resolute"
          value="resolute"
          checked={checked === 'resolute'}
          onChange={handleRadioChange}
        />
        <RadioLabel htmlFor="resolute">
          <FilterLabel>
            resolute
          </FilterLabel>
        </RadioLabel>
      </FilterWrapper>

    </ContentWrapper>
  );
}

export default OverviewToggle;