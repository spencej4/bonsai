import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Landing from '../pages/Landing';
import SignInPage from '../pages/SignIn';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';



class Routes extends Component {
  render() {
    return (
      <Switch>
          <Route path="/"  exact component={Landing} />

          <Route 
            path="/signin" 
            render = {(props) => <SignInPage {...props}
                                    handleSignInChange = {this.props.handleSignInChange}
                                    onLoginSubmit = {this.props.onLoginSubmit}
                                    loginError = {this.props.loginError}
                                    isAuthenticated = {this.props.isAuthenticated}
                                  />
                      }
          />

          <Route 
            path="/register" 
            render = {(props) => <Register {...props} 
                                    handleSignInChange = {this.props.handleSignInChange}
                                    onRegisterSubmit = {this.props.onRegisterSubmit}
                                    isRegistered = {this.props.isRegistered} 
                                />
                    }
          />

          <Route path="/dashboard" component={Dashboard} isPrivate />
          {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
          {/* <Route component={SignInPage} /> */}
      </Switch>
    );
  }
}

export default Routes;