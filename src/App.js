import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes"
import  { useDarkMode } from "./hooks/useDarkMode"
import ThemeToggler from "./components/common/ThemeToggler"

// modules
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';

// context 
import { connect, FluxContext } from './context/FluxProvider';

const App = () => {
  const [flux, dispatch] = useContext(FluxContext);

  useEffect (() => {
    if (!flux.connected) {
      connect().then(fluxInstance => {
        dispatch({type: 'connected', payload: {flux: fluxInstance}});
      })
    }
  })

  const [theme, toggleTheme] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
      <main className="App">
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/detail" component={MarketDetail} exact />
        </Switch>
      </main>
    </ThemeProvider>
  );
}

export default App;
