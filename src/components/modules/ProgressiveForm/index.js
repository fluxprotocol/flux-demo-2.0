import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';

// form sections
import ButtonSelection from './formSteps/ButtonSelection';
import SharesForm from './formSteps/SharesForm';
import FormOverview from './formSteps/FormOverview';
import ProcessingForm from './formSteps/ProcessingForm';
import FormCompleted from './formSteps/FormCompleted';

// constant
import {CONTRACT_ID} from '../../../constants';

// context
import { FluxContext } from '../../../context/FluxProvider';

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


const ProgressiveForm = props => {
  const [flux, _] = useContext(FluxContext);
  const [currentView, setCurrentView] = useState('buttonSelection'); // buttonSelection, sharesForm, review, processing, orderCompleted
  const [sharesType, setSharesType] = useState('');
  const [finalOrder, setFinalOrder] = useState('');
  const [placeOrder, setPlaceOrder] = useState('');

  const {market, marketPricesData, lastFilledPrices} = props;

  const testFunc = async (order) => {
    console.log('incoming data', order, market);
    // currently hardcoded to 1 - since we are only handling yes orders
    let orderData = order[1];
    let denominatedDai =  parseInt((orderData[1] * orderData[2]) * 100000);
    let marketID = market.id;
    let contractType = 1;
    let buyingPrice = orderData[2];

    const createOrder = await flux.placeOrder(denominatedDai, marketID, contractType, buyingPrice);
    console.log('this is create order', createOrder);
    setPlaceOrder(createOrder);
  }

  const handleClose = () => {
    console.log('this event should close this modal');
  }


  return (
    <ContentWrapper 
      className="purchase_shares"
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
            lastFilledPrices={props.lastFilledPrices}
            market={props.market} 
            marketPricesData={props.marketPricesData}
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
              setCurrentView(response[0]);
              setFinalOrder(response);
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
            finalOrder={finalOrder}
            formEvent={(response) => {
              setCurrentView(response[0]);
              testFunc(response);
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
            orderOutcome={placeOrder}
            layover={props.layover}
            formEvent={(response) => {
              setCurrentView(response);
            }}
          />
        </ContentWrapper>
      }
    
      <div
        onClick={handleClose}
      >
        Cancel
      </div>
    </ContentWrapper>
  );
}

export default ProgressiveForm;