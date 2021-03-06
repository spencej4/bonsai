import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Landing from '../pages/Landing';
import Store from '../pages/Store';
import Musings from '../pages/Musings';
import UserInfo from '../pages/UserInfo';
import SignInPage from '../pages/SignIn';
import Register from '../pages/Register';
import ViewProduct from '../pages/Store/ViewProduct';
import Cart from '../pages/Cart';
import Shipping from '../pages/Shipping';
import PaymentPage from '../pages/PaymentPage';
import ManageStore from '../pages/ManageStore';
import AddProduct from '../pages/ManageStore/AddProduct';
import DeleteProduct from '../pages/ManageStore/DeleteProduct';
import ModifyProduct from '../pages/ManageStore/ModifyProduct';

class Routes extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" 
            render = {(props) => <Landing {...props}
                                  scrollWindow = {this.props.scrollWindow}
                                  />
                      }
            />
          <Route exact path='/store/'
            render = {(props) => <Store {...props}
                                    products = {this.props.products}
                                    viewProduct = {this.props.viewProduct}
                                    scrollWindow = {this.props.scrollWindow}
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
                                    scrollWindow = {this.props.scrollWindow}
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
                                    scrollWindow = {this.props.scrollWindow}
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

          <Route path= '/shipping'
                      render = {(props) => <Shipping {...props}
                                              scrollWindow = {this.props.scrollWindow}
                                              handleShippingFormChange = {this.props.handleShippingFormChange}
                                              onShippingFormSubmit = {this.props.onShippingFormSubmit}
                                              cartSubtotal = {this.props.cartSubtotal}
                                              shipping_email = {this.props.shipping_email}
                                              shipping_name_first = {this.props.shipping_name_first}
                                              shipping_name_last = {this.props.shipping_name_last}
                                              shipping_street_address = {this.props.shipping_street_address}
                                              shipping_apt_unit = {this.props.shipping_apt_unit}
                                              shipping_city = {this.props.shipping_city}
                                              shipping_state = {this.props.shipping_state}
                                              shipping_zipcode = {this.props.shipping_zipcode}
                                            />
                                }
          />

          <Route path= '/process-payment'
            render = {(props) => <PaymentPage {...props}
                                    cartSubtotal = {this.props.cartSubtotal}
                                    shipping_form_is_valid = {this.props.shipping_form_is_valid}
                                    shipping_email = {this.props.shipping_email}
                                    shipping_name_first = {this.props.shipping_name_first}
                                    shipping_name_last = {this.props.shipping_name_last}
                                    shipping_street_address = {this.props.shipping_street_address}
                                    shipping_apt_unit = {this.props.shipping_apt_unit}
                                    shipping_city = {this.props.shipping_city}
                                    shipping_state = {this.props.shipping_state}
                                    shipping_zipcode = {this.props.shipping_zipcode}
                                    onSuccessfullPayment = {this.props.onSuccessfullPayment}
                                    new_payment_success = {this.props.new_payment_success}
                                    new_order_success_confirmation_number = {this.props.new_order_success_confirmation_number}
                                  />
                      }
          />

          <Route exact path='/manage-store'
            render = {(props) => <ManageStore {...props}
                                    scrollWindow = {this.props.scrollWindow}
                                    handleAddProductChange = {this.props.handleAddProductChange}
                                    onAddProductSubmit = {this.props.onAddProductSubmit}
                                    new_product_name = {this.props.new_product_name}
                                    new_product_price = {this.props.new_product_price}
                                    new_product_description = {this.props.new_product_description}
                                    new_product_image_url = {this.props.new_product_image_url}
                                    getProducts = {this.props.getProducts}
                                 />
                     }
          />

          <Route path ='/manage-store/add-product'
            render = {(props) => <AddProduct {...props}
                                    handleAddProductChange = {this.props.handleAddProductChange}
                                    onAddProductSubmit = {this.props.onAddProductSubmit}
                                    new_product_name = {this.props.new_product_name}
                                    new_product_price = {this.props.new_product_price}
                                    new_product_description = {this.props.new_product_description}
                                    new_product_image_url = {this.props.new_product_image_url}
                                  />}
          />

          <Route path ='/manage-store/delete-product'
            render = {(props) => <DeleteProduct
                                    products = {this.props.products}
                                    deleteProduct = {this.props.deleteProduct}
                                 ></DeleteProduct>}
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


