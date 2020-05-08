import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import RegisteredMessage from './RegisteredMessage';

class RegisterPage extends Component {
   
    render() {
        return (
            <div className='sign-in-page'>
                { !this.props.isRegistered ? (
                    <RegisterForm
                        onRegisterSubmit={this.props.onRegisterSubmit}
                        handleSignInChange={this.props.handleSignInChange}
                    ></RegisterForm>
                ): (<RegisteredMessage></RegisteredMessage>)}

                <div className='register right'>
                    <div className='sign-in-title'>Sign In</div>
                    <div className='float-right-sign-in-page-container'>
                        <Link to="/signin">
                            <button type="button"
                                    className='action-btn'>
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage