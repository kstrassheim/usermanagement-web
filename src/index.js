import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// inport redux
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

export class InitApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(<InitApp />, document.getElementById('app'));