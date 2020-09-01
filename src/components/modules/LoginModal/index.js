import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import SignInOptions from './SignInOptions';

const fluxLogo = require('../../../assets/images/flux-logo.png');

const FluxLogo = styled.img`
  width: 5em;
  margin-left: 1em;
`;

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

const LoginModal = props => (
  <Modal
    isOpen={true}
    style={customStyles}
    contentLabel="Create market"
  >
    <FluxLogo alt="fluxLogo" src={fluxLogo}/>
    <CloseModalButton onClick={props.hideSignInModal}>cancel</CloseModalButton>
    <SignInOptions/>
  </Modal>
)

export default LoginModal;