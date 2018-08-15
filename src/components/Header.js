import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
// redux imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class Header extends Component {

    componentWillMount() {
        this.props.actions.getUser(this.props.login.token);
    }

    render() {
        return (
            <header>
                <h1>Header</h1>
                <p>Username: {this.props.user.name}</p>
            </header>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot ? hot(module)(Header) : Header);