import React from 'react';
import styled from 'styled-components';

// hooks
import { useDarkModeTheme } from '../../App';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import { FlexWrapper } from '../../components/common/Flex';
import Paragraph from '../../components/common/Paragraph';
import ThemeToggler from '../../components/common/ThemeToggler';

const SettingsLabel = styled.span`
  color: white;
`;

const SettingsToggle = styled.div`
  margin-left: auto;
`;

const Settings = props => {
  const { toggleTheme, theme } = useDarkModeTheme();

  return (
    <ContentWrapper 
      maxWidth="40rem"
      paddingSmall="1rem 0"
      padding="2rem 1rem"
    >
      <Paragraph
        size="1.2rem"
        margin="0 1rem 1rem 1rem"
      >
        App preferences
      </Paragraph>
      <FlexWrapper
        backgroundColor="darkBlue"
        padding="1rem"
        alignItems="center"
      >
        <SettingsLabel>
          Light theme
        </SettingsLabel>
        <SettingsToggle>
          <ThemeToggler currentTheme={theme} toggleTheme={toggleTheme} />
        </SettingsToggle>
      </FlexWrapper>
    </ContentWrapper>
  );
}

export default Settings;