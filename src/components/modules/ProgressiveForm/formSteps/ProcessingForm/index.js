import React from 'react';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';
import Loader from '../../../../common/Loader';
import Paragraph from '../../../../common/Paragraph';

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
        className="finalOrderOverview"
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
              <Paragraph
                size="1.8rem"
                color="white"
                fontWeight="bold"
              >
                Processing...
              </Paragraph>
              <Paragraph
                size="0.9rem"
                color="white"
              >
                placing buy order for
                <strong> {props.finalOrder[1]} shares</strong>
              </Paragraph>
            </ContentWrapper>
          </FlexWrapper>
        </FlexItem>
        {/* <FlexItem 
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
                  props.cancel()
                }}
              >
                Cancel
              </Button>
          </ContentWrapper>
        </FlexWrapper>
        </FlexItem> */}
    </FlexWrapper>
  );
}

export default ProcessingForm;