import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

// hooks
import { useFluxAuth } from '../../../App';

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
  const { user, login, logout } = useFluxAuth();
  const history = useHistory();
  
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
          <FlexItem 
            hideForSmall
            flex="2"
            textAlign="center"
          >
            {user && <UserBalance user={user}/> }
                

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