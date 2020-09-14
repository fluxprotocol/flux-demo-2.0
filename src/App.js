import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes"

// hooks
import useWindowDimensions from './hooks/useWindowDimensions';
import { useDarkMode } from "./hooks/useDarkMode"
import { useAuth } from "./hooks/useAuth"

// context
import { connect, FluxContext } from './context/FluxProvider';

// modules
import TopBar from './components/modules/TopBar';
import TabBar from './components/modules/TabBar';

// pages
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';
import Settings from './pages/Settings';
import LoginModal from './components/modules/LoginModal';

const themeContext = React.createContext(null);
const authContext = React.createContext(null);

export const useDarkModeTheme = () => {
  const context = React.useContext(themeContext);

  return context;
};

export const useFluxAuth = () => {
  const context = React.useContext(authContext);

  return context;
};

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [user, login, logout] = useAuth();
  const [flux, dispatch] = useContext(FluxContext);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowDimensions();
  let location = useLocation();

  useEffect (() => {
    if (!flux.connected) {
      connect().then(fluxInstance => {
        dispatch({type: 'connected', payload: {flux: fluxInstance}});
      })
    }
  })

  const toggleSignInModal = (show) => {
    setShowModal(show);
  }

  return (
    <themeContext.Provider
      value={{
        toggleTheme,
        theme,
      }}
    >
      <authContext.Provider
      value={{
        user,
        login,
        logout,
      }}
      >
        <ThemeProvider theme={themeMode}>
          <GlobalStyles/>
          <main className="App">

            {(!location.pathname.includes('/markets/') || width > 650 ) &&
              <TopBar showSignInModal={() => toggleSignInModal(true)} />              
            }

            <TabBar />
            {showModal && <LoginModal hideSignInModal={() => toggleSignInModal(false)}/>}
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/filter" component={Dashboard} exact />
              <Route path="/markets" component={Dashboard} exact />
              <Route path="/markets/:id" component={MarketDetail} />
              <Route path="/settings" component={Settings} exact />
            </Switch>
          </main>
        </ThemeProvider>
      </authContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
