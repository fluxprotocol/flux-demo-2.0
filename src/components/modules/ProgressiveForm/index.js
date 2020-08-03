import React from 'react';
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
  return (
    <ContentWrapper>
      <ActionTitle textAlign="center">Purchase Shares</ActionTitle>
      <ButtonSelection options={multipleSelection} />
      
    </ContentWrapper>
  );
}

export default ProgressiveForm;