import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Restaurants from '../contaniers/restaurantList';

class RootLayout extends React.Component {
  render() {
    return (
      <div>
        <div style={{ height: 60,
          backgroundColor: '#112e51',
          color: '#FFF',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          boxSizing: 'border-box',
          paddingTop: 18 }}
        >
          RESTAURANT TRACKER
        </div>
        <Switch>
          <Route exact={true} path="/" component={Restaurants} />
        </Switch>
      </div>
    );
  }
}

export default RootLayout;
