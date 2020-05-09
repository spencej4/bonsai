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
                        registerError= {this.props.registerError}
                    ></RegisterForm>
                ): (<RegisteredMessage email = {this.props.email}/> )}

                { !this.props.isRegistered ? (
                    <div className='register right'>
                        <div className='sign-in-title'>Sign In</div>
                        <div className='float-right-sign-in-page-container'>
                            <Link to="/signin">
                                <button type="button"
                                        className='action-btn'
                                        onClick = {this.props.clearAuthenticationErrors}>
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : null }

                { this.props.isRegistered ? (
                    <div className='register-with-signin-button'>
                    <div className='centered-button-container'>
                        <Link to="/signin">
                            <button type="button"
                                    className='signin-after-registering-btn'
                                    onClick = {this.props.clearAuthenticationErrors}>
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
                ) : null}
            </div>
        )
    }
}

export default RegisterPage