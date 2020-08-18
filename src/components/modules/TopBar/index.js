import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// hooks
import { useFluxAuth } from '../../../App';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';
import ContentWrapper from '../../common/ContentWrapper';
import Button from '../../common/Button';

// context
import { FluxContext } from '../../../context/FluxProvider';

const Logo = styled.img`
  width: 4rem;
`;

const UserName = styled.span`
  position: relative;
  margin-right: 1rem;
  color: white;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: -1rem;
    transform: translateY(-50%);
    height: 2rem;
    width: 1px;
    background-color: white;
    opacity: 0.5;
  }
`;

const UserBalance = styled.span`
  margin-left: 1rem;
  color: ${props => props.theme.green};
`;

const TopBar = props => {
  const { user, login, logout } = useFluxAuth();
  const [flux, ] = useContext(FluxContext);
  
  return (
    <ContentWrapper
      backgroundColor="darkBlue"
      padding="1rem"
    >
      <ContentWrapper maxWidth="68rem">
        <FlexWrapper padding="0 1rem">
          <FlexItem>
            <Link to="/">
              <Logo 
                src={require(`../../../assets/images/flux-logo.png`)}
                alt="Flux"
              />
            </Link>
          </FlexItem>
          {/* <FlexItem hideForSmall hideForMedium>
            <Input placeholder="Search"/>
          </FlexItem> */}
          <FlexItem hideForSmall>
            {user &&
              <ContentWrapper>
                <UserName>{user.id ? user.id : '' }</UserName>
                <UserBalance>{user.balance ? `$${user.balance / 1000000000000000000}` : '' }</UserBalance>
              </ContentWrapper>
            }
          </FlexItem>
          <FlexItem textAlign="right">
            <Button 
              color={user ? 'gray' : 'pink'}
              small
              onClick={ () => {
                user ? logout() : login();
              }}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </FlexItem>

        </FlexWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default TopBar;