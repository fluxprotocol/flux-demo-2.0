import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';

const completedIcon = require('../../../../../assets/images/icons/icon-completed.svg');


const Title = styled.p`
  margin-top: 2rem;
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: white;
`;

const FormCompleted = props => {
  const colorMap = {
    yes: 'lightPurple',
    no: 'pink',
  };

  return (
    <FlexWrapper
        flexDirection="column"
        height={props.layover ? '100%' : '350px'}
      >
      <FlexItem
        backgroundColor={colorMap[props.sharesType]}
        width="100%"
        flex={props.layover ? '2' : '8'}
        >
          <FlexWrapper
            padding="2rem"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height="100%"
          >
            <ContentWrapper textAlign="center">
              <img alt="order completed" src={completedIcon} />
              <Title>Order completed!</Title>
              <SubTitle>
                buy order placed for
                <strong> 133.33</strong>
              </SubTitle>
            </ContentWrapper>
          </FlexWrapper>
        </FlexItem>
        <FlexItem
          backgroundColor={colorMap[props.sharesType]}
          width="100%"
          textAlign="center"
          padding="0 0 2rem 0"
        >
          <FlexWrapper
            justifyContent="center"
            height="100%"
          >
            <Button
              margin={props.layover ? 'auto 0 0 0' : 0}
              height="fit-content"
              borderColor="white"
              onClick={ () => {
                props.formEvent('buttonSelection')
              }}
            >
              Done
            </Button>
          </FlexWrapper>
        </FlexItem>
    </FlexWrapper>
  );
}

export default FormCompleted;