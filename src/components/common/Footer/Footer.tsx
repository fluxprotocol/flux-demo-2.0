import React from 'react';
import styled from 'styled-components';

import styles from './Footer.module.scss';

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
const telegramLogo = require('../../../assets/images/icons/telegram_logo.png');

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <FooterWrapper>
        <FooterIcon
          alt="fluxLogo"
          src={fluxLogo}
        />
        <FooterList>
          <li>
            <a href="https://twitter.com/fluxprotocol" rel="noopener noreferrer" target="_blank" >
              <img src={twitterLogo} alt="Twitter page" />
            </a>
            < a href="https://t.me/fluxprotocol" rel="noopener noreferrer" target="_blank" >
              <img src={telegramLogo} alt="Telegram group" />
            </a>
          </li>
        </FooterList>
      </FooterWrapper>
    </footer>
  );
}


export default Footer;