import 'babel-polyfill';
import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// inport redux
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));