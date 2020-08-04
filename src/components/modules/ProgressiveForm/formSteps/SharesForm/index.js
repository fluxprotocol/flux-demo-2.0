import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';

const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const SharesForm = props => {
  const colorMap = {
    yes: 'lightPurple',
    no: 'pink',
  };

  return (
    // <ContentWrapper height="100%">

      <FlexWrapper
        flexDirection="column"
        height="100%"
      >

        <ContentWrapper
          backgroundColor={props.layover ? colorMap[props.sharesType] : 'transparent'}
          width="100%"
          padding={props.layover ? '2rem' : 0}
          >
          <ActionTitle textAlign="center">Buy {props.sharesType} Shares</ActionTitle>
          <FlexWrapper margin="1rem 0">
            <FlexItem>
              Number of Shares
            </FlexItem>
            <FlexItem textAlign="right">
              100
            </FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem>
              Market Price
            </FlexItem>
            <FlexItem textAlign="right">
              $0.75
            </ FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem>
              Estimated Cost
            </FlexItem>
            <FlexItem textAlign="right">
              $75
            </FlexItem>
          </FlexWrapper>
          <RowDivider />
        </ContentWrapper>

        <ContentWrapper 
          margin="auto 0 0 0"
          padding={props.layover ? '2rem' : 0}
          textAlign={props.layover ? 'center' : 'right'}
        >
        <Button
            margin="2rem 0 0 0"
            borderColor="transparent"
            onClick={ () => {
              props.formEvent('review')
            }}
          >
            Cancel
          </Button>
          <Button
            margin="2rem 0 0 0"
            color={colorMap[props.sharesType]}
            onClick={ () => {
              props.formEvent('review')
            }}
          >
            Review
          </Button>
        </ContentWrapper>

      </FlexWrapper>
      
    // </ContentWrapper>
  );
}

export default SharesForm;