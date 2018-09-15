import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import HomePage from './components/home/HomePage';
import SectorPage from './components/sector/SectorPage';

export default (
    <Route path="/" component={App}>
        {/* <Switch>
            <Route path="/sector" component={SectorPage} />
            <Route component={HomePage} />
        </Switch> */}
    </Route>
);
