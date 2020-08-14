import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// config
import { globalColors } from '../../../config/Themes';
import { categoryFilters } from '../../../config/filters';

// common
import ContentWrapper from '../../common/ContentWrapper';
import CategoryFilters from '../../common/CategoryFilters';

const TextArea = styled.textarea`
  display: block;
  height: 5rem;
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: ${globalColors.darkBlue};
  color: white;
  outline: none;
  border: 1px white solid;
  border-radius: 0.3rem;
  resize: none;
`;

const FormTitle = styled.p`
  margin: 1rem 0;
  color: white;
  font-size: 1rem;
  font-weight: bold;
`;

const RadioButton = styled.input.attrs({ type: 'radio' })`
  display: none;

  &:checked + label {
    border: 0.1rem ${globalColors.blue} solid;
  }
`;

const RadioLabel = styled.label`
  display: inline-block;
  margin: ${props => props.margin ? props.margin : 0};
  padding: 1rem 1rem;
  font-size: 0.8rem;
  background-color: ${globalColors.darkBlue};
  border-radius: 0.5rem;
  color: white;
  border: 0.1rem white solid;
  cursor: pointer;
  user-select: none;
  text-align: center;
  transition: all 0.1s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background-color: ${globalColors.darkBlue};
  color: white;
  outline: none;
  border: 1px white solid;
  border-radius: 0.3rem;
`

const CreateMarketForm = props => {
  return (
    <ContentWrapper
      padding="2rem 1rem 1rem 1rem"
    >

      {/* category */}
      <FormTitle>
        Select one or more category
      </FormTitle>
      <CategoryFilters
        filters={categoryFilters}
        secondary
        filterChange={() => {
          //
        }}
      />

      {/* description */}
      <FormTitle>
        Provide description of the market
      </FormTitle>
      <TextArea 
        maxlength="200"
      />

      {/* type */}
      <FormTitle>
        Choose a market type
      </FormTitle>
      <RadioButton 
        name="overviewType" 
        id="binary"
        value="binary"
        checked={true}
        onChange={() => {}}
      />
      <RadioLabel 
        margin="0 1rem 0 0"
        htmlFor="binary"
      >
        Binary
      </RadioLabel>

      <RadioButton 
        name="overviewType" 
        id="categorical"
        value="categorical"
        checked={true}
        onChange={() => {}}
      />
      <RadioLabel
        htmlFor="categorical"
      >
        Categorical
      </RadioLabel>

      {/* source */}
      <FormTitle>
        What source will this market use to resolve?
      </FormTitle>
      <Input 
        type="text"
      />

      {/* api */}
      <FormTitle>
        Is the resolution of the source an API?
      </FormTitle>
      <RadioButton 
        name="overviewType" 
        id="yesApi"
        value="yesApi"
        checked={true}
        onChange={() => {}}
      />
      <RadioLabel 
        margin="0 1rem 0 0"
        htmlFor="yesApi"
      >
        Yes
      </RadioLabel>

      <RadioButton 
        name="overviewType" 
        id="noApi"
        value="noApi"
        checked={true}
        onChange={() => {}}
      />
      <RadioLabel
        htmlFor="noApi"
      >
        No
      </RadioLabel>

      {/* end datetime */}
      <FormTitle>
        When does this market end?
      </FormTitle>

    </ContentWrapper>
  );
}

export default CreateMarketForm;