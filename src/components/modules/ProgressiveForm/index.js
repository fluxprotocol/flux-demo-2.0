import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

// form sections
import ButtonSelection from './formSteps/ButtonSelection';
import SharesForm from './formSteps/SharesForm';
import FormOverview from './formSteps/FormOverview';
import ProcessingForm from './formSteps/ProcessingForm';
import FormCompleted from './formSteps/FormCompleted';

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const binarySelection = [
  {
    forecast: '40%',
    marketPrice: 30,
    name: 'yes',
  },
  {
    forecast: '45%',
    marketPrice: 55,
    name: 'no',
  }
];

const multipleSelection = [
  'Trump',
  'Biden',
  'Kanye',
];


const ProgressiveForm = props => {
  const [currentView, setCurrentView] = useState('buttonSelection'); // buttonSelection, sharesForm, review, processing, orderCompleted
  const [sharesType, setSharesType] = useState(''); // yes, no, {other}
  const {marketPricesData, lastFilledPrices} = props;
  console.log(props.market.outcome_tags)
  return (
    <ContentWrapper 
      width="100%"
      margin={(props.layover && currentView === 'buttonSelection') ? 'auto 0 0 0' : 0}
    >

      {/* buttonSelection */}
      {currentView === 'buttonSelection' &&
        <ContentWrapper padding="2rem">
          <ActionTitle textAlign="center">Purchase Shares</ActionTitle>
          <ButtonSelection
            layover={props.layover}
            options={binarySelection} 
            buttonEvent={(response) => {
              setCurrentView('sharesForm');
              setSharesType(response);
            }}
          />
        </ContentWrapper>
      }

      {/* sharesForm */}
      {currentView === 'sharesForm' &&
        <ContentWrapper
          height="100%"
        >
          <SharesForm  
            layover={props.layover}
            sharesType={sharesType}
            formEvent={(response) => {
              setCurrentView(response);
            }}
          />
        </ContentWrapper>
      }

      {/* review */}
      {currentView === 'review' &&
        <ContentWrapper height="100%">
          <FormOverview
            sharesType={sharesType}
            layover={props.layover}
            formEvent={(response) => {
              setCurrentView(response);
            }}
          />
        </ContentWrapper>
      }

      {/* processing */}
      {currentView === 'processing' &&
        <ContentWrapper height="100%">
          <ProcessingForm
            sharesType={sharesType}
            layover={props.layover}
            formEvent={(response) => {
              setCurrentView(response);
            }}
          />
        </ContentWrapper>
      }

      {/* orderCompleted */}
      {currentView === 'orderCompleted' &&
        <ContentWrapper height="100%">
          <FormCompleted
            sharesType={'yes'}
            layover={props.layover}
            formEvent={(response) => {
              setCurrentView(response);
            }}
          />
        </ContentWrapper>
      }
      
      
    </ContentWrapper>
  );
}

export default ProgressiveForm;