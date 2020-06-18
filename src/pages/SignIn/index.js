import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';
import LoggedInMessage from './LoggedInMessage';

class SignInPage extends Component {
    render() {
        return (
            // fix this...
            // <div className='content-wrap'>
                <div className='sign-in-page'>
                    { (!this.props.isAuthenticated) ? 
                        (<SignInForm
                            handleSignInChange = {this.props.handleSignInChange}
                            onLoginSubmit = {this.props.onLoginSubmit}
                            loginError= {this.props.loginError}
                            >
                        </SignInForm>) : <LoggedInMessage
                                            log_email = {this.props.log_email}
                                            // can add call to action button here...
                                            // onViewCollectionClick={this.props.onViewCollectionClick}
                                        >
                                        </LoggedInMessage>}

                    { (!this.props.isAuthenticated) ?  (                 
                        <div className='register right'>
                            <div className='sign-in-title'>Register</div>
                            <div className='float-right-sign-in-page-container'>
                                <Link to="/register">
                                    <button type="button"
                                            className='action-btn'
                                            onClick = {this.props.clearAuthenticationErrors}>
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    // ) : (<RegisteredMessage /> )}
                        ) : null }
                </div>
            // </div>
        )
    }
}

export default SignInPage
                                   