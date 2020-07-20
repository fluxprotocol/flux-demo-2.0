import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes"
import  { useDarkMode } from "./hooks/useDarkMode"

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

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

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
