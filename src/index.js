/* eslint-disable import/default */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import MyRoute from './MyRoute';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.dev';

// css
import 'font-awesome-animation/dist/font-awesome-animation.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'toastr/build/toastr.min.css';

import './assets/vendor/admin-lte/bower_components/jquery/dist/jquery.min.js';
import './assets/vendor/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js';
import './assets/vendor/admin-lte/dist/js/adminlte.min.js';

const store = configureStore();

render(
    <Provider store={store}>
        <MyRoute />
    </Provider>,
    document.getElementById('app')
);
