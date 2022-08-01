import React from 'react';
import './index.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/carteira" exact component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
