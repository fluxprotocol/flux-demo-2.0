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
import { fromDenom } from '../../helpers/numberUtils';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/common/Loader';

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
    max-height: 12rem;
    overflow-y: auto;
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
  cursor: ${(props) => props.pointer ? "pointer" : "default"};
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
    text-align: center;
    width: 33%;
  }
`;

const OrderHistoryData = styled.td`
  color: white;
  @media (min-width: ${({ theme }) => theme.smallBreakpoint}) {
    text-align: center;
    width: 33%;
  }
`;
const MarketHistoryData = styled.td`
  color: white;
  @media (min-width: ${({ theme }) => theme.smallBreakpoint}) {
    text-align: left;
    width: 80%;
  }
`;

const OrderButton = styled.td`
  background: ${props => props.backgroundColor ? props.backgroundColor : '#5400FF'};
  color: white;
  border-radius: 8px;
  padding: .25em .5em;
  font-size: .8em;
`;

const ProfileIcon = require("../../assets/images/icons/profile_icon.png");

const dataHeaders = ["contract", "price per share", "order value"];
const marketHeaders = ["market", "claimable"];

const Settings = props => {
  const { user } = useFluxAuth();
  const [flux, ] = useContext(FluxContext);
  const { toggleTheme, theme } = useDarkModeTheme();
  const history = useHistory();
  const [openOrders, setOpenOrders] = useState([]);
  const [filledOrders, setFilledOrders] = useState([]);
  const [finalizedMarkets, setFinalizedMarkets] = useState([]);
  const [claimable, setClaimable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    getFinalizedMarkets();
    getOpenOrders();
    getFilledOrders();
  }, [user]);


  const getOpenOrders = async () => {
    let res = await flux.getOpenOrders(user.id);
    setOpenOrders(res);
  }

  const getFilledOrders = async () => {
    let res = await flux.getOrderHistory(user.id);
    setFilledOrders(res);
  }

  const getFinalizedMarkets = async () => {
    let res = await flux.getFinalizedParticipatedMarkets(user.id);
    setFinalizedMarkets(res);
    const proms = res.map(market => flux.getClaimable(market.market_id));
    const claimableArr = await Promise.all(proms);
    setClaimable(claimableArr)
  }

  // TODO ux
  const claimEarnings = async (id) => {
    await flux.claimEarnings(id, user.id);
    getFinalizedMarkets()
  }

  return (
    <ContentWrapper 
      maxWidth="40rem"
      paddingSmall="1rem 0"
      padding="2rem 1rem"
    >
      <SettingsContainer>
        <img src={ProfileIcon} alt="" />
        {user && user.id}
      </SettingsContainer>

      {finalizedMarkets.length > 0 && <>
        <SettingsContainer
          className="order_history"
        >
          Finalized markets
        </SettingsContainer>
        <ContractContainer>
          <div 
            className="table_wrapper"
          >
            <OrderHistoryWrapper>
              <OrderHistoryBody pointer>
                {
                  finalizedMarkets.map((market, index) => {
                    return (
                      <OrderHistoryRow
                        key={index}
                        className="data_row"
                      >
                        <MarketHistoryData>
                          {market.description}
                        </MarketHistoryData>

                        {
                          claimable && claimable[index] ? <OrderButton
                            backgroundColor="#FF009C"
                            onClick={() => claimEarnings(market.market_id)}
                          >
                            CLAIM {fromDenom(claimable[index], 2)}
                          </OrderButton>
                          : <td><Loader/></td>
                        }
                      
                      </OrderHistoryRow>
                    )
                  })
                }
              </OrderHistoryBody>
            </OrderHistoryWrapper>
          </div>
        </ContractContainer> 
      </>}

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
            <OrderHistoryBody pointer>
              {
                openOrders.map((order, index) => {
                  const outcomeTags = order.outcome_tags.length > 0 ? order.outcome_tags : ["NO", "YES"]
                  return (
                    <OrderHistoryRow
                      key={index}
                      onClick={() => {
                        history.push("/markets/" + order.market_id)
                      }}
                      className="data_row"
                    >
                      <OrderHistoryData>
                        {outcomeTags[order.outcome]}
                      </OrderHistoryData>
                      <OrderHistoryData>
                        {order.price}
                      </OrderHistoryData>
                      <OrderHistoryData>
                        ${fromDenom(order.spend)}
                      </OrderHistoryData>
                      {/* <OrderButton
                        backgroundColor="#FF009C"
                      >
                        cancel
                      </OrderButton> */}
                    </OrderHistoryRow>
                  )
                })
              }
            </OrderHistoryBody>
          </OrderHistoryWrapper>
        </div>
      </ContractContainer>

      <ContractContainer>
        <span 
          className="filled_field"
        >
          Closed
        </span>
        <div 
          className="table_wrapper"
        >
          <OrderHistoryWrapper>
            <OrderHistoryBody>
              {
                filledOrders.map((order, index) => {
                  const outcomeTags = order.outcome_tags.length > 0 ? order.outcome_tags : ["NO", "YES"]
                  return (
                    <OrderHistoryRow
                      key={index} 
                      className="data_row"
                    >
                      <OrderHistoryData>
                        {outcomeTags[order.outcome]}
                      </OrderHistoryData>
                      <OrderHistoryData>
                        {order.price}
                      </OrderHistoryData>
                      <OrderHistoryData>
                        ${fromDenom(order.spend, 2)}
                      </OrderHistoryData>
                      {/* <OrderButton>
                        sell
                      </OrderButton> */}
                    </OrderHistoryRow>
                    )
                })
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