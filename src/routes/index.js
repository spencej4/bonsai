import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Landing from '../pages/Landing';
import Store from '../pages/Store';
import Musings from '../pages/Musings';
import UserInfo from '../pages/UserInfo';
import SignInPage from '../pages/SignIn';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ViewProduct from '../pages/Store/ViewProduct';


class Routes extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path='/store/'
            render = {(props) => <Store {...props}
                                    products = {this.props.products}
                                    viewProduct = {this.props.viewProduct}
                                  />
                      }
          />
          {/* get this working... */}
          {/* needs to get called by Project.js, when you click on a product div */}
          <Route path='/store/view_product/:product'
            render = {(props) => <ViewProduct {...props}
                                    currentProduct_id = {this.props.currentProduct_id}
                                    currentProduct = {this.props.currentProduct}
                                    currentProductPrice = {this.props.currentProductPrice}
                                    currentProductDescription = {this.props.currentProductDescription}
                                    currentProductImage = {this.props.currentProductImage}
                                    addProductToCart = {this.props.addProductToCart}
                                    removeProductFromCart = {this.props.removeProductFromCart}
                                    cart = {this.props.cart}
                                    cartContains_id_array = {this.props.cartContains_id_array}
                                  />
                      }
          />
          <Route path='/musings' component={Musings} />
          <Route path='/user_info' component={UserInfo} />
          <Route path="/signin" 
            render = {(props) => <SignInPage {...props}
                                    handleSignInChange = {this.props.handleSignInChange}
                                    onLoginSubmit = {this.props.onLoginSubmit}
                                    loginError = {this.props.loginError}
                                    clearAuthenticationErrors = {this.props.clearAuthenticationErrors}
                                    isAuthenticated = {this.props.isAuthenticated}
                                    log_email = {this.props.log_email}
                                  />
                      }
          />

          <Route path="/register" 
            render = {(props) => <Register {...props} 
                                    handleSignInChange = {this.props.handleSignInChange}
                                    onRegisterSubmit = {this.props.onRegisterSubmit}
                                    registerError = {this.props.registerError}
                                    clearAuthenticationErrors = {this.props.clearAuthenticationErrors}
                                    isRegistered = {this.props.isRegistered} 
                                    email = {this.props.email}
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