import React, { Component } from 'react';
import {hot} from 'react-hot-loader';

// redux imports
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.props.actions.getUserImage();
        this.state ={
            file:null
        }
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.props.actions.uploadUserImage(this.state.file);
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    render() {
        return (
            <div>
                <h2>Edit</h2>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input type='file' onChange={this.onChange.bind(this)} />
                    <button type="submit">Upload</button>
                </form>
                <img id='userImage' src={this.props.userImage} />
            </div>
         );
    }
}

function mapStateToProps(state) {
    return {
        userImage: state.userImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(hot ? hot(module)(Edit) : Edit);