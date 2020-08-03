import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

// sections
import ButtonSelection from './formSteps/ButtonSelection';

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
  const [currentView, setCurrentView] = useState('buttonSelection');

  return (
    <ContentWrapper 
      width="100%"
      margin={(props.layover && currentView === 'buttonSelection') ? 'auto 0 0 0' : 0}
      padding={props.layover ? '2rem' : 0}
    >

      {/* buttonSelection */}
      {currentView === 'buttonSelection' &&
        <ContentWrapper>
          <ActionTitle textAlign="center">Purchase Shares</ActionTitle>
          <ButtonSelection layover={props.layover} options={binarySelection} />
        </ContentWrapper>
      }
      
    </ContentWrapper>
  );
}

export default ProgressiveForm;