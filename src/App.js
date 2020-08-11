import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes"
import  { useDarkMode } from "./hooks/useDarkMode"
import  { useAuth } from "./hooks/useAuth"

// context
import { connect, FluxContext } from './context/FluxProvider';

// modules
import TopBar from './components/modules/TopBar';
import TabBar from './components/modules/TabBar';

// pages
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';
import Settings from './pages/Settings';

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
  
  useEffect (() => {
    if (!flux.connected) {
      connect().then(fluxInstance => {
        dispatch({type: 'connected', payload: {flux: fluxInstance}});
      })
    }
  })

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
            <TopBar />
            <TabBar />
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/markets" component={Dashboard} exact />
              <Route path="/markets/:id" component={MarketDetail} exact />
              <Route path="/settings" component={Settings} exact />
            </Switch>
          </main>
        </ThemeProvider>
      </authContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
