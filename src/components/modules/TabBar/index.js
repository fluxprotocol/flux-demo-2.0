import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';
import Modal from 'react-modal';

// common
import { FlexWrapper, FlexItem } from '../../common/Flex';

// modules
import CreateMarketForm from '../CreateMarketForm';

// context
import { FluxContext } from '../../../context/FluxProvider';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxWidth: '33rem',
    maxHeight: '95vh',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2C2A43',
    border: 'none',
    borderRadius: '10px'
  }, 
  overlay: {
    zIndex: 999,
    backgroundColor: 'rgba(12,11,29, 0.6)',
  },
};

const CloseModalButton = styled.button`
  position: absolute;
  width: 6.5em;
  top: 1rem;
  right: 1rem;
  background: rgba(15,14,37,100);
  color: rgba(247, 1, 154, 1);
  font-size: 0.8em;
  border-radius: 10px;
  border: none;
  outline: none;
  padding: 0.5rem .1rem;
  cursor: pointer;
`;

const fluxLogo = require('../../../assets/images/flux-logo.png');

const FluxLogo = styled.img`
  width: 5em;
  margin-left: 1em;
`;

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
  const [flux, _] = useContext(FluxContext);
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <div onClick={() => {
            setModalIsOpen(true);
          }}>
            <MenuIcon
              src={require('../../../assets/images/icons/new-menu-icon.svg')}
            />
            <MenuLabel>new</MenuLabel>
          </div>
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

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Create market"
      >
        <FluxLogo alt="fluxLogo" src={fluxLogo} />
        <CloseModalButton onClick={() => {
          setModalIsOpen(false);
        }}>cancel</CloseModalButton>
        <CreateMarketForm />
      </Modal>
    </TabBarContainer>
  );
}

export default TabBar;