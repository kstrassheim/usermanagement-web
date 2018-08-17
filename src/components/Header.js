import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
// redux imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import { Link } from 'react-router-dom';

class Header extends Component {

    componentWillMount() {
        this.props.actions.getUser();
    }

    render() {
        return (
            <header>
                <h1>Header</h1>
                <p>Username: {this.props.user.name}</p>
                <Link to="/">Home</Link>
                <Link to="/edit">Edit</Link>
            </header>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot ? hot(module)(Header) : Header);