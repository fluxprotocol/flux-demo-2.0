import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// hooks
import { useDarkModeTheme, useFluxAuth } from '../../../App';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';
import ContentWrapper from '../../common/ContentWrapper';
import Button from '../../common/Button';

// context
import UserBalance from './UserBalance';

const Logo = styled.img`
  width: 4rem;
`;

const TopBar = props => {
  const { user, logout } = useFluxAuth();
  const { theme } = useDarkModeTheme();
  
  return (
    <ContentWrapper
      className="top-bar"
      backgroundColor="menuBarBackground"
      padding="1rem"
    >
      <ContentWrapper maxWidth="68rem">
        <FlexWrapper padding="0 1rem">
          <FlexItem>
            <Link to="/">
              <Logo 
                // src={require(`../../../assets/images/flux-logo.png`)}
                src={theme === 'light' ? 
                  require(`../../../assets/images/flux-logo-black.svg`) : 
                  require(`../../../assets/images/flux-logo-white.svg`)
                }
                alt="Flux"
              />
            </Link>
          </FlexItem>
          {/* <FlexItem hideForSmall hideForMedium>
            <Input placeholder="Search"/>
          </FlexItem> */}
          <FlexItem 
            hideForSmall
            flex="2"
            textAlign="right"
          >
            {user && <UserBalance user={user}/> }
          </FlexItem>
          <FlexItem textAlign="right">
            <Button 
              color={user ? 'gray' : 'pink'}
              small
              onClick={ () => {
                user ? logout() : props.showSignInModal();
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