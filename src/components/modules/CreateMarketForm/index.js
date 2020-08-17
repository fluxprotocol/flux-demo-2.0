import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// config
import { globalColors } from '../../../config/Themes';
import { categoryFilters } from '../../../config/filters';

// common
import ContentWrapper from '../../common/ContentWrapper';
import CategoryFilters from '../../common/CategoryFilters';
import Button from '../../common/Button';

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
  display: ${props => props.display ? props.display : 'block'};
  width: ${props => props.width ? props.width : '100%'};
  margin: ${props => props.margin ? props.margin : 0};
  padding: ${props => props.padding ? props.padding : '0.5rem'};
  background-color: ${globalColors.darkBlue};
  color: white;
  outline: none;
  border: 1px white solid;
  border-radius: 0.3rem;

  &::-webkit-calendar-picker-indicator{
  cursor:pointer;
}
`

const CreateMarketForm = props => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [marketDescription, setMarketDescription] = useState('');
  const [marketType, setMarketType] = useState('binary');
  const [categoricalOptions, setCategoricalOptions] = useState([''])
  const [marketEndDateMonth, setMarketEndDateMonth] = useState(moment().month() + 1);
  const [marketEndDateDay, setMarketEndDateDay] = useState(moment().add(1, 'd').date());
  const [marketEndDateYear, setMarketEndDateYear] = useState(moment().year());
  const [marketEndTime, setMarketEndTime] = useState('12:00');

  const handleCategoryChange = (event) => {
    const filter = event.target.value;
    const filterIndex = selectedCategories.indexOf(filter);

    if (filterIndex === -1) setSelectedCategories([ ...selectedCategories, filter]); 
    else setSelectedCategories(selectedCategories.filter(item => item !== filter))
  }

  const addNewCategoricalOption = () => {
    setCategoricalOptions(oldCategoricalOptions => [...oldCategoricalOptions, ''])
  }

  const handleLaunchMarket = () => {
    const unix = moment(`${marketEndDateDay}-${marketEndDateMonth}-${marketEndDateYear} ${marketEndTime}`, 'DD-MM-YYYY').format('x')
    const market = {
      marketType: marketType,
      description: marketDescription,
      extraInfo: '',
      categories: selectedCategories,
      endTime: unix,
    };

    if (marketType === 'categorical') {
      market.categoricalOptions = categoricalOptions;
    }

    props.launchMarket(market);
  }

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
        filterChange={handleCategoryChange}
      />

      {/* description */}
      <FormTitle>
        Provide description of the market
      </FormTitle>
      <TextArea 
        maxlength="200"
        value={marketDescription}
        onChange={(event) => {
          setMarketDescription(event.target.value);
        }}
      />

      {/* type */}
      <FormTitle>
        Choose a market type
      </FormTitle>
      <RadioButton 
        name="marketType" 
        id="binary"
        value="binary"
        checked={marketType === 'binary'}
        onChange={(event) => {
          setMarketType(event.target.value)
        }}
      />
      <RadioLabel 
        margin="0 1rem 0 0"
        htmlFor="binary"
      >
        Binary
      </RadioLabel>

      <RadioButton 
        name="marketType" 
        id="categorical"
        value="categorical"
        checked={marketType === 'categorical'}
        onChange={(event) => {
          setMarketType(event.target.value)
        }}
      />
      <RadioLabel
        htmlFor="categorical"
      >
        Categorical
      </RadioLabel>

      {/* {categorical options} */}
      {marketType === 'categorical' &&
        <div>
          {categoricalOptions.map((option, index) => 
            <Input 
              key={`categoricalOption_${index}`}
              margin="1rem 0"
              type="text"
              value={categoricalOptions[index]}
              onChange={(event) => {
                const newValue = event.target.value;

                setCategoricalOptions(oldArray => {
                  const array = [...oldArray];
                  array[index] = newValue;
                  return array;
                })
              }}
            />
          )}

          <Button 
            onClick={addNewCategoricalOption}
          >
            add more
          </Button>
        </div>
      }

      {/* end datetime */}
      <FormTitle>
        When does this market end?
      </FormTitle>
      <Input
        min="1"
        max="12"
        display="inline-block"
        width="15%"
        margin="0 0.5rem 0 0"
        type="number"
        color="white"
        value={marketEndDateMonth}
        onChange={(event) => {
          let date = event.target.value;
          setMarketEndDateMonth(date);
        }}
      />
      <Input
        min="1"
        max="31"
        display="inline-block"
        width="15%"
        margin="0 0.5rem 0 0"
        type="number"
        color="white"
        value={marketEndDateDay}
        onChange={(event) => {
          let date = event.target.value;
          setMarketEndDateDay(date);
        }}
      />
      <Input
        min="2020"
        display="inline-block"
        width="22%"
        margin="0 0.5rem 0 0"
        type="number"
        color="white"
        value={marketEndDateYear}
        onChange={(event) => {
          let date = event.target.value;
          setMarketEndDateYear(date);
        }}
      />

      <Input 
        display="inline-block"
        width="35%"
        margin="0 0 0 0.5rem"
        padding="6px"
        type="time"
        color="white"
        value={marketEndTime}
        onChange={(event) => {
          const time = event.target.value;
          setMarketEndTime(time);
        }}
      />

      <Button   
        color="lightPurple"
        margin="1rem 0"
        padding="1rem 2rem"
        onClick={handleLaunchMarket}
      >
        Launch this market
      </Button>
    </ContentWrapper>
  );
}

export default CreateMarketForm;