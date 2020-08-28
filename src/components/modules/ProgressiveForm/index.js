import React, { useState, useContext } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../common/ContentWrapper';
import Button from '../../common/Button';

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
import { toDenom } from '../../../helpers/numberUtils';

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const ProgressiveForm = props => {
  const [flux, _] = useContext(FluxContext);
  const [currentView, setCurrentView] = useState('buttonSelection'); // buttonSelection, sharesForm, review, processing, orderCompleted
  const [sharesType, setSharesType] = useState('');
  const [finalOrder, setFinalOrder] = useState('');
  const [placeOrder, setPlaceOrder] = useState('');

  const {market} = props;

  const testFunc = async (order) => {
    // currently hardcoded to 1 - since we are only handling yes orders
    let orderData = order[1];
    let denominatedDai =  parseInt((orderData[1] * orderData[2]) * 100000);

    // let denominatedDai =  toDenom(parseInt((orderData[1] * orderData[2]));
    let marketID = market.id;
    let buyingPrice = orderData[2];
    const createOrder = await flux.placeOrder(marketID, sharesType[3], denominatedDai, buyingPrice, "");
    setPlaceOrder(createOrder);
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
            lastFilledPrices={props.lastFilledPrices}
            market={props.market} 
            marketPricesData={props.marketPricesData}
            buttonEvent={(response) => {
              setCurrentView('sharesForm');
              console.log('sharestype', response);
              setSharesType(response);
            }}
            cancel={() => {
              setCurrentView('buttonSelection');
            }}
          />

          {props.isMobile &&
            <Button
              color="lightPurple"
              margin="1rem 0 0 0"
              onClick={() => {
                props.cancelMobile();
              }}
              cancel={() => {
                setCurrentView('buttonSelection');
              }}
            >
              Close
            </Button>
          }

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
            cancel={() => {
              setCurrentView('buttonSelection');
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
            cancel={() => {
              setCurrentView('buttonSelection');
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
            cancel={() => {
              setCurrentView('buttonSelection');
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

    </ContentWrapper>
  );
}

export default ProgressiveForm;