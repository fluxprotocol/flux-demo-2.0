import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// config
import { categoryFilters } from '../../../config/filters';

// common
import ContentWrapper from '../../common/ContentWrapper';
import CategoryLabel from '../../common/CategoryLabel';
import { FlexWrapper, FlexItem } from '../../common/Flex';
import ContentCard from '../../common/ContentCard';
import MarketCardOpinion from '../../common/MarketCardOpinion';
import DateLabel from '../../common/DateLabel';
import CategoryFilters from '../../common/CategoryFilters';

// constants
import { CATEGORIES } from '../../../constants';

const HeaderImagecontainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
  height: 10rem;
  width: 10rem;
  background-color: ${props => props.theme.darkBlue};
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    height: 15rem;
    width: 15rem;
  }

  @media (min-width: ${({ theme }) => theme.largeBreakpoint}) {
    height: 28rem;
    width: 28rem;
    transform: translate(50%, -50%);
  }
`;

const TwitterIcon = styled.img`
  display: none;
  width: 2rem;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: block;
  }
`;

const MainHeaderTitle = styled.h1`
  max-width: 70%;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: white;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    margin-top: 0;
  }
`;

const MainHeader = props => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  
  useEffect(() => {
    if (props.market.categories) {
      const filtered = categoryFilters.filter(categoryFilter => props.market.categories.includes(categoryFilter.value));
      setCategories(filtered);
      setCurrentCategory(props.market.categories[0]);
    }
  }, [props.market])

  return (
    <ContentWrapper 
      backgroundColor={props.market.categories ? props.market.categories[0] : 'crypto'}
      minHeight="22rem"
      overflow="hidden"
      padding="0 0 1rem 0"
    >
      <ContentWrapper
        maxWidth="60rem"
        padding="3rem 1rem 1rem 1rem"
        position="relative"
      >
        <HeaderImagecontainer 
          backgroundImage={require(`../../../assets/images/circle-${CATEGORIES.indexOf(currentCategory) > -1 ? currentCategory : 'crypto'}.png`)}
        >
        </HeaderImagecontainer>
        <ContentWrapper hideForSmall hideForMedium>
          <CategoryFilters
          filters={categories}
          notClickable
          />
        </ContentWrapper>
        <FlexWrapper maxWidth="75%">
          <FlexItem>
              <TwitterIcon
                src={require('../../../assets/images/twitter-circle.png')}
                alt="twitter"
                onClick={() => {}}
              />
            <CategoryLabel hideForSmall>space | {props.market.categories ? props.market.categories[0] : ''}</CategoryLabel>
            <MainHeaderTitle>{(props.market.description) ? props.market.description: 'Market detail'}</MainHeaderTitle>
          </FlexItem>
          <FlexItem hideForSmall hideForMedium>
            <ContentCard display="block">
            <DateLabel 
              themed
              textAlign="left"
              padding="1rem"
            >
              resolution date: <strong>3/20/2020</strong>
            </DateLabel>
              {props.market.outcome_tags &&
                <MarketCardOpinion market={props.market} lastFilledPrices={props.lastFilledPrices} />
              }
            </ContentCard>
          </FlexItem>
        </FlexWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default MainHeader;