import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes"
import  { useDarkMode } from "./hooks/useDarkMode"

// context
import { connect, FluxContext } from './context/FluxProvider';

// modules
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';

const themeContext = React.createContext(null);

export const useDarkModeTheme = () => {
  const context = React.useContext(themeContext);

  return context;
};

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
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
      }}
    >
      <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
        <main className="App">
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/detail" component={MarketDetail} exact />
          </Switch>
        </main>
      </ThemeProvider>
    </themeContext.Provider>
  );
}

export default App;
