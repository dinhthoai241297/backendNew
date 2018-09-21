/* eslint-disable import/default */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.dev';
import * as sectorActions from './actions/SectorActions';

// css
import 'admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css';
import 'admin-lte/bower_components/font-awesome/css/font-awesome.min.css'
import 'admin-lte/bower_components/Ionicons/css/ionicons.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/skin-blue.min.css';
import 'admin-lte/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css';
import 'toastr/build/toastr.min.css'

import './assets/styles/styles.css';

import 'admin-lte/bower_components/jquery/dist/jquery.min.js';
import 'admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            {routes}
        </Router>
    </Provider>,
    document.getElementsByClassName('wrapper')[0]
);
