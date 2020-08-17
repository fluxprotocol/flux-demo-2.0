import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

const FilterWrapper = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + label {
    background-color: ${props => props.theme.blue};
    color: white;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-block;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  color: ${props => props.theme.text};  
  background-color: ${props => props.theme.contentCardBackground};
  cursor: ${props => props.notClickable ? 'initial' : 'pointer'};
  user-select: none;
  border-radius: 2rem;
  transition: all 0.1s ease;
`;

const FilterLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
  transform: translateY(-0.4rem);
  margin-right: 0.5rem;
`;

const Icon = styled.img`
  width: 1.3rem;
`;

const CategoryFilters = props => {
  return (
    <ContentWrapper>

      {props.filters.map((filter, index) => (
        <FilterWrapper key={filter.value}>
          <Checkbox 
            disabled={props.notClickable} 
            id={props.secondary ? filter.key : filter.value}
            checked={props.activeFilters.indexOf(filter.value) > -1}
            value={filter.value}
            onChange={props.filterChange}
          />
          <CheckboxLabel 
            notClickable={props.notClickable} 
            htmlFor={props.secondary ? filter.key : filter.value}
          >
            <FilterLabel>
              {filter.label}
            </FilterLabel>
            <Icon src={filter.image} />
          </CheckboxLabel>
        </FilterWrapper>
      ))}

    </ContentWrapper>
  );
}

export default CategoryFilters;