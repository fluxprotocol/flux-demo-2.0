import React from 'react';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';
import Paragraph from '../../../../common/Paragraph';
import useWindowDimensions from '../../../../../hooks/useWindowDimensions';

const completedIcon = require('../../../../../assets/images/icons/icon-completed.svg');

const FormCompleted = props => {
  const colorMap = {
    yes: 'lightPurple',
    no: 'pink',
  };
  const { width } = useWindowDimensions();

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
              <Paragraph
                margin="2rem 0 0 0"
                size="1.8rem"
                color="white"
                fontWeight="bold"
              >
                Order completed!
              </Paragraph>
              <Paragraph
                size="0.9rem"
                color="white"
              >
                buy order placed for
                <strong> {props.finalOrder[1]} shares</strong>
              </Paragraph>
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
                if (width < 650) {
                  props.cancelMobile();
                } else {
                  props.formEvent('buttonSelection')
                }
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