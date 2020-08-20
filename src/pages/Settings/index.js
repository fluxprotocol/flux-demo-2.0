import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

// hooks
import { useDarkModeTheme, useFluxAuth } from '../../App';

// context
import { FluxContext } from '../../context/FluxProvider';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import { FlexWrapper } from '../../components/common/Flex';
import ThemeToggler from '../../components/common/ThemeToggler';

const SettingsLabel = styled.span`
  color: white;
`;

const SettingsToggle = styled.div`
  margin-left: auto;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  font-size: 1.2em;
  border-bottom: 1px solid #2C2A43;
  background-color: ${props => props.theme.contentCardBackground};

  & img {
    margin-right: 1rem;
  }

  &.account_details {
    justify-content: space-between;

    & div:last-child {
      color: #2C2A43;
      font-weight: 900;
      font-size: 1em;
    }
  }

  &.order_history {
    margin: 1em 0;
  }
`;

const ContractContainer = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    text-transform: uppercase;
    padding: 0 1em 1em 1em;
  }

  & div.table_wrapper {
    width: 100%;
    background-color: #0F0E25;
  }

  & span.filled_field {
    padding-top: 1em;
  }
`;

const OrderHistoryWrapper = styled.table`
  width: 100%;
  padding-top: 1em;
`;

const OrderHistoryBody = styled.tbody`
`;

const OrderHistoryRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1em 1em 1em;

  &.headings {
    padding-bottom: 0;
    justify-content: flex-start;
    & th {
      margin-right: .5em;
    }
  }

  &.data_row {
    border-bottom: 1px solid #2C2A43;
    padding-top: 1em;
  }

  &.data_row:first-of-type {
    padding-top: 0;
  }

  &.data_row:last-of-type {
    border: none;
  }
`;

const OrderHistoryHeadings = styled.th`
  font-weight: 400;
  color: gray;
  padding-bottom: 1em;

  @media (min-width: ${({ theme }) => theme.smallBreakpoint}) {
    width: 25%;
  }
`;

const OrderHistoryData = styled.td`
`;

const OrderButton = styled.td`
  background: ${props => props.backgroundColor ? props.backgroundColor : '#5400FF'};
  color: white;
  border-radius: 8px;
  padding: .25em .5em;
  width: 4em;
  font-size: .8em;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.smallBreakpoint}) {
    font-size: 1em;
  }
`;

const ProfileIcon = require("../../assets/images/icons/profile_icon.png");
const ReferralIcon = require("../../assets/images/icons/referral_icon.png");

const dataSet = [
  {
    contract: 'Trump',
    price_per_share: '$70',
    order_value: '$0.50',
  },
  {
    contract: 'Trump',
    price_per_share: '$70',
    order_value: '$0.50',
  },
  {
    contract: 'Trump',
    price_per_share: '$70',
    order_value: '$0.50',
  }
]

const dataHeaders = ["contract", "price per share", "order value"];

const Settings = props => {
  const { user } = useFluxAuth();
  const [flux, ] = useContext(FluxContext);
  const { toggleTheme, theme } = useDarkModeTheme();

  const [order, setOpenOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    getOpenOrders();
  }, [user]);


  const getOpenOrders = async () => {
    console.log('this is user', user);
    let openOrders = await flux.getOpenOrders(user.id);
    console.log('this is openOrders', openOrders);
    
    setOpenOrders(openOrders);
  }

  return (
    <ContentWrapper 
      maxWidth="40rem"
      paddingSmall="1rem 0"
      padding="2rem 1rem"
    >
      <SettingsContainer>
        <img src={ProfileIcon} alt="" />
        Peter
      </SettingsContainer>

      <SettingsContainer
        className="account_details"
      >
        <div>
          <img src={ReferralIcon} alt="" />
          My Referral ID
        </div>
        <div>
          ID: 123456
        </div>
      </SettingsContainer>

      <SettingsContainer
        className="order_history"
      >
        Order History
      </SettingsContainer>
      <ContractContainer>
        <span>Pending</span>
        <table>
          <tbody>
            <OrderHistoryRow
              className="headings"
            >
              {
                dataHeaders.map((heading) => (
                  <OrderHistoryHeadings
                    key={heading}
                  >
                    {heading}
                  </OrderHistoryHeadings>
                ))
              }
            </OrderHistoryRow>
          </tbody>
        </table>
        <div 
          className="table_wrapper"
        >
          <OrderHistoryWrapper>
            <OrderHistoryBody>
              {
                dataSet.map((order, index) => (
                  <OrderHistoryRow
                  key={order.contract + index} 
                    className="data_row"
                  >
                    <OrderHistoryData>
                      {order.contract}
                    </OrderHistoryData>
                    <OrderHistoryData>
                      {order.price_per_share}
                    </OrderHistoryData>
                    <OrderHistoryData>
                      {order.order_value}
                    </OrderHistoryData>
                    <OrderButton
                      backgroundColor="#FF009C"
                    >
                      cancel
                    </OrderButton>
                  </OrderHistoryRow>
                ))
              }
            </OrderHistoryBody>
          </OrderHistoryWrapper>
        </div>
      </ContractContainer>

      <ContractContainer>
        <span 
          className="filled_field"
        >
          Filled
        </span>
        <div 
          className="table_wrapper"
        >
          <OrderHistoryWrapper>
            <OrderHistoryBody>
              {
                dataSet.map((order, index) => (
                  <OrderHistoryRow
                    key={order.contract + index} 
                    className="data_row"
                  >
                    <OrderHistoryData>
                      {order.contract}
                    </OrderHistoryData>
                    <OrderHistoryData>
                      {order.price_per_share}
                    </OrderHistoryData>
                    <OrderHistoryData>
                      {order.order_value}
                    </OrderHistoryData>
                    <OrderButton>
                      sell
                    </OrderButton>
                  </OrderHistoryRow>
                ))
              }
            </OrderHistoryBody>
          </OrderHistoryWrapper>
        </div>
      </ContractContainer>

      <FlexWrapper
        backgroundColor="darkBlue"
        padding="1rem"
        alignItems="center"
      >
        <SettingsLabel>
          Light theme
        </SettingsLabel>
        <SettingsToggle>
          <ThemeToggler currentTheme={theme} toggleTheme={toggleTheme} />
        </SettingsToggle>
      </FlexWrapper>
    </ContentWrapper>
  );
}

export default Settings;