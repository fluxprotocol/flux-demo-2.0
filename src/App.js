import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// modules
import Dashboard from './pages/Dashboard';
import MarketDetail from './pages/MarketDetail';

const App = () => {
  return (
    <main className="App">
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/detail" component={MarketDetail} exact />
      </Switch>
    </main>
  );
}

export default App;
