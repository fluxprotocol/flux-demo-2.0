import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

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

  return (
    <main className="App">
      {flux ? (
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/detail" component={MarketDetail} exact />
        </Switch>
      ) : <div>loading...</div>}
      
    </main>
  );
}

export default App;
