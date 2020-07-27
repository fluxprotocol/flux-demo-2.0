import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useDarkModeTheme } from '../../../App';
import { useFluxAuth } from '../../../App';

// common
import ThemeToggler from '../../common/ThemeToggler';
import { FlexWrapper, FlexItem } from '../../common/Flex';
import ContentWrapper from '../../common/ContentWrapper';
import Button from '../../common/Button';
import Input from '../../common/Input';

// context
import { FluxContext } from '../../../context/FluxProvider';

const Logo = styled.img`
  width: 4rem;
`;

const TopBar = props => {
  const { toggleTheme } = useDarkModeTheme();
  const { user, login, logout } = useFluxAuth();
  const [flux, ] = useContext(FluxContext);

  useEffect(() => {
    console.log('USER CHANGED', user);
  }, [user])
  
  return (
    <ContentWrapper
      backgroundColor="darkBlue"
      addPadding
    >
      <ContentWrapper maxWidth>
        <FlexWrapper padding="0 1rem">
          <FlexItem>
            <Logo 
              src={require(`../../../assets/images/flux-logo.png`)}
              alt="Flux"
            />
          </FlexItem>
          <FlexItem hideForSmall hideForMedium>
            <Input placeholder="Search"/>
          </FlexItem>
          <FlexItem hideForSmall hideForMedium>
            buttons
          </FlexItem>
          <FlexItem hideForSmall>
            profile
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
            <ThemeToggler toggleTheme={toggleTheme} />
          </FlexItem>

        </FlexWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default TopBar;