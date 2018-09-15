import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import DashBoard from './components/dashBoard/DashBoard';
import Sector from './components/sector/Sectors';
import EditSector from './components/sector/EditSector';

export default (
    <App>
        <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/sector/list" component={Sector} />
            <Route path="/sector/edit/:param" component={EditSector} />
        </Switch>
    </App>
);
