import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

// redux imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class Home extends Component {

    constructor(props) {
        super(props);
        this.props.actions.getUserImage(this.props.login.token);
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
                <img id='userImage' src={this.props.userImage} />
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        login: state.login,
        userImage: state.userImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot ? hot(module)(Home) : Home);