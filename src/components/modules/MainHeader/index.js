import React from 'react';
import { useDarkModeTheme } from '../../../App';

// common
import ContentWrapper from '../../common/ContentWrapper';
import ThemeToggler from '../../common/ThemeToggler';

const MainHeader = props => {
  const {
    toggleTheme,
  } = useDarkModeTheme();
  return (
    <ContentWrapper addPadding={true}>
      <ThemeToggler toggleTheme={toggleTheme} />
    </ContentWrapper>
  );
}

export default MainHeader;