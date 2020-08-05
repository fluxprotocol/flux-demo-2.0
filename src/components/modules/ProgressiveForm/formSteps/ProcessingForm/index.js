import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';
import Loader from '../../../../common/Loader';


const Title = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: white;
`;

const ProcessingForm = props => {
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
              <Loader />
              <Title>Processing...</Title>
              <SubTitle>
                placing buy order for
                <strong> 133.33</strong>
              </SubTitle>
            </ContentWrapper>
          </FlexWrapper>
        </FlexItem>
        <FlexItem 
          alignItems="center"
          justifyContent="center"
          textAlign="right"
          padding="1rem"
        >
        <FlexWrapper 
          height="100%"
          >
          <ContentWrapper
           margin="auto 0 0 0"
           width="100%"
           textAlign="center"
          >
            <Button
                borderColor="transparent"
                onClick={ () => {
                  props.formEvent('sharesForm')
                }}
              >
                Cancel
              </Button>
          </ContentWrapper>
        </FlexWrapper>
        </FlexItem>
    </FlexWrapper>
  );
}

export default ProcessingForm;