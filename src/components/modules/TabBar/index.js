import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';

const TabBarContainer = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  background-color: ${props => props.theme.darkBlue};
  padding: 1rem;
  border-radius: 1rem;

  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
    display: none;
  }
`;

const MenuIcon = styled.img`
  opacity: ${props => props.active ? 1 : 0.5};

  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }
`;

const MenuLabel = styled.span`
  display: block;
  font-size: 0.7rem;
  color: white;
`;

const TabBar = props => {
  const location = useLocation();

  return (
    <TabBarContainer>
      <FlexWrapper>
        <FlexItem
          padding="0 1rem"
          textAlign="center"
        >
          <Link to="/">
            <MenuIcon
              active={location.pathname === '/'}
              src={require('../../../assets/images/icons/dashboard-menu-icon.svg')}
            />
            <MenuLabel>dashboard</MenuLabel>
          </Link>
        </FlexItem>
        <FlexItem
          padding="0 1rem"
          textAlign="center"
        >
          <Link to="/">
            <MenuIcon
              active={location.pathname === '/create'}
              src={require('../../../assets/images/icons/new-menu-icon.svg')}
            />
            <MenuLabel>new</MenuLabel>
          </Link>
        </FlexItem>
        <FlexItem
          padding="0 1rem"
          textAlign="center"
        >
          <Link to="/settings">
            <MenuIcon
              active={location.pathname.includes('/settings')}
              src={require('../../../assets/images/icons/profile-menu-icon.svg')}
            />
            <MenuLabel>settings</MenuLabel>
          </Link>
        </FlexItem>
      </FlexWrapper>
    </TabBarContainer>
  );
}

export default TabBar;