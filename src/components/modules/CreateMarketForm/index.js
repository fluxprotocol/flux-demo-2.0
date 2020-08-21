import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// config
import { globalColors } from '../../../config/Themes';
import { categoryFilters } from '../../../config/filters';

// common
import ContentWrapper from '../../common/ContentWrapper';
import CategoryFilters from '../../common/CategoryFilters';
import Paragraph from '../../common/Paragraph';
import Button from '../../common/Button';
import { FlexWrapper, FlexItem } from '../../common/Flex';

// context
import { FluxContext } from '../../../context/FluxProvider';

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

const Label = styled.label`
  display: block;
  margin: ${props => props.margin ? props.margin : '1rem 0 0.5rem 0'};
  font-size: ${props => props.fontSize ? props.fontSize : '0.8rem'};
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'left'};
`;

const CreateMarketForm = props => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [marketDescription, setMarketDescription] = useState('');
  const [marketType, setMarketType] = useState('binary');
  const [categoricalOptions, setCategoricalOptions] = useState([''])
  const [marketEndDateMonth, setMarketEndDateMonth] = useState(moment().month() + 1);
  const [marketEndDateDay, setMarketEndDateDay] = useState(moment().add(1, 'd').date());
  const [marketEndDateYear, setMarketEndDateYear] = useState(moment().year());
  const [marketEndTime, setMarketEndTime] = useState('12:00');
  const [error, setError] = useState('');
  const [flux, _] = useContext(FluxContext);

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
    const unix = moment(`${marketEndDateDay}-${marketEndDateMonth}-${marketEndDateYear} ${marketEndTime}`, 'DD-MM-YYYY hh:mm').format('X')
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

    launchMarket(market);
  }

  const createBinaryMarket = async (market) => {
    setError('');
    try {
      const newMarketId = await flux.createBinaryMarket(
        market.description,
        market.extraInfo,
        market.categories,
        market.endTime,
        1
      );
    } catch (err) {
      console.log('err', err.message);
      setError(err.message);
    }
  }

  const createCategoricalMarket = async (market) => {
    setError('');
    try {
      const newMarketId = await flux.createCategoricalMarket(
        market.description,
        market.extraInfo,
        market.outcomes,
        market.categories,
        market.endTime,
        1
      );
    } catch (err) {
      console.log('err', err.message);
      setError(err.message);
    }
  }

  const launchMarket = (market) => {
    if (market.marketType === 'binary') {
      createBinaryMarket(market);
      return;
    }

    if (market.marketType === 'categorical') {
      console.log('market:', market.endTime);
      debugger;
      createCategoricalMarket(market);
      return;
    }

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
        activeFilters={selectedCategories}
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
            <div
              key={`outcome_${index}`}
            >
              <Label>Outcome {index + 1}</Label>
              <Input 
                key={`categoricalOption_${index}`}
                margin="0 0 1rem 0"
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
            </div>
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
      <FlexWrapper>
        <FlexItem
          padding="0 0.5rem 0 0"
        >
          <Input
            min="1"
            max="12"
            display="inline-block"
            type="number"
            color="white"
            value={marketEndDateMonth}
            onChange={(event) => {
              let date = event.target.value;
              setMarketEndDateMonth(date);
            }}
          />
          <Label
            margin="0.4rem auto 0 auto"
            textAlign="center"
          >
            month
          </Label>
        </FlexItem>
        <FlexItem
          padding="0 0.5rem 0 0"
        >
          <Input
            min="1"
            max="31"
            display="inline-block"
            type="number"
            color="white"
            value={marketEndDateDay}
            onChange={(event) => {
              let date = event.target.value;
              setMarketEndDateDay(date);
            }}
          />
          <Label
            margin="0.4rem auto 0 auto"
            textAlign="center"
          >
            day
          </Label>
        </FlexItem>
        <FlexItem
          padding="0 0.5rem 0 0"
        >
          <Input
            min="2020"
            display="inline-block"
            type="number"
            color="white"
            value={marketEndDateYear}
            onChange={(event) => {
              let date = event.target.value;
              setMarketEndDateYear(date);
            }}
          />
          <Label
            margin="0.4rem auto 0 auto"
            textAlign="center"
          >
            year
          </Label>
        </FlexItem>
        <FlexItem>
          <Input 
            display="inline-block"
            padding="6px"
            type="time"
            color="white"
            value={marketEndTime}
            onChange={(event) => {
              const time = event.target.value;
              setMarketEndTime(time);
            }}
          />
          <Label
            margin="0.4rem auto 0 auto"
            textAlign="center"
          >
            time
          </Label>
        </FlexItem>
      </FlexWrapper>

      {error.length > 0 &&
        <Paragraph
          margin="1.5rem 0 0 0"
          color="red"
        >
          {error}
        </Paragraph>      
      }

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