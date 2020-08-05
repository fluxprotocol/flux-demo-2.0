import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

// form sections
import ButtonSelection from './formSteps/ButtonSelection';
import SharesForm from './formSteps/SharesForm';
import FormOverview from './formSteps/FormOverview';

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
  const [currentView, setCurrentView] = useState('buttonSelection'); // buttonSelection, sharesForm, review, loading, orderCompleted
  const [sharesType, setSharesType] = useState(''); // yes, no, {other}

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
      
    </ContentWrapper>
  );
}

export default ProgressiveForm;