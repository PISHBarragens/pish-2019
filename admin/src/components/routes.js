import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Login from './login.component';
import MapBarragens from './map-barragens.component';
import Barragem from './barragem.component';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/barragens"/>}/>
        <Route exact path="/barragens" component={MapBarragens}/>
        <Route exact path="/barragem/:identifier" component={Barragem}/>
      </Switch> 
    </BrowserRouter>
  );
}

export default Routes;