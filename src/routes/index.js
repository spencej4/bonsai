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
import Cart from '../pages/Cart';
import PaymentPage from '../pages/PaymentPage';
import ManageStore from '../pages/ManageStore';
import AddProduct from '../pages/ManageStore/AddProduct';
import DeleteProduct from '../pages/ManageStore/DeleteProduct';
import ModifyProduct from '../pages/ManageStore/ModifyProduct';

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
          <Route exact path='/cart/'
            render = {(props) => <Cart {...props}
                                    products = {this.props.products}
                                    viewProduct = {this.props.viewProduct}
                                    cart={this.props.cart}
                                    cartQuantity = {this.props.cartQuantity}
                                    cartSubtotal = {this.props.cartSubtotal}
                                    calculateCartSubtotal = {this.props.calculateCartSubtotal}
                                    cartContains_id_array = {this.props.cartContains_id_array}
                                    removeProductFromCart = {this.props.removeProductFromCart}
                                    onCheckoutClick = {this.props.onCheckoutClick}
                                  />
                      }
          />
          <Route path= '/process-payment'
            render = {(props) => <PaymentPage {...props}
                                    cartSubtotal = {this.props.cartSubtotal}
                                  />
                      }
          />

          <Route exact path='/manage-store'
            render = {(props) => <ManageStore {...props}
          
                                 />
                     }
          />

          <Route path ='/manage-store/add-product'
            render = {(props) => <AddProduct></AddProduct>}
          />

          <Route path ='/manage-store/delete-product'
            render = {(props) => <DeleteProduct></DeleteProduct>}
          />

          <Route path ='/manage-store/modify-product'
            render = {(props) => <ModifyProduct></ModifyProduct>}
          />


          {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
          {/* <Route component={SignInPage} /> */}
      </Switch>
    );
  }
}

export default Routes;


