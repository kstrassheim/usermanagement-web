import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {hot} from 'react-hot-loader';

// redux imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from './actions/loginActions';

export class App extends Component {

    constructor(props) {
        super(props);
        // save token from url if provided or redirect to login page
        let token = this.getTokenFromUrl();
        if (token) { 
            this.props.loginActions.receiveToken(token);
        }
        else {
            this.login();
        }
    }

    getTokenFromUrl() {
        let sp = window.location.href.split('?');
        if (sp.length > 1) {
            sp = sp[1].split('&');
            if (sp.length > 0) {
                sp = sp.filter((s) => s.toLowerCase().startsWith('token='));
                if (sp.length > 0) {
                    sp = sp[0].split('=');
                    if (sp.length > 1) {
                        return decodeURIComponent(sp[1]);
                    } 
                }
            }
        }

        return null;
    }

    redirectToPage(page) {
        window.location = page;
    }

    login () {
        let redirectUrl = encodeURIComponent(window.location.href + '?token={0}');
        let loginUrl = `https://nodeauthform.azurewebsites.net?redirectUrl=${redirectUrl}`;
        this.redirectToPage(loginUrl);
    }


    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header>
                        <Header />
                    </header>
                    <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot ? hot(module)(App) : App);
