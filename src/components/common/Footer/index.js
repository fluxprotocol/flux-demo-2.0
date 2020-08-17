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
  position: absolute;
  bottom: 0;
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
  width: 6em;
  height: 2em;
  
  @media (min-width: ${({ theme }) => theme.mediumBreakpoint}) {
  }
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
const twitterLogo = require('../../../assets/images/icons/discord_logo.png');
const redditLogo = require('../../../assets/images/icons/medium_logo.png');
const mediumLogo = require('../../../assets/images/icons/twitter_logo.png');

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
              <img src={twitterLogo} alt="twitter logo" />
              <img src={redditLogo} alt="reddit logo" />
              <img src={mediumLogo} alt="medium logo" />
            </li>
          </FooterList>
        </FooterWrapper>
      </FooterContainer>
  );
}


export default Footer;