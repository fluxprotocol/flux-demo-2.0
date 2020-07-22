import React, { useContext } from 'react';
import { useDarkModeTheme } from '../../../App';

// common
import ContentWrapper from '../../common/ContentWrapper';
import ThemeToggler from '../../common/ThemeToggler';

// context
import { FluxContext } from '../../../context/FluxProvider';

const MainHeader = props => {
  const [flux, ] = useContext(FluxContext);
  
  const {
    toggleTheme,
  } = useDarkModeTheme();
  return (
    <ContentWrapper addPadding>
      <ThemeToggler toggleTheme={toggleTheme} />
      <button onClick={ () => flux.signInProtocol()}>login</button>
    </ContentWrapper>
  );
}

export default MainHeader;