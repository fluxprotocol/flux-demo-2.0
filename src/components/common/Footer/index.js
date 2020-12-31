import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  width: 100%;
  background: #2C2A43;
  height: 10em;
  vertical-align: middle;
  align-items: middle;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  max-width: 68rem;
  margin: 0 auto;
`;

const FooterIcon = styled.img`
  width: 4em;
  height: 1.35em;
`;

const FooterList = styled.ul`
  display: flex;
  vertical-align: middle;
  align-items: center;
  padding-left: 0;

  & li {
    list-style-type: none;
  }

  & img {
    padding: 0 .5em;
    width: 3em;
  
    @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
      width: 3em;
    }
  }
`;

const fluxLogo = require('../../../assets/images/flux-logo.png');
const twitterLogo = require('../../../assets/images/icons/twitter_logo.png');

const Footer = () => {
  return (
      <FooterContainer>
        <FooterWrapper>
          <FooterIcon 
            alt="fluxLogo" 
            src={fluxLogo} 
          />
          <FooterList>
            <li>
              <a href="https://twitter.com/fluxprotocol" rel="noopener noreferrer" target="_blank">
                <img src={twitterLogo} alt="twitter logo" />
              </a>
            </li>
          </FooterList>
        </FooterWrapper>
      </FooterContainer>
  );
}


export default Footer;